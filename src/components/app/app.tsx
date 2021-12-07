import { useSelector } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';

import Footer from '../footer/footer';
import Header from '../header/heater';
import Main from '../main/main';
import NotFoundPage from '../not-found-page/not-found-page';
import Popup from '../popup/popup';
import Spinner from '../spinner/spinner';
import Stats from '../stats/stats';
import { useGetFilmsQuery } from '../../services/query-api';
import { ServerFilm } from '../../types/types';
import { adaptToClient } from '../../services/adapters';
import { getPopupId } from '../../store/catalog-reducer/catalog-reducer-selectors';
import { AppRoute, CLASS_HIDE_SCROLL } from '../../const';

import 'react-toastify/dist/ReactToastify.css';
import ErrorBlock from '../error/error';


function App(): JSX.Element {

  const isPopup = useSelector(getPopupId);


  useEffect(() => {
    if (isPopup) {
      document.body.classList.add(CLASS_HIDE_SCROLL); // скролл станицы только при закрытом попапе
    } else {
      document.body.classList.remove(CLASS_HIDE_SCROLL);
    }
  }, [isPopup]);

  const { data, isLoading, isError } = useGetFilmsQuery([]);

  if (isError) {
    return <ErrorBlock/>;
  }

  if (isLoading || !data) {
    return <Spinner/>;
  }

  const films = data.map((film: ServerFilm) => adaptToClient(film));

  return (
    <BrowserRouter>
      <ToastContainer/>
      <Header films={films}/>

      <Switch>
        <Route exact path={AppRoute.Main}>
          <Main films={films}/>
        </Route>
        <Route exact path={AppRoute.Stats}>
          <Stats films={films}/>
        </Route>
        <Route>
          <NotFoundPage/>
        </Route>
      </Switch>

      <Footer films={films}/>
      {isPopup && <Popup films={films}/>}
    </BrowserRouter>
  );
}

export default App;
