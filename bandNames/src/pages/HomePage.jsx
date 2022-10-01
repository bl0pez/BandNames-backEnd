import { useContext } from 'react';

import { BandAdd } from '../components/BandAdd';
import { BandChart } from '../components/BandChart';
import { BandList } from '../components/BandList';
import { SocketContext } from '../context/SocketContext';

function HomePage() {
  const { online } = useContext(SocketContext);


  return (
    <div className="container">
      <div className='d-flex justify-content-between align-items-center'>
        <h1>BandNames</h1>
        <p>
          Service status:
          {
            online
              ? <span className="text-success"> Online</span>
              : <span className="text-danger"> offline</span>
          }
        </p>
      </div>

      <div className="row">
        <div className="col position-relative">
          <BandChart />
        </div>
      </div>


      <div className="row">
        <div className="col-12 col-lg-8">
          <BandList />
        </div>
        <div className="col-12 col-lg-4">
          <BandAdd />
        </div>
      </div>

    </div>
  )
}

export default HomePage
