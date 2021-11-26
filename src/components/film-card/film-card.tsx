import { MouseEvent } from 'react';
import { useDispatch } from 'react-redux';

import FilmCardBtnBlock from '../film-card-btn-block/film-card-btn-block';
import { setCommentsLoadedStatus, setFilmToPopup } from '../../store/actions';
import { Film } from '../../types/types';
import { getStringTime, getYear } from '../../utils/date-time-utils';
import { cutOffDescription } from '../../utils/utils';


export default function FilmCard({film} : {film: Film}): JSX.Element {

  const {filmInfo, comments} = film;
  const {title, totalRating, release, runtime, genre, description, poster} = filmInfo;

  const dispatch = useDispatch();

  const firsGenre = genre && genre.length ? genre[0] : '';
  const year = getYear(release.date);
  const time = getStringTime(runtime);

  const handleOpenPopupElementClick = (evt: MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    dispatch(setCommentsLoadedStatus(false)); // чтоб пока не загрузились коменту к новому попапу отображался loading
    dispatch(setFilmToPopup(film));
  };

  return(
    <article className="film-card">

      <h3 className="film-card__title"
        onClick={handleOpenPopupElementClick}
      >
        { title }
      </h3>

      <p className="film-card__rating">{ totalRating }</p>
      <p className="film-card__info">
        <span className="film-card__year">{ year }</span>
        <span className="film-card__duration">{ time }</span>
        <span className="film-card__genre">{ firsGenre }</span>
      </p>

      <img src={poster} alt={title} className="film-card__poster"
        onClick={handleOpenPopupElementClick}
      />

      <p className="film-card__description">{ cutOffDescription(description) }</p>

      <a href='/' className="film-card__comments"
        onClick={handleOpenPopupElementClick}
      >{ comments.length } comments
      </a>

      <FilmCardBtnBlock film={film} />

    </article>
  );
}
