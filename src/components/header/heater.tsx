import { useSelector } from 'react-redux';
import { getMovies } from '../../store/film-reducer/film-reducer-selectors';
import { getRatingByWatched } from '../../utils/utils';

export default function Header(): JSX.Element {

  const films = useSelector(getMovies);
  const rang = getRatingByWatched(films.filter((film) => film.userDetails.alreadyWatched).length);

  return (
    <header className="header">
      <h1 className="header__logo logo">Cinemaddict</h1>

      <section className="header__profile profile">
        <p className="profile__rating">{rang}</p>
        <img className="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35"/>
      </section>
    </header>
  );
}
