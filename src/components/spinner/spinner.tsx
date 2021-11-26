import HashLoader from 'react-spinners/HashLoader';
import { css } from '@emotion/react';


const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
  padding-bottom: 40px;
`;


export default function Spinner(): JSX.Element {
  return (
    <div style={{textAlign: 'center', padding: '10%'}}>
      <span><HashLoader color='white' loading css={override}  size={140}/></span>
    Loading ...
    </div>);
}
