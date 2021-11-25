import { MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FILM_PORTION, SortType } from '../../const';
import { setShownFilmCount, setSortType, sortFilterFilms } from '../../store/actions';
import { getSortType } from '../../store/film-reducer/film-reducer-selectors';


type SortOptionType = {sortType: SortType, text: string}

function SortOption({sortType, text} : SortOptionType): JSX.Element {
  const currentSort = useSelector(getSortType);

  const dispatch = useDispatch();
  const handleSortLiClick = (evt: MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    dispatch(setSortType(sortType));
    dispatch(setShownFilmCount(FILM_PORTION));
    dispatch(sortFilterFilms());
  };

  const classes = currentSort === sortType ? 'sort__button sort__button--active' : 'sort__button';

  return <li><a href="/" className={classes} onClick={handleSortLiClick}>{text}</a></li>;
}


export default function MainSort(): JSX.Element {

  return (
    <ul className="sort">
      <SortOption sortType={SortType.Default} text={'Sort by default'}/>
      <SortOption sortType={SortType.Date} text={'Sort by date'}/>
      <SortOption sortType={SortType.Rating} text={'Sort by rating'}/>
    </ul>
  );
}
