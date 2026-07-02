interface Props {
  text: string
  isRtl?: boolean
}

export default function SealText({ text, isRtl = false }: Props) {
  return (
    <div className="seal-text" aria-hidden="true">
      <svg viewBox="0 0 200 200">
        <defs>
          <path
            id="sealCirclePath"
            d="M100,100 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0"
          />
        </defs>
        <text direction={isRtl ? 'rtl' : 'ltr'} textAnchor="middle">
          <textPath
            href="#sealCirclePath"
            startOffset="50%"
            textLength="135"
            lengthAdjust="spacingAndGlyphs"
          >
            {text}
          </textPath>
        </text>
      </svg>
    </div>
  )
}
