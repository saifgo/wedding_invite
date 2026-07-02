import { useCallback, useEffect, useRef, useState } from 'react'

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

function isStandalone(): boolean {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    (window.navigator as Navigator & { standalone?: boolean }).standalone === true
  )
}

function isMobileDevice(): boolean {
  return (
    /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent) ||
    window.matchMedia('(pointer: coarse)').matches
  )
}

function isIosDevice(): boolean {
  return /iPad|iPhone|iPod/.test(navigator.userAgent)
}

export function usePwaInstall() {
  const deferredPrompt = useRef<BeforeInstallPromptEvent | null>(null)
  const [canNativeInstall, setCanNativeInstall] = useState(false)
  const [isInstalled, setIsInstalled] = useState(isStandalone)
  const [isMobile] = useState(isMobileDevice)
  const [isIos] = useState(isIosDevice)

  useEffect(() => {
    const onBeforeInstall = (event: Event) => {
      event.preventDefault()
      deferredPrompt.current = event as BeforeInstallPromptEvent
      setCanNativeInstall(true)
    }

    const onAppInstalled = () => {
      setIsInstalled(true)
      setCanNativeInstall(false)
      deferredPrompt.current = null
    }

    window.addEventListener('beforeinstallprompt', onBeforeInstall)
    window.addEventListener('appinstalled', onAppInstalled)

    return () => {
      window.removeEventListener('beforeinstallprompt', onBeforeInstall)
      window.removeEventListener('appinstalled', onAppInstalled)
    }
  }, [])

  const install = useCallback(async () => {
    const prompt = deferredPrompt.current
    if (!prompt) return

    await prompt.prompt()
    const { outcome } = await prompt.userChoice

    if (outcome === 'accepted') {
      setIsInstalled(true)
      setCanNativeInstall(false)
    }

    deferredPrompt.current = null
  }, [])

  const showPrompt = isMobile && !isInstalled

  return { canNativeInstall, isInstalled, isIos, isMobile, showPrompt, install }
}
