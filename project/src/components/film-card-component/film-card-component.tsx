import {Film} from '../../types/film';

import {
  Link,
  useNavigate
} from 'react-router-dom';

import {
  useState,
  useEffect
} from 'react';

import PreviewVideoPlayerComponent from '../preview-video-component/preview-video-component';

type FilmCardComponentProps = {
  film: Film,
}

let timer: number | null = null;

function FilmCardComponent({film}: FilmCardComponentProps): JSX.Element {
  const [activePlayer, setActivePlayer] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() =>
    () => {
      if (timer) {
        clearTimeout(timer);
      }
    }, [film.id]);

  const handleMouseEnter = () => {
    timer = window.setTimeout(() => setActivePlayer(activePlayer === film.id ? -1 : film.id), 1000);
  };

  const handleMouseLeave = () => {
    if (timer) {
      clearTimeout(timer);
    }
    setActivePlayer(null);
  };

  return (
    <>
      <div
        className="small-film-card__image"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => navigate(`/films/${film.id}`)}
        style={{cursor: 'pointer'}}
      >
        <PreviewVideoPlayerComponent isPlaying = {film.id === activePlayer} film = {film} />
      </div>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={`/films/${film.id}`}>{film.name}</Link>
      </h3>
    </>
  );
}

export default FilmCardComponent;
