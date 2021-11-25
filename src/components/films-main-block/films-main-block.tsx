import { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FILM_PORTION } from '../../const';
import { setShownFilmCount, sortFilterFilms } from '../../store/actions';
import { getMainMovies, getMoviesLoadedStatus, getShownMovieCount } from '../../store/film-reducer/film-reducer-selectors';
import FilmCard from '../film-card/film-card';


function ShowMoreBtn({onClick}: {onClick: () => void}): JSX.Element {
  return (
    <button className="films-list__show-more"
      onClick={onClick}
    >
    Show more
    </button>
  );
}


export default function FilmMainBlock(): JSX.Element {

  const films = useSelector(getMainMovies);
  const areFilmsLoaded = useSelector(getMoviesLoadedStatus);
  const shownFilms = useSelector(getShownMovieCount);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(sortFilterFilms());
  }, [dispatch, areFilmsLoaded]);

  // const [filmNum, setFilmNum] = useState(FILM_PORTION);

  if (!areFilmsLoaded) {
    return <span> ups...</span>;
  }

  const handleBtnClick = () => {
    dispatch(setShownFilmCount(shownFilms + FILM_PORTION));
  };

  const filmList = films.slice(0, shownFilms).map((film) => <FilmCard film={film} key={film.id} />);

  const showMoreBtn = films.length > shownFilms ? <ShowMoreBtn onClick={handleBtnClick}/> : null;

  return (
    <section className="films-list">
      <h2 className="films-list__title visually-hidden">All Movies</h2>

      <div className="films-list__container">
        {filmList}
      </div>

      {showMoreBtn}

    </section>);
}

