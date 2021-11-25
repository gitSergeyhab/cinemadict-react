import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCommentsAction } from '../../store/api-actions';
import { getComments, getPopupFilm } from '../../store/popup-reducer/popup-reducer-selectors';
import PopupCommentBlock from '../popup-comment-block/popup-comment-block';
import PopupControlsBlock from '../popup-controls-block/popup-controls-block';
import PopupDetailsBlock from '../popup-details-block/popup-details-block';

import './popup.css';

export default function Popup(): JSX.Element {

  const film = useSelector(getPopupFilm);

  const comments = useSelector(getComments);

  const dispatch = useDispatch();

  const [shake, setShake] = useState(false);

  useEffect(() => {
    if (film) {
      dispatch(fetchCommentsAction(film.id));
    }
  }, [dispatch, film]);

  if (!film) {
    return <span>...</span>;
  }

  const formClasses = shake ?  'film-details__inner shake' : 'film-details__inner';

  return(
    <section className="film-details">
      <form className={formClasses} action="" method="get">

        <PopupDetailsBlock film={film}/>

        <PopupControlsBlock film={film}/>

        <PopupCommentBlock comments={comments} film={film} setShake={setShake}/>

      </form>
    </section>
  );
}
