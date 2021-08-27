import Axios from 'axios'
import Image from 'next/image'
import Video from '../../components/video'
import '../../styles/animePage.less'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { Row, Col } from 'antd';
import Link from 'next/link'

export default function AnimePage ({ anime }) {
  console.log(anime)
  return (
    <>
      <Image 
        src={anime.attributes.coverImage.large}
        alt="anime-cover"
        loader={() => anime.attributes.coverImage.large}
        width="3360"
        height="800"
      />
      <div className="container">
        <Link href="/">
          <ArrowLeftOutlined className="back-arrow" />
        </Link>

        {/* <div className="image-container">
          <Image 
            src={anime.attributes.posterImage.small}
            alt="anime-cover"
            loader={() => anime.attributes.posterImage.small}
            width="284"
            height="402"
          />
        </div> */}
        <div className="anime-content">
          <Row>
            <Col xl={12} md={8} xs={24}>
              <div className="content">
                <h1 className="anime-title">{anime.attributes.titles.en}</h1>
                <p className="anime-description">{anime.attributes.description}</p>
              </div>
            </Col>
            <Col xl={12} md={16} xs={24}>
              <div className="midia-container">
                <Video videoId={anime.attributes.youtubeVideoId}/>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  )
}

export async function getServerSideProps (context) {
  const { id } = context.query
  const { data } = await Axios.get(`https://kitsu.io/api/edge/anime/${id}`) || {}

  return {
    props: { anime: data.data }
  }
}
