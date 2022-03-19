import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

import LoadingScreen from '../loading-screen/loading-screen';

import {
  useEffect,
  useState,
  useRef
} from 'react';

import {
  useParams,
  useNavigate
} from 'react-router-dom';

import {
  useAppDispatch,
  useAppSelector
} from '../../hooks/hooks';

import {fetchFilmAction} from '../../store/api-actions';

import {Film} from '../../types/film';

dayjs.extend(duration);

function PlayerComponent(): JSX.Element {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const params = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const filmId = Number(params.id);

  useEffect(() => {
    dispatch(fetchFilmAction(filmId));
  }, [dispatch, filmId]);

  const {
    film,
    isDataLoaded,
  } = useAppSelector(({DATA}) => DATA);

  const {
    videoLink,
    backgroundImage,
  } = film as Film;

  const [isPlaying, setIsPlaying] = useState(false);
  const [videoDuration, setVideoDuration] = useState(0);
  const [secondsWatched, setSecondsWatched] = useState(0);
  const [videoProgress, setVideoProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState(videoRef.current?.duration);

  useEffect(() => {
    if (videoRef.current === null) {
      return;
    }

    if (isPlaying) {
      videoRef.current.play();
      return;
    }

    videoRef.current.pause();
  }, [isPlaying]);

  const fullScreenClickHandler = () => {
    if (!videoRef.current) {
      return;
    }

    videoRef.current.requestFullscreen();
  };

  const watchedTimeUpdateHandler = () => {
    if (!videoRef.current) {
      return;
    }

    setVideoDuration(videoRef.current.duration);
    setSecondsWatched(videoRef.current.currentTime);

    const progress = (secondsWatched / videoDuration) * 100;
    setVideoProgress(progress);

    const secondsLeft = Math.floor(videoDuration - secondsWatched);
    setTimeLeft(secondsLeft);
  };

  const formatTimeLeft = (time: number) => {
    const leftDuration = dayjs.duration(time, 'seconds');

    if(leftDuration.asHours() >= 1) {
      return leftDuration.format('-HH:mm:ss');
    }

    return leftDuration.format('mm:ss');
  };

  if (!film || !isDataLoaded) {
    return <LoadingScreen />;
  }

  return (
    <div className="player">
      <video
        src = {videoLink}
        ref = {videoRef}
        className="player__video"
        poster = {backgroundImage}
        onTimeUpdate = {watchedTimeUpdateHandler}
      >
      </video>

      <button
        type="button"
        className="player__exit"
        onClick = {() => navigate(`/films/${filmId}`)}
      >
        Exit
      </button>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value={videoProgress ? videoProgress : '0'} max="100"></progress>
            <div className="player__toggler" style={{left: `${videoProgress}%`}}>Toggler</div>
          </div>
          <div className="player__time-value">{timeLeft? formatTimeLeft(timeLeft) : timeLeft}</div>
        </div>

        <div className="player__controls-row">
          <button
            type="button"
            className="player__play"
            disabled = {!isDataLoaded}
            onClick = {() => {
              setIsPlaying(!isPlaying);
            }}
          >
            <svg
              viewBox = {isPlaying ? '0 0 14 21' : '0 0 19 19'}
              width = {isPlaying ? '14' : '19'}
              height = {isPlaying ? '21' : '19'}
            >
              <use xlinkHref = {isPlaying ? '#pause' : '#play-s'}></use>
            </svg>
            <span>{isPlaying ? 'Pause' : 'Play'}</span>
          </button>
          <div className="player__name">Transpotting</div>

          <button
            type="button"
            className="player__full-screen"
            onClick = {fullScreenClickHandler}
          >
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen"></use>
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default PlayerComponent;
