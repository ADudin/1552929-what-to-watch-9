import {useEffect, useRef} from 'react';
import {Film} from '../../types/film';

type VideoPlayerComponentProps = {
  isPlaying: boolean;
  film: Film | object;
}

function PreviewVideoPlayerComponent ({isPlaying, film}: VideoPlayerComponentProps): JSX.Element {

  const videoRef = useRef<HTMLVideoElement | null>(null);

  const {posterImage, previewVideoLink, previewImage} = film as Film;

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
  }, [isPlaying, posterImage]);

  return (
    <video
      ref = {videoRef}
      src = {previewVideoLink}
      poster = {previewImage}
      width = "100%"
      height = "100%"
      muted
    />
  );
}

export default PreviewVideoPlayerComponent;
