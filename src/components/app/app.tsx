import { useSelector } from 'react-redux';
import { getPopupFilm } from '../../store/popup-reducer/popup-reducer-selectors';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Footer from '../footer/footer';
import Header from '../header/heater';
import Main from '../main/main';
import Popup from '../popup/popup';
import Stats from '../stats/stats';
import { AppRoute, CLASS_HIDE_SCROLL } from '../../const';
import { useEffect } from 'react';


function App(): JSX.Element {

  const popupFilm = useSelector(getPopupFilm);

  useEffect(() => {
    if (popupFilm) {
      document.body.classList.add(CLASS_HIDE_SCROLL);
    } else {
      document.body.classList.remove(CLASS_HIDE_SCROLL);
    }
  }, [popupFilm]);


  return (
    <BrowserRouter>
      <Header/>

      <Switch>
        <Route exact path={AppRoute.Main}>
          <Main/>
        </Route>
        <Route exact path={AppRoute.Stats}>
          <Stats/>
        </Route>
      </Switch>

      <Footer/>
      {popupFilm ? <Popup/> : null}
    </BrowserRouter>
  );
}

export default App;
