import { useDispatch, useSelector } from 'react-redux';

import FilmCard from '../film-card/film-card';
import { getFilter, getShownMovieCount, getSortType } from '../../store/catalog-reducer/catalog-reducer-selectors';
import { EmptyResultMessage, FilmFilter, FILM_PORTION } from '../../const';
import { Film } from '../../types/types';
import { setShownMovieCount } from '../../store/catalog-reducer/catalog-reducer';
import { getSortedFilteredFilms } from '../../utils/utils';


function ShowMoreBtn({onClick}: {onClick: () => void}): JSX.Element {
  return (
    <button className="films-list__show-more"
      onClick={onClick}
    >
    Show more
    </button>
  );
}


export default function FilmMainBlock({films} : {films: Film[]}): JSX.Element {

  const shownFilms = useSelector(getShownMovieCount);
  const filter = useSelector(getFilter);
  const sortType = useSelector(getSortType);

  const dispatch = useDispatch();


  const handleBtnClick = () => {
    dispatch(setShownMovieCount(shownFilms + FILM_PORTION));
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

  const displayFilms = getSortedFilteredFilms(films, filter, sortType);

  const emptyBlock = <div style={{margin: 'auto', fontSize: '27px', paddingTop: '13%', paddingBottom: '8%'}}>{emptyMessage}</div>;

  const filmList = displayFilms.slice(0, shownFilms).map((film) => <FilmCard film={film} key={film.id} />);

  const showMoreBtn = displayFilms.length > shownFilms ? <ShowMoreBtn onClick={handleBtnClick}/> : null;

  return (
    <section className="films-list">
      <h2 className="films-list__title visually-hidden">All Movies</h2>

      <div className="films-list__container">
        {displayFilms.length ? filmList : emptyBlock}
      </div>

      {showMoreBtn}

    </section>);
}

