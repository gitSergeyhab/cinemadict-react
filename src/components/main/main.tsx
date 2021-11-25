import { FilmListType } from '../../const';
import FilmExtraBlock from '../films-extra-block/films-extra-block';
import FilmMainBlock from '../films-main-block/films-main-block';
import MainNav from '../main-nav/main-nav';
import MainSort from '../main-sort/main-sort';

export default function Main(): JSX.Element {
  return (
    <main className="main">
      <MainNav/>

      <MainSort/>

      <section className="films">
        <FilmMainBlock/>

        <FilmExtraBlock filmBlockType={FilmListType.TopRated} />
        <FilmExtraBlock filmBlockType={FilmListType.MostCommented} />


      </section>
    </main>


  );
}
