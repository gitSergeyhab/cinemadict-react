import { MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FilmFilter, FILM_PORTION } from '../../const';
import { setFilter, setShownFilmCount, sortFilterFilms } from '../../store/actions';
import { getFilter, getMovies } from '../../store/film-reducer/film-reducer-selectors';

type NavOptionType = {filter: FilmFilter, count: number | null}
function NavOption({filter, count} : NavOptionType): JSX.Element {

  const dispatch = useDispatch();
  const currentFilter = useSelector(getFilter);

  const handleFilterClick = (evt: MouseEvent) => {
    evt.preventDefault();
    dispatch(setFilter(filter));
    dispatch(setShownFilmCount(FILM_PORTION));
    dispatch(sortFilterFilms());
  };

  const spanElement = count ? <span className="main-navigation__item-count">{count}</span> : null;
  const classes = filter === currentFilter ? 'main-navigation__item main-navigation__item--active' : 'main-navigation__item';

  return  <a href="/" className={classes} onClick={handleFilterClick}>{filter}{spanElement}</a>;
}


export default function MainNav(): JSX.Element {

  const films = useSelector(getMovies);
  const favorites = films.filter((film) => film.userDetails.favorite).length;
  const alreadyWatched = films.filter((film) => film.userDetails.alreadyWatched).length;
  const watchList = films.filter((film) => film.userDetails.watchList).length;

  return (
    <nav className="main-navigation">
      <div className="main-navigation__items">
        <NavOption filter={FilmFilter.AllMovies} count={null}/>
        <NavOption filter={FilmFilter.WatchList} count={watchList}/>
        <NavOption filter={FilmFilter.History} count={alreadyWatched}/>
        <NavOption filter={FilmFilter.Favorites} count={favorites}/>

      </div>
      <a href="#stats" className="main-navigation__additional">Stats</a>
    </nav>
  );
}
