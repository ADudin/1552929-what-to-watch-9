import React, {
  useState,
  useEffect
} from 'react';

import {
  useParams,
  useNavigate
} from 'react-router-dom';

import {
  RATING_VALUES,
  MIN_USER_COMMENT_SYMBOLS_COUNT,
  MAX_USER_COMMENT_SYMBOLS_COUNT
} from '../../const';

import {
  useAppSelector,
  useAppDispatch
} from '../../hooks/hooks';

import {
  fetchUserData,
  sendNewReviewAction
} from '../../store/api-actions';

import {
  sendReview,
  setReviewDataSent
} from '../../store/film-data/film-data';

function ReviewFormComponent(): JSX.Element {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [userReviewRating, setUserReviewRating] = useState<number>(0);
  const [userComment, setUserComment] = useState('');
  const [isUserReviewRating, setIsUserReviewSetting] = useState<boolean>(false);

  const isReviewSending = useAppSelector(({DATA}) => DATA.isDataSending);
  const isReviewDataSent = useAppSelector(({DATA}) => DATA.isReviewDataSent);

  useEffect(() => {
    dispatch(fetchUserData());
    if (isReviewDataSent) {
      navigate(`/films/${params.id}`);
      dispatch(setReviewDataSent(false));
    }
  }, [isReviewDataSent, params.id, navigate, dispatch]);

  const userReviewRatingChangeHandler = (userRating: number) => {
    setUserReviewRating(userRating);
    setIsUserReviewSetting(true);
  };

  return (
    <div className="add-review">
      <form
        action="#"
        className="add-review__form"
        onSubmit = {
          (evt) => {
            evt.preventDefault();
            dispatch(sendReview(true));
            dispatch(sendNewReviewAction({
              filmId: params.id as string,
              comment: userComment,
              rating: userReviewRating,
            }));
          }
        }
      >
        <div className="rating">
          <div
            className="rating__stars"
          >
            {
              RATING_VALUES.map((item) => (
                <React.Fragment key={item.value}>
                  <input
                    className = "rating__input"
                    key = {item.value}
                    id = {`star-${item.value}`}
                    type = "radio"
                    name = "rating"
                    value = {item.value}
                    checked = {Math.round(userReviewRating) === item.value}
                    onChange = {(evt) => userReviewRatingChangeHandler(Number(evt.target.value))}
                    disabled = {isReviewSending}
                  />
                  <label
                    className = "rating__label"
                    htmlFor = {`star-${item.value}`}
                  >
                    Rating {item.value}
                  </label>
                </React.Fragment>
              ))
            }
          </div>
        </div>

        <div className="add-review__text">
          <textarea
            className="add-review__textarea"
            name="review-text"
            id="review-text"
            placeholder="Review text"
            value={userComment}
            onChange={(evt) => setUserComment(evt.target.value)}
            disabled = {isReviewSending}
          />
          <div className="add-review__submit">
            <button
              className="add-review__btn"
              type="submit"
              disabled = {userComment.length < MIN_USER_COMMENT_SYMBOLS_COUNT || userComment.length > MAX_USER_COMMENT_SYMBOLS_COUNT || !isUserReviewRating || isReviewSending}
            >
              Post
            </button>
          </div>

        </div>
      </form>
    </div>
  );
}

export default ReviewFormComponent;
