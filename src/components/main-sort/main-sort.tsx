import { MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSortType } from '../../store/catalog-reducer/catalog-reducer-selectors';
import { FILM_PORTION, SortType } from '../../const';
import { setMainFilms, setShownMovieCount, setSortType } from '../../store/catalog-reducer/catalog-reducer';
import { Film } from '../../types/types';


type SortOptionType = {sortType: SortType, text: string, films: Film[]}

function SortOption({sortType, text, films} : SortOptionType): JSX.Element {

  const currentSort = useSelector(getSortType);

  const dispatch = useDispatch();
  const handleSortLiClick = (evt: MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    dispatch(setSortType(sortType));
    dispatch(setShownMovieCount(FILM_PORTION));
    dispatch(setMainFilms(films));
  };

  const classes = currentSort === sortType ? 'sort__button sort__button--active' : 'sort__button';

  return <li><a href="/" className={classes} onClick={handleSortLiClick}>{text}</a></li>;
}


export default function MainSort({films} : {films: Film[]}): JSX.Element {

  return (
    <ul className="sort">
      <SortOption sortType={SortType.Default} films={films} text={'Sort by default'}/>
      <SortOption sortType={SortType.Date} films={films} text={'Sort by date'}/>
      <SortOption sortType={SortType.Rating} films={films} text={'Sort by rating'}/>
    </ul>
  );
}
