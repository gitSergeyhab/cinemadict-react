import FilmCard from '../film-card/film-card';
import { FilmListType } from '../../const';
import { getMostCommentedFilms, getTopFilms } from '../../utils/utils';
import { Film } from '../../types/types';


export default function FilmExtraBlock({filmBlockType, films}: {filmBlockType: FilmListType, films: Film[]}): JSX.Element {


  const extraFilms = filmBlockType === FilmListType.MostCommented ? getMostCommentedFilms(films) : getTopFilms(films);

  const filmList = extraFilms.map((film) => <FilmCard film={film} key={film.id} />);

  return (
    <section className="films-list films-list--extra">
      <h2 className="films-list__title">{filmBlockType}</h2>

      <div className="films-list__container">

        {filmList}

      </div>
    </section>);
}
