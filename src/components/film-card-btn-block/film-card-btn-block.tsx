import { Film } from '../../types/types';
import { BtnType, ErrorMessage } from '../../const';
import { usePutFilmMutation } from '../../services/query-api';
import { toast } from 'react-toastify';


const BTN_ACTIVE_CLASS = 'film-card__controls-item--active';

const BtnClass = {
  [BtnType.WatchList] : 'add-to-watchlist',
  [BtnType.AlreadyWatched] : 'mark-as-watched',
  [BtnType.Favorite] : 'favorite',
};

const enum BtnText {
  WatchList = 'Add to watchlist',
  Watched = 'mark-as-watched',
  Favorite = 'favorite',
}


function FilmCardBtn({btnType, active, text, film} : {btnType: BtnType, active: boolean, text: BtnText, film: Film}): JSX.Element {

  const btnClass = BtnClass[btnType];

  const [putFilm] = usePutFilmMutation();

  const handleBtnClick = async() => {
    const status = !film.userDetails[btnType];
    try {
      await putFilm({film, btnType, status});
    } catch {
      toast.error(ErrorMessage.PostStatusFilm);
    }
  };

  const activeClass = active ? BTN_ACTIVE_CLASS : '';

  return(
    <button
      onClick={handleBtnClick}
      className={`film-card__controls-item film-card__controls-item--${btnClass} ${activeClass}`} type="button"
    >
      {text}
    </button>
  );
}


export default function FilmCardBtnBlock({film} : {film: Film}): JSX.Element {
  const {userDetails} = film;
  const {watchList, alreadyWatched, favorite} = userDetails;


  return (
    <div className="film-card__controls">
      <FilmCardBtn btnType={BtnType.WatchList} film={film} active={watchList} text={BtnText.WatchList} />
      <FilmCardBtn btnType={BtnType.AlreadyWatched} film={film} active={alreadyWatched} text={BtnText.Watched} />
      <FilmCardBtn btnType={BtnType.Favorite} film={film} active={favorite} text={BtnText.Favorite} />
    </div>
  );
}
