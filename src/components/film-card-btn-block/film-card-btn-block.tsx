import { useDispatch } from 'react-redux';
import { BtnType } from '../../const';
import { postStatusFilm } from '../../store/api-actions';
import { Film } from '../../types/types';


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

  const dispatch = useDispatch();

  const handleBtnClick = () => {
    const status = !film.userDetails[btnType];
    dispatch(postStatusFilm({film, btnType, status}));
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
