import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';


export default function NotFoundPage(): JSX.Element {
  return (
    <div style={{textAlign: 'center', paddingBottom: '20%'}}>
      <div style={{color: 'white', fontSize: '13px', margin: '50px', textAlign: 'center'}}>
        ERROR 404
      </div>
      <div style={{color: 'white', fontSize: '20px', margin: '50px', textAlign: 'center'}}>
        PAGE NOT FOUND
      </div>
      <Link to={AppRoute.Main} style={{color: 'orange', fontSize: '30px', margin: '50px', textAlign: 'center'}}>MAIN PAGE</Link>
    </div>
  );
}
