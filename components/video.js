import '../styles/video.less'

export default function Video ({ videoId }) {
  return (
    <div>
      <iframe
        className="trailer-video"
        src={`https://www.youtube.com/embed/${videoId}?controls=0`}
        title="YouTube video player"
        frameBorder="0"
        allow="
          accelerometer; 
          autoplay; 
          clipboard-write; 
          encrypted-media; 
          gyroscope; 
          picture-in-picture
        " 
        allowFullScreen
      />
    </div>
  )
}