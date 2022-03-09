import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {State} from '../../types/state';
import {
  setActiveGenre,
  resetCountAction
} from '../../store/action';
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
          onClick = {() => {
            dispatch(setActiveGenre(genre));
            dispatch(resetCountAction());
          }}
        >
          <Link to={' '} className="catalog__genres-link">{genre}</Link>
        </li>
      ))}
    </>
  );
}

export default GenresListComponent;