import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Period } from '../../const';
import { setPeriod } from '../../store/actions';
import { getMovies } from '../../store/film-reducer/film-reducer-selectors';
import { getPeriod } from '../../store/stat-reducer/stat-reducer-selectors';
import { renderChart } from '../../utils/render-chart';
import { filterWatchedFilmsByTime, getDatePeriod, getGenres, getGenresFromFilms, getSortingCountGenres, getTotalDuration } from '../../utils/stats-utils';
import { getRatingByWatched } from '../../utils/utils';
import MainNav from '../main-nav/main-nav';
// import { renderChart } from '../../utils/render-chart';

const BAR_HEIGHT = 50;


const capitalize = (item: string) => `${item[0].toUpperCase()}${item.slice(1)}`;


function Filter({period} : {period: Period}): JSX.Element {

  const selectedPeriod = useSelector(getPeriod);

  const dispatch = useDispatch();

  const handlePeriodChange = () => dispatch(setPeriod(period));

  return (
    <>
      <input
        onChange={handlePeriodChange}
        checked={period === selectedPeriod}
        type="radio" className="statistic__filters-input visually-hidden" name="statistic-filter" id={`statistic-${period}`} value={period}
      />
      <label htmlFor={`statistic-${period}`} className="statistic__filters-label">{period === Period.Day ? 'Today' : capitalize(period)}</label>
    </>
  );
}


export default function Stats(): JSX.Element {

  const period = useSelector(getPeriod);
  const refGraph = useRef(null);

  const films = useSelector(getMovies);
  const date = getDatePeriod(period);
  const {from, to} = date;

  useEffect(() => {
    const convas = refGraph.current;
    if (convas) {
      renderChart(convas, {films, date});
    }
  }, [date, films]);


  const watchedFilms = films.filter((film) => film.userDetails.alreadyWatched);
  const rank = getRatingByWatched(watchedFilms.length);

  const watchedFilmsByTime = filterWatchedFilmsByTime(watchedFilms, from, to);
  const totalDuration = getTotalDuration(watchedFilmsByTime);
  const topGenre = getSortingCountGenres(watchedFilmsByTime).genres[0] || '';

  const genreList = getGenresFromFilms(watchedFilmsByTime);

  const height = getGenres(genreList).length * BAR_HEIGHT || BAR_HEIGHT;


  // const height = getGenres(watchedFilmsByTime).length * BAR_HEIGHT || BAR_HEIGHT;

  const periods = [Period.All, Period.Day, Period.Week, Period.Month, Period.Year];


  return (
    <main className="main">

      <MainNav/>

      <section className="statistic">
        <p className="statistic__rank">
            Your rank
          <img className="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35"/>
          <span className="statistic__rank-label">{rank}</span>
        </p>

        <form action="https://echo.htmlacademy.ru/" method="get" className="statistic__filters">
          <p className="statistic__filters-description">Show stats:</p>
          {periods.map((filterPeriod) => <Filter period={filterPeriod} key={filterPeriod} />)}
        </form>

        <ul className="statistic__text-list">
          <li className="statistic__text-item">
            <h4 className="statistic__item-title">You watched</h4>
            <p className="statistic__item-text">{watchedFilmsByTime.length} <span className="statistic__item-description">movies</span></p>
          </li>
          <li className="statistic__text-item">
            <h4 className="statistic__item-title">Total duration</h4>
            <p className="statistic__item-text">{totalDuration.hour} <span className="statistic__item-description">h</span> {totalDuration.minute} <span className="statistic__item-description">m</span></p>
          </li>
          <li className="statistic__text-item">
            <h4 className="statistic__item-title">Top genre</h4>
            <p className="statistic__item-text">{topGenre}</p>
          </li>
        </ul>

        <div className="statistic__chart-wrap" style={{pointerEvents: 'none'}}>
          <canvas className="statistic__chart" width="1000" height={height} ref={refGraph}></canvas>
        </div>
      </section>
    </main>
  );
}
