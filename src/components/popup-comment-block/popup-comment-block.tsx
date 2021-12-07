import { KeyboardEvent, useRef, useState } from 'react';

import ErrorBlock from '../error/error';
import { Comment, Film } from '../../types/types';
import { humanizeDate } from '../../utils/date-time-utils';
import { Emotion, ErrorMessage } from '../../const';
import { useAddCommentMutation, useDeleteCommentMutation, useGetCommentsQuery } from '../../services/query-api';
import { toast } from 'react-toastify';

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

function CommentLi({review} : {review: Comment}) : JSX.Element {

  const {author, comment, date, emotion} = review;

  const src = `./images/emoji/${emotion}.png`;
  const dateTime = humanizeDate(date);

  const [shake, setShake] = useState(false);
  const [isDisabled, setDisabled] = useState(false);

  const [deleteComment] = useDeleteCommentMutation();

  const handleDeleteClick = async() => {
    setDisabled(true);
    try {
      await deleteComment(review.id).unwrap();
    } catch {
      setDisabled(false);
      setShake(true);
      setTimeout(() => setShake(false), 1000);
      toast.error(ErrorMessage.DeleteCommentAction);
    }
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


type PopupCommentType = {film: Film, setShake: React.Dispatch<React.SetStateAction<boolean>>}

export default function PopupCommentBlock({film, setShake} : PopupCommentType): JSX.Element {


  const { data, isError, isLoading, isFetching } = useGetCommentsQuery(film.id);

  const [addComment] = useAddCommentMutation();

  const refText = useRef<HTMLTextAreaElement>(null);

  const [emoji, setEmoji] = useState<null | Emotion>(null);
  const [isDisabled, setDisabled] = useState(false);

  if (isError) {
    return <ErrorBlock/>;
  }

  if (!data) {
    return <span></span>;
  }

  const img = <img src={`./images/emoji/${emoji}.png`} width="55" height="55" alt="emoji"/>;
  const commentsNum = data.length;
  const commentList = data.map((review: Comment) => <CommentLi review={review} key={review.id}/>);
  const emotions = [Emotion.Smile, Emotion.Sleeping, Emotion.Puke, Emotion.Angry];
  const emotionBlock = emotions.map((emo) => <EmojiBlock emoji={emo} onChange={() => setEmoji(emo)} key={emo} isDisabled={isDisabled}/>);
  const errorMessage = <h3 className="film-details__comments-title" style={{color: 'orangered'}}>Something is wrong<span className="film-details__comments-count"> ... </span></h3>;
  const title = isLoading || isFetching ?
    <h3 className="film-details__comments-title">Loading <span className="film-details__comments-count"> ... </span></h3> :
    <h3 className="film-details__comments-title">Comments <span className="film-details__comments-count">{commentsNum}</span></h3>;


  const clear = () => {
    setEmoji(null);
    if (refText.current) {
      refText.current.value ='';
    }
  };

  const unBlock = () => setDisabled(false);


  const handleTextareaKeyDown = async(evt: KeyboardEvent<HTMLTextAreaElement>) => {
    if (evt.ctrlKey && evt.key === 'Enter' && refText.current && emoji) {
      const comment = refText.current.value.trim();
      if (comment) {
        setDisabled(true);
        try {
          await addComment({body: {comment, emotion: emoji}, filmId: film.id}).unwrap();
          clear();
        } catch {
          setShake(true);
          setTimeout(() => setShake(false), 1000);
          toast.error(ErrorMessage.PostCommentAction);
        }
        unBlock();
      }
    }
  };

  return (
    <div className="film-details__bottom-container">
      <section className="film-details__comments-wrap">

        {isError ? errorMessage : title}

        <ul className="film-details__comments-list">

          {isFetching || isLoading ? null : commentList}

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
