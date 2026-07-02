import { motion } from 'framer-motion'
import './ScrollIndicator.css'

interface Props {
  label: string
}

export default function ScrollIndicator({ label }: Props) {
  return (
    <motion.div
      className="scroll-indicator"
      animate={{ y: [0, 10, 0] }}
      transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
    >
      <span>{label}</span>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 5v14M5 12l7 7 7-7" />
      </svg>
    </motion.div>
  )
}
