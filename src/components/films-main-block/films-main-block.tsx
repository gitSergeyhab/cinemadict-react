import { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import FilmCard from '../film-card/film-card';
import { setShownFilmCount, sortFilterFilms } from '../../store/actions';
import { getFilter, getMainMovies, getMoviesLoadedStatus, getShownMovieCount } from '../../store/film-reducer/film-reducer-selectors';
import { EmptyResultMessage, FilmFilter, FILM_PORTION } from '../../const';


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
  const filter = useSelector(getFilter);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(sortFilterFilms());
  }, [dispatch, areFilmsLoaded]);


  const handleBtnClick = () => {
    dispatch(setShownFilmCount(shownFilms + FILM_PORTION));
  };


  let emptyMessage = EmptyResultMessage.All;
  switch (filter) {
    case FilmFilter.Favorites:
      emptyMessage = EmptyResultMessage.Favorites; break;
    case FilmFilter.History:
      emptyMessage = EmptyResultMessage.History; break;
    case FilmFilter.WatchList:
      emptyMessage = EmptyResultMessage.WatchList;
  }

  const emptyBlock = <div style={{margin: 'auto', fontSize: '27px', paddingTop: '13%', paddingBottom: '8%'}}>{emptyMessage}</div>;

  const filmList = films.slice(0, shownFilms).map((film) => <FilmCard film={film} key={film.id} />);

  const showMoreBtn = films.length > shownFilms ? <ShowMoreBtn onClick={handleBtnClick}/> : null;

  return (
    <section className="films-list">
      <h2 className="films-list__title visually-hidden">All Movies</h2>

      <div className="films-list__container">
        {films.length ? filmList : emptyBlock}
      </div>

      {showMoreBtn}

    </section>);
}

