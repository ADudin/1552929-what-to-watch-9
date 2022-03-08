import {useAppDispatch, useAppSelector} from '../../hooks/index';
import {State} from '../../types/state';
import {setActiveGenre} from '../../store/action';
import {Link} from 'react-router-dom';

type GenresListComponentProps = {
  genres: string[],
}

function GenresListComponent({genres}: GenresListComponentProps): JSX.Element {
  const activeGenre = useAppSelector((state: State) => state.activeGenre);
  const dispatch = useAppDispatch();

  return (
    <>
      {genres.map((genre) => (
        <li
          key = {genre}
          className = {`catalog__genres-item ${genre === activeGenre ? 'catalog__genres-item--active' : ''}`}
          onClick = {() => dispatch(setActiveGenre(genre))}
        >
          <Link to={' '} className="catalog__genres-link">{genre}</Link>
        </li>
      ))}
    </>
  );
}

export default GenresListComponent;
