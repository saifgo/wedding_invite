import { usePwaInstall } from '../hooks/usePwaInstall'
import type { LanguageContent } from '../types/wedding'
import './InstallAppPrompt.css'

interface Props {
  labels: LanguageContent['contact']['installApp']
}

export default function InstallAppPrompt({ labels }: Props) {
  const { canNativeInstall, isInstalled, isIos, showPrompt, install } = usePwaInstall()

  if (!showPrompt && !isInstalled) return null

  if (isInstalled) {
    return (
      <div className="install-app install-app--done">
        <span className="install-app-icon" aria-hidden="true">✓</span>
        <p className="install-app-done-text">{labels.installedMessage}</p>
      </div>
    )
  }

  return (
    <div className="install-app">
      <p className="install-app-label">{labels.sectionLabel}</p>
      <h3 className="install-app-title">{labels.title}</h3>
      <p className="install-app-description">{labels.description}</p>

      {canNativeInstall ? (
        <button type="button" className="install-app-btn" onClick={install}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          {labels.installButton}
        </button>
      ) : isIos ? (
        <ol className="install-app-steps">
          <li>
            <span className="install-app-step-icon" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8" />
                <polyline points="16 6 12 2 8 6" />
                <line x1="12" y1="2" x2="12" y2="15" />
              </svg>
            </span>
            {labels.iosStep1}
          </li>
          <li>
            <span className="install-app-step-icon" aria-hidden="true">＋</span>
            {labels.iosStep2}
          </li>
          <li>
            <span className="install-app-step-icon" aria-hidden="true">✓</span>
            {labels.iosStep3}
          </li>
        </ol>
      ) : (
        <ol className="install-app-steps">
          <li>
            <span className="install-app-step-icon" aria-hidden="true">⋮</span>
            {labels.androidStep1}
          </li>
          <li>
            <span className="install-app-step-icon" aria-hidden="true">↓</span>
            {labels.androidStep2}
          </li>
          <li>
            <span className="install-app-step-icon" aria-hidden="true">✓</span>
            {labels.androidStep3}
          </li>
        </ol>
      )}
    </div>
  )
}
