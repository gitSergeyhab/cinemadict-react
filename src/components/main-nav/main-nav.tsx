import { MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import { getFilter } from '../../store/catalog-reducer/catalog-reducer-selectors';
import { Film } from '../../types/types';
import { setFilter, setMainFilms, setShownMovieCount } from '../../store/catalog-reducer/catalog-reducer';
import { AppRoute, FilmFilter, FILM_PORTION } from '../../const';


type NavOptionType = {films: Film[], filter: FilmFilter, count: number | null}

function NavOption({films, filter, count} : NavOptionType): JSX.Element {

  const dispatch = useDispatch();
  const currentFilter = useSelector(getFilter);
  const history = useHistory();

  const handleFilterClick = (evt: MouseEvent) => {
    evt.preventDefault();
    dispatch(setFilter(filter));
    dispatch(setShownMovieCount(FILM_PORTION));
    dispatch(setMainFilms(films));
    history.push(AppRoute.Main);
  };

  const spanElement = count ? <span className="main-navigation__item-count">{count}</span> : null;
  const classes = filter === currentFilter ? 'main-navigation__item main-navigation__item--active' : 'main-navigation__item';

  return  <a href="/" className={classes} onClick={handleFilterClick}>{filter}{spanElement}</a>;
}


export default function MainNav({films} : {films: Film[]}): JSX.Element {

  const history = useHistory();
  const dispatch = useDispatch();
  const filter = useSelector(getFilter);

  const favorites = films.filter((film) => film.userDetails.favorite).length;
  const alreadyWatched = films.filter((film) => film.userDetails.alreadyWatched).length;
  const watchList = films.filter((film) => film.userDetails.watchList).length;

  const handleStatsClick = (evt: MouseEvent) => {
    evt.preventDefault();
    dispatch(setFilter(FilmFilter.Stats));
    history.push(AppRoute.Stats);
  };

  const statsClasses = filter === FilmFilter.Stats ? 'main-navigation__additional main-navigation__item--active' : 'main-navigation__additional';

  return (
    <nav className="main-navigation">
      <div className="main-navigation__items">
        <NavOption filter={FilmFilter.AllMovies} count={null} films={films}/>
        <NavOption filter={FilmFilter.WatchList} count={watchList} films={films}/>
        <NavOption filter={FilmFilter.History} count={alreadyWatched} films={films}/>
        <NavOption filter={FilmFilter.Favorites} count={favorites} films={films}/>

      </div>
      <a
        onClick={handleStatsClick}
        href="/" className={statsClasses}
      >
        Stats
      </a>
    </nav>
  );
}
