import { useState } from 'react';
import { useSelector } from 'react-redux';

import PopupCommentBlock from '../popup-comment-block/popup-comment-block';
import PopupControlsBlock from '../popup-controls-block/popup-controls-block';
import PopupDetailsBlock from '../popup-details-block/popup-details-block';

import './popup.css';
import { getPopupId } from '../../store/catalog-reducer/catalog-reducer-selectors';
import NotFoundPage from '../not-found-page/not-found-page';
import { Film } from '../../types/types';

export default function Popup({films} : {films: Film[]}): JSX.Element {

  const [shake, setShake] = useState(false);

  const popupId = useSelector(getPopupId);

  const film = films.find((item) => item.id === popupId);


  if (!film) {
    return <NotFoundPage/>;
  }

  const formClasses = shake ?  'film-details__inner shake' : 'film-details__inner';

  return(
    <section className="film-details">
      <form className={formClasses} action="" method="get">

        <PopupDetailsBlock film={film}/>

        <PopupControlsBlock film={film}/>

        <PopupCommentBlock film={film} setShake={setShake}/>

      </form>
    </section>
  );
}
