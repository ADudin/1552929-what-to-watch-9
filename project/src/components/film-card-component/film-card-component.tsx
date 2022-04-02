import {Film} from '../../types/film';
import {Link} from 'react-router-dom';
import {useState} from 'react';
import PreviewVideoPlayerComponent from '../preview-video-component/preview-video-component';

type FilmCardComponentProps = {
  film: Film,
}

let timer: number | null = null;

function FilmCardComponent({film}: FilmCardComponentProps): JSX.Element {
  const [activePlayer, setActivePlayer] = useState<number | null>(null);

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
