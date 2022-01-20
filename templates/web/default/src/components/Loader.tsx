import { ReactElement } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

function Loader(): ReactElement {
  return (
    <div className="loader-container">
      <CircularProgress
        className="spinner"
      />
    </div>
  );
}

export default Loader;
