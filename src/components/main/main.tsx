
import FilmExtraBlock from '../films-extra-block/films-extra-block';
import FilmMainBlock from '../films-main-block/films-main-block';
import MainNav from '../main-nav/main-nav';
import MainSort from '../main-sort/main-sort';
import { FilmListType } from '../../const';
import { Film } from '../../types/types';


export default function Main({films} : {films: Film[]}): JSX.Element {


  return (
    <main className="main">
      <MainNav films={films}/>

      <MainSort films={films}/>

      <section className="films">

        <FilmMainBlock films={films}/>

        {
          films.length
            ?
            <>
              <FilmExtraBlock filmBlockType={FilmListType.TopRated} films={films}/>
              <FilmExtraBlock filmBlockType={FilmListType.MostCommented} films={films} />
            </>
            :
            null
        }
      </section>
    </main>
  );
}
