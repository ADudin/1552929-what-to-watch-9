import {Film} from '../../../types/film';
import {Review} from '../../../types/review';
import {Link} from 'react-router-dom';
import {useState} from 'react';
import DetailsTab from './tab-details/tab-details';
import OverviewTab from './tab-overview/tab-overview';
import ReviewsTab from './tab-reviews/tab-reviews';

type MovieTabsProps = {
  film: Film | object,
  reviews: Review[],
}

type MovieTab = {
  id: number;
  title: string;
}

function MovieTabs({film, reviews}: MovieTabsProps): JSX.Element {
  const movieTabs: MovieTab[] = [
    {
      id: 1,
      title: 'Overview',
    },
    {
      id: 2,
      title: 'Details',
    },
    {
      id: 3,
      title: 'Reviews',
    },
  ];

  const [activeTab, setActiveTab] = useState<number>(1);

  const handleClick = (id: number) => {
    setActiveTab(id);
  };

  return (
    <>
      <nav className="film-nav film-card__nav">
        <ul className="film-nav__list">
          {movieTabs.map((tab) => (
            <li
              key = {tab.id}
              className = {`film-nav__item ${activeTab === tab.id ? 'film-nav__item--active' : ''}`}
              onClick = {() => handleClick(tab.id)}
            >
              <Link
                to={'#'}
                className="film-nav__link"
              >
                {tab.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      {activeTab === 1 && <OverviewTab film = {film} />}
      {activeTab === 2 && <DetailsTab film = {film} />}
      {activeTab === 3 && <ReviewsTab reviews = {reviews} />}
    </>
  );
}

export default MovieTabs;
