import React, {
  useState,
  useEffect
} from 'react';

import {RATING_VALUES} from '../../const';

import {fetchUserData} from '../../store/api-actions';
import { store } from '../../store/store';

type ReviewFormComponentProps = {
  rating: number;
}

function ReviewFormComponent({rating}: ReviewFormComponentProps): JSX.Element {
  const [userReviewRating, setUserReviewRating] = useState<number>(rating);
  const [userComment, setUserComment] = useState('');

  useEffect(() => {
    store.dispatch(fetchUserData());
  }, []);

  return (
    <div className="add-review">
      <form action="#" className="add-review__form">
        <div className="rating">
          <div className="rating__stars">
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
                    onChange = {(evt) => setUserReviewRating(Number(evt.target.value))}
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
          />
          <div className="add-review__submit">
            <button className="add-review__btn" type="submit">Post</button>
          </div>

        </div>
      </form>
    </div>
  );
}

export default ReviewFormComponent;
