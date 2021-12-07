import { Film } from '../../types/types';
import { BtnType, ErrorMessage } from '../../const';
import { usePutFilmMutation } from '../../services/query-api';
import { toast } from 'react-toastify';


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

  const [putFilm] = usePutFilmMutation();

  const handleControlClick = async() => {
    const status = !film.userDetails[btnType];
    try {
      await putFilm({film, btnType, status});
    } catch {
      toast.error(ErrorMessage.PostStatusFilm);
    }
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
    </section>
  );
}

