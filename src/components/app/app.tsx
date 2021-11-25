// import { useSelector } from 'react-redux';
// import { getPopupFilm } from '../../store/popup-reducer/popup-reducer-selectors';
import Footer from '../footer/footer';
import Header from '../header/heater';
import Main from '../main/main';
import Popup from '../popup/popup';


function App(): JSX.Element {

  // const popupFilm = useSelector(getPopupFilm);
  return (
    <>
      <Header/>
      <Main/>
      <Footer/>
      {/* {popupFilm ? <Popup/> : null} */}
      <Popup/>
    </>
  );
}

export default App;
