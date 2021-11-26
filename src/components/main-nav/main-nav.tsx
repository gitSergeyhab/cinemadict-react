import { MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import { setFilter, setShownFilmCount, sortFilterFilms } from '../../store/actions';
import { getFilter, getMovies } from '../../store/film-reducer/film-reducer-selectors';
import { AppRoute, FilmFilter, FILM_PORTION } from '../../const';


type NavOptionType = {filter: FilmFilter, count: number | null}

function NavOption({filter, count} : NavOptionType): JSX.Element {

  const dispatch = useDispatch();
  const currentFilter = useSelector(getFilter);
  const history = useHistory();

  const handleFilterClick = (evt: MouseEvent) => {
    evt.preventDefault();
    dispatch(setFilter(filter));
    dispatch(setShownFilmCount(FILM_PORTION));
    dispatch(sortFilterFilms());
    history.push(AppRoute.Main);
  };

  const spanElement = count ? <span className="main-navigation__item-count">{count}</span> : null;
  const classes = filter === currentFilter ? 'main-navigation__item main-navigation__item--active' : 'main-navigation__item';

  return  <a href="/" className={classes} onClick={handleFilterClick}>{filter}{spanElement}</a>;
}


export default function MainNav(): JSX.Element {

  const history = useHistory();
  const dispatch = useDispatch();
  const filter = useSelector(getFilter);
  const films = useSelector(getMovies);

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
        <NavOption filter={FilmFilter.AllMovies} count={null}/>
        <NavOption filter={FilmFilter.WatchList} count={watchList}/>
        <NavOption filter={FilmFilter.History} count={alreadyWatched}/>
        <NavOption filter={FilmFilter.Favorites} count={favorites}/>

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
