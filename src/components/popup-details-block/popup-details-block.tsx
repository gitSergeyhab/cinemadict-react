import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setPopup } from '../../store/catalog-reducer/catalog-reducer';

import { Film } from '../../types/types';
import { getDayMonthYear, getStringTime } from '../../utils/date-time-utils';


const Selector = {
  Card: '.film-card',
  Popup: '.film-details',
};


function GenreSpan({genre} : {genre: string}): JSX.Element {
  return  <span className="film-details__genre">{genre}</span>;
}

export default function PopupDetailsBlock({film}: {film: Film}): JSX.Element {

  const {filmInfo} = film;
  const {poster, title, alternativeTitle, ageRating, totalRating, director, writers, actors, release, runtime, genre, description} = filmInfo;
  const writersList = writers.join(', ');
  const actorsList = actors.join(', ');
  const data = getDayMonthYear(release.date);
  const time = getStringTime(runtime);
  const genreTitle = genre && genre.length ? 'Genres' : 'Genre';
  const genresList = genre && genre.length ? genre.map((el) => <GenreSpan genre={el} key={el}/>) : '';

  const dispatch = useDispatch();

  const closePopup = () => dispatch(setPopup(null));

  const escapeKeyDown = (evt: any) => {
    if (evt.key === 'Escape') {
      closePopup();
    }
  };

  const outPopupClick = (evt: any) => {
    if(!evt.target.closest(Selector.Popup) && !evt.target.closest(Selector.Card)) {
      closePopup();
    }
  };

  const handleCloseBtnClick = () => closePopup();

  useEffect(() => {
    document.addEventListener('keydown', escapeKeyDown);
    return () => document.removeEventListener('keydown', escapeKeyDown);
  });

  useEffect(() => {
    document.addEventListener('click', outPopupClick);
    return () => document.removeEventListener('click', outPopupClick);
  });


  return (
    <div className="film-details__top-container" >
      <div className="film-details__close">
        <button
          className="film-details__close-btn" type="button"
          onClick={handleCloseBtnClick}
        >
          close
        </button>
      </div>
      <div className="film-details__info-wrap">
        <div className="film-details__poster">
          <img className="film-details__poster-img" src={ poster } alt={ title }/>

          <p className="film-details__age">{ ageRating }</p>
        </div>

        <div className="film-details__info">
          <div className="film-details__info-head">
            <div className="film-details__title-wrap">
              <h3 className="film-details__title">{ title }</h3>
              <p className="film-details__title-original">{ alternativeTitle }</p>
            </div>

            <div className="film-details__rating">
              <p className="film-details__total-rating">{ totalRating }</p>
            </div>
          </div>

          <table className="film-details__table">
            <tbody>
              <tr className="film-details__row">
                <td className="film-details__term">Director</td>
                <td className="film-details__cell">
                  { director }
                </td>
              </tr>

              <tr className="film-details__row">
                <td className="film-details__term">Writers</td>
                <td className="film-details__cell">
                  { writersList }
                </td>
              </tr>

              <tr className="film-details__row">
                <td className="film-details__term">Actors</td>
                <td className="film-details__cell">
                  { actorsList}
                </td>
              </tr>

              <tr className="film-details__row">
                <td className="film-details__term">Release Date</td>
                <td className="film-details__cell">
                  { data }
                </td>
              </tr>

              <tr className="film-details__row">
                <td className="film-details__term">Runtime</td>
                <td className="film-details__cell">
                  { time }
                </td>
              </tr>

              <tr className="film-details__row">
                <td className="film-details__term">Country</td>
                <td className="film-details__cell">
                  { release.releaseCountry }
                </td>
              </tr>

              <tr className="film-details__row">
                <td className="film-details__term">
                  { genreTitle }
                </td>
                <td className="film-details__cell">
                  { genresList }
                </td>
              </tr>
            </tbody>
          </table>
          <p className="film-details__film-description">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
