import { useSelector } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';

import Footer from '../footer/footer';
import Header from '../header/heater';
import Main from '../main/main';
import NotFoundPage from '../not-found-page/not-found-page';
import Popup from '../popup/popup';
import Stats from '../stats/stats';
import { getPopupFilm } from '../../store/popup-reducer/popup-reducer-selectors';
import { AppRoute, CLASS_HIDE_SCROLL } from '../../const';

import 'react-toastify/dist/ReactToastify.css';


function App(): JSX.Element {

  const popupFilm = useSelector(getPopupFilm);

  useEffect(() => {
    if (popupFilm) {
      document.body.classList.add(CLASS_HIDE_SCROLL); // скролл станицы только при закрытом попапе
    } else {
      document.body.classList.remove(CLASS_HIDE_SCROLL);
    }
  }, [popupFilm]);


  return (
    <BrowserRouter>
      <ToastContainer />
      <Header/>

      <Switch>
        <Route exact path={AppRoute.Main}>
          <Main/>
        </Route>
        <Route exact path={AppRoute.Stats}>
          <Stats/>
        </Route>
        <Route>
          <NotFoundPage/>
        </Route>
      </Switch>

      <Footer/>
      {popupFilm ? <Popup/> : null}{/* покажет попап только ели в редюсере есть popupFilm */}
    </BrowserRouter>
  );
}

export default App;
