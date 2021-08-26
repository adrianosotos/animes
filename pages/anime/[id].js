import Axios from 'axios'
import Image from 'next/image'
import Video from '../../components/video'
import '../../styles/animePage.less'
import { ArrowLeftOutlined } from '@ant-design/icons'
import Link from 'next/link'

export default function AnimePage ({ anime }) {
  console.log(anime)
  return (
    <div className="container">
      <div className="image-container">
        <Link href="/">
          <ArrowLeftOutlined className="back-arrow" />
        </Link>
        <Image 
          src={anime.attributes.posterImage.small}
          alt="anime-cover"
          loader={() => anime.attributes.posterImage.small}
          width="284"
          height="402"
        />
      </div>
      <h1 className="anime-title">{anime.attributes.titles.en}</h1>
      <p className="anime-description">{anime.attributes.description}</p>
      <Video videoId={anime.attributes.youtubeVideoId}/>
    </div>
  )
}

export async function getServerSideProps (context) {
  const { id } = context.query
  const { data } = await Axios.get(`https://kitsu.io/api/edge/anime/${id}`) || {}

  return {
    props: { anime: data.data }
  }
}
