import { useSelector } from 'react-redux';
import { getMovies } from '../../store/film-reducer/film-reducer-selectors';


export default function Footer(): JSX.Element {
  const films = useSelector(getMovies);
  return (
    <footer className="footer">
      <section className="footer__logo logo logo--smaller">Cinemaddict</section>
      <section className="footer__statistics">
        <p>{films.length} movies inside</p>
      </section>
    </footer>
  );
}
