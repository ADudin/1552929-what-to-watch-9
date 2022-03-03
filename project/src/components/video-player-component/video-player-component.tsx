import {useEffect, useRef} from 'react';
import {Film} from '../../types/film';

type VideoPlayerComponentProps = {
  isPlaying: boolean;
  film: Film;
}

function VideoPlayerComponent ({isPlaying, film}: VideoPlayerComponentProps): JSX.Element {

  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect (() => {
    if (videoRef.current === null) {
      return;
    }

    if (isPlaying) {
      videoRef.current.play();
      return;
    }

    videoRef.current.pause();
    videoRef.current.currentTime = 0;
    videoRef.current.load();
  }, [isPlaying, film.posterImage]);

  return (
    <video
      ref = {videoRef}
      src = {film.previewVideoLink}
      poster = {film.previewImage}
      width = "100%"
      height = "100%"
      muted
    />
  );
}

export default VideoPlayerComponent;
