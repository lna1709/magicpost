import './App.scss';
import Sidebar from './component/Sidebar';
import Page from './component/Page'
import { useSelector } from 'react-redux';
import { selectIsGuest } from './app/guestSlice';

function App() {

  const isGuest = useSelector(selectIsGuest)

  return (
    <div className="App">
      <div className='app-box'>
        {!isGuest && <div className="app-sidebar">
          <Sidebar />
        </div>}
        <div className={isGuest ? 'app-page-full' : 'app-page'}>
          <Page />
        </div>
      </div>
    </div>
  );
}

export default App;
