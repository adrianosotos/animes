import Image from 'next/image'
import '../styles/animeCard.less'

export default function AnimeCard ({ anime }) {
  return (
    <div>
      <div className="image-container">
        <Image 
          src={anime.attributes.posterImage.small}
          alt="anime-cover"
          loader={() => anime.attributes.posterImage.large}
          width="284"
          height="402"
        />
      </div>
      <p className="animecard-title">{anime.attributes.titles.en}</p>
    </div>
  )
}