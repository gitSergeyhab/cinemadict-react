import { KeyboardEvent, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Emotion } from '../../const';
import { deleteCommentAction, postCommentAction } from '../../store/api-actions';
import { getCommentsError, getCommentsLoadedStatus } from '../../store/popup-reducer/popup-reducer-selectors';
import { Comment, Film } from '../../types/types';
import { humanizeDate } from '../../utils/date-time-utils';

import './popup-comment-block.css';


type EmojiBlockTypes = {emoji: Emotion, onChange: () => void, isDisabled: boolean};

function EmojiBlock({emoji, onChange, isDisabled} : EmojiBlockTypes): JSX.Element {

  const src = `./images/emoji/${emoji}.png`;
  const id = `emoji-${emoji}`;

  return (
    <>
      <input className="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id={id} value={emoji} onChange={onChange} disabled={isDisabled}/>
      <label className="film-details__emoji-label" htmlFor={id}>
        <img src={src} width="30" height="30" alt="emoji"/>
      </label>
    </>
  );
}

function CommentLi({review, film} : {review: Comment, film: Film}) : JSX.Element {

  const {id, author, comment, date, emotion} = review;

  const src = `./images/emoji/${emotion}.png`;
  const dateTime = humanizeDate(date);

  const [shake, setShake] = useState(false);
  const [isDisabled, setDisabled] = useState(false);

  const unBlock = () => setDisabled(false);


  const dispatch = useDispatch();

  const handleDeleteClick = () => {
    setDisabled(true);
    dispatch(deleteCommentAction({commentId: id, film: film, unBlock, setShake}));
  };

  const buttonClasses = shake ? 'film-details__comment-delete shake' : 'film-details__comment-delete';
  const spanClasses = shake ? 'film-details__comment-emoji shake' : 'film-details__comment-emoji';


  return (
    <li className="film-details__comment">
      <span className={spanClasses}>
        <img src={src} width="55" height="55" alt="emoji-smile"/>
      </span>
      <div>
        <p className="film-details__comment-text">{comment}</p>
        <p className="film-details__comment-info">
          <span className="film-details__comment-author">{author}</span>
          <span className="film-details__comment-day">{dateTime}</span>
          <button
            onClick={handleDeleteClick}
            className={buttonClasses}
            type='button'
            disabled={isDisabled}
          >
            Delete
          </button>
        </p>
      </div>
    </li>
  );
}

type PopupCommentType = {comments: Comment[], film: Film, setShake: React.Dispatch<React.SetStateAction<boolean>>}

export default function PopupCommentBlock({comments, film, setShake} : PopupCommentType): JSX.Element {

  const refText = useRef<HTMLTextAreaElement>(null);
  const areCommentsLoaded = useSelector(getCommentsLoadedStatus);
  const error = useSelector(getCommentsError);


  const commentsNum = comments.length;
  const commentList = comments.map((review) => <CommentLi review={review} film={film} key={review.id}/>);

  const [emoji, setEmoji] = useState<null | Emotion>(null);
  const [isDisabled, setDisabled] = useState(false);

  const img = <img src={`./images/emoji/${emoji}.png`} width="55" height="55" alt="emoji"/>;

  const dispatch = useDispatch();

  const emotions = [Emotion.Smile, Emotion.Sleeping, Emotion.Puke, Emotion.Angry];
  const emotionBlock = emotions.map((emo) => <EmojiBlock emoji={emo} onChange={() => setEmoji(emo)} key={emo} isDisabled={isDisabled}/>);

  const title = areCommentsLoaded ?
    <h3 className="film-details__comments-title">Comments <span className="film-details__comments-count">{commentsNum}</span></h3> :
    <h3 className="film-details__comments-title">Loading <span className="film-details__comments-count"> ... </span></h3>;

  const errorMessage = <h3 className="film-details__comments-title" style={{color: 'orangered'}}>Something is wrong<span className="film-details__comments-count"> ... </span></h3>;

  const clear = () => {
    setEmoji(null);
    if (refText.current) {
      refText.current.value ='';
    }
  };

  const unBlock = () => setDisabled(false);

  const handleTextareaKeyDown = (evt: KeyboardEvent<HTMLTextAreaElement>) => {
    if (evt.ctrlKey && evt.key === 'Enter' && refText.current && emoji) {
      const comment = refText.current.value.trim();
      if (comment) {
        setDisabled(true);
        dispatch(postCommentAction({id: film.id, comment, emotion: emoji, unBlock, clear, setShake}));
      }
    }
  };

  return (
    <div className="film-details__bottom-container">
      <section className="film-details__comments-wrap">

        {error ? errorMessage : title}

        <ul className="film-details__comments-list">

          {areCommentsLoaded ? commentList : null}

        </ul>

        <div className="film-details__new-comment">
          <div className="film-details__add-emoji-label">

            {emoji ? img : null}

          </div>

          <label className="film-details__comment-label">
            <textarea
              ref={refText}
              onKeyDown={handleTextareaKeyDown}
              defaultValue=''
              disabled={isDisabled}
              className="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"
            >

            </textarea>
          </label>

          <div className="film-details__emoji-list">

            {emotionBlock}

          </div>
        </div>
      </section>
    </div>
  );
}
