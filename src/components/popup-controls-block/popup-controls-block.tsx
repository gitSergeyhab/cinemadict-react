import { useDispatch } from 'react-redux';
import { BtnType } from '../../const';
import { postStatusFilm } from '../../store/api-actions';
import { Film } from '../../types/types';


export const enum ControlType {
  WatchList = 'watchlist',
  Watched = 'watched',
  Favorite = 'favorite',
}

export const enum ControlText {
  WatchList = 'Add to watchlist',
  Watched = 'Already watched',
  Favorite = 'Add to favorites',
}


type PopupControlType = {controlType: ControlType, btnType: BtnType, active: boolean, text: ControlText, film: Film};


function PopupControl({controlType, btnType, active, text, film}: PopupControlType): JSX.Element {

  const dispatch = useDispatch();

  const handleControlClick = () => {
    const status = !film.userDetails[btnType];
    dispatch(postStatusFilm({film, btnType, status}));
  };

  const activeClass = active ? 'film-details__control-button--active' : '';
  const classes = `film-details__control-button film-details__control-button--${controlType} ${activeClass}`;

  return (
    <button
      onClick={handleControlClick}
      type="button" className={classes} id={controlType} name={controlType}
    >
      {text}
    </button>

  );
}


export default function PopupControlsBlock({film} : {film: Film}): JSX.Element {
  return (

    <section className="film-details__controls">

      <PopupControl controlType={ControlType.WatchList} btnType={BtnType.WatchList} active={film.userDetails.watchList} text={ControlText.WatchList} film={film}/>
      <PopupControl controlType={ControlType.Watched} btnType={BtnType.AlreadyWatched} active={film.userDetails.alreadyWatched} text={ControlText.Watched} film={film}/>
      <PopupControl controlType={ControlType.Favorite} btnType={BtnType.Favorite} active={film.userDetails.favorite} text={ControlText.Favorite} film={film}/>

      {/* <button type="button" className="film-details__control-button film-details__control-button--watchlist" id="watchlist" name="watchlist">Add to watchlist</button>
      <button type="button" className="film-details__control-button film-details__control-button--active film-details__control-button--watched" id="watched" name="watched">Already watched</button>
      <button type="button" className="film-details__control-button film-details__control-button--favorite" id="favorite" name="favorite">Add to favorites</button> */}
    </section>
  );
}

