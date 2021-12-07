import { Film } from '../../types/types';


export default function Footer({films} : {films: Film[]}): JSX.Element {


  return (
    <footer className="footer">
      <section className="footer__logo logo logo--smaller">Cinemaddict</section>
      <section className="footer__statistics">
        <p>{films.length} movies inside</p>
      </section>
    </footer>
  );
}
