import {useAppDispatch} from '../../hooks/hooks';
import {changeFavoriteStatusAction} from '../../store/api-actions';

type FavoriteCardComponentProps = {
  id: number;
  isFavorite: boolean;
}

function FavoriteButtonComponent({id, isFavorite}: FavoriteCardComponentProps): JSX.Element {
  const dispatch = useAppDispatch();

  const favoriteButtonClickHandler = (filmId: number, isFilmFavorite: boolean) => {
    dispatch(
      changeFavoriteStatusAction({
        filmId: filmId,
        status: isFilmFavorite ? 0 : 1,
      }),
    );
  };

  return (
    <button
      className="btn btn--list film-card__button"
      type="button"
      onClick = {() => favoriteButtonClickHandler(id, isFavorite)}
    >
      <svg
        viewBox = {isFavorite ? '0 0 18 14' : '0 0 19 20'}
        width = {isFavorite ? '18' : '19'}
        height= {isFavorite ? '14' : '20'}
      >
        <use
          xlinkHref={isFavorite ? '#in-list' : '#add'}
        >
        </use>
      </svg>
      <span>My list</span>
    </button>
  );
}

export default FavoriteButtonComponent;
