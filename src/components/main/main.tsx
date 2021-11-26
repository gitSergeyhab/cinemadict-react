import { useSelector } from 'react-redux';
import { FilmListType } from '../../const';
import { getFilmsError, getMovies, getMoviesLoadedStatus } from '../../store/film-reducer/film-reducer-selectors';
import FilmExtraBlock from '../films-extra-block/films-extra-block';
import FilmMainBlock from '../films-main-block/films-main-block';
import MainNav from '../main-nav/main-nav';
import MainSort from '../main-sort/main-sort';
import Spinner from '../spinner/spinner';

export default function Main(): JSX.Element {

  const films = useSelector(getMovies);
  const isLoading = useSelector(getMoviesLoadedStatus);
  const error = useSelector(getFilmsError);


  if (error) {
    return (
      <main className="main">
        <p style={{color: 'orange', fontSize: '30px', margin: '50px', textAlign: 'center', padding: '10%'}}>
        Something is wrong ...
        </p>
      </main>);
  }

  if (!isLoading) {
    return <Spinner/>;
  }

  return (
    <main className="main">
      <MainNav/>

      <MainSort/>

      <section className="films">

        <FilmMainBlock/>

        {
          films.length
            ?
            <>
              <FilmExtraBlock filmBlockType={FilmListType.TopRated} />
              <FilmExtraBlock filmBlockType={FilmListType.MostCommented} />
            </>
            :
            null
        }

      </section>
    </main>


  );
}
