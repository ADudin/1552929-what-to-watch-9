import {Film} from '../../types/film';
import {Link} from 'react-router-dom';
import VideoPlayerComponent from '../video-player-component/video-player-component';
import {useState} from 'react';

type FilmCardComponentProps = {
  film: Film,
}

function FilmCardComponent({film}: FilmCardComponentProps): JSX.Element {
  const [isPlaying, setIsPlaying] = useState(false);
  const handleMouseEnter = () => {
    setTimeout(() => setIsPlaying(true), 1000);
  };
  const handleMouseLeave = () => {
    setIsPlaying(false);
  };

  return (
    <>
      <div
        className="small-film-card__image"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <VideoPlayerComponent isPlaying = {isPlaying} film = {film} />
      </div>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={`/films/${film.id}`}>{film.name}</Link>
      </h3>
    </>
  );
}

export default FilmCardComponent;
