import { useSelector } from 'react-redux';

import FilmCard from '../film-card/film-card';
import { getMostCommentedMovies, getTopRatedMovies } from '../../store/film-reducer/film-reducer-selectors';
import { FilmListType } from '../../const';


export default function FilmExtraBlock({filmBlockType}: {filmBlockType: FilmListType}): JSX.Element {

  const films = useSelector(filmBlockType === FilmListType.MostCommented ? getMostCommentedMovies : getTopRatedMovies);

  const filmList = films.map((film) => <FilmCard film={film} key={film.id} />);

  return (
    <section className="films-list films-list--extra">
      <h2 className="films-list__title">{filmBlockType}</h2>

      <div className="films-list__container">

        {filmList}

      </div>
    </section>);
}
