import type { LocalizedWeddingData } from '../types/wedding'
import './OurStorySection.css'

interface Props {
  data: LocalizedWeddingData
}

export default function OurStorySection({ data }: Props) {
  const { ourStory } = data

  return (
    <section className="section story-section">
      <div className="story-container">
        <p className="section-label">{ourStory.sectionLabel}</p>
        <h2 className="section-title">{ourStory.title}</h2>

        <div className="story-gallery">
          {ourStory.images.map((img, i) => (
            <div className={`story-image-wrapper img-${i + 1}`} key={i}>
              <img
                src={img.src}
                alt={img.alt}
                className="story-image"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        <p className="story-paragraph">{ourStory.paragraph}</p>
      </div>
    </section>
  )
}
