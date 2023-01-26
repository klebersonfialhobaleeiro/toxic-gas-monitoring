import { Routes, Route } from 'react-router-dom';
import Analytics from './pages/Analytics';
import Dashboard from './pages/Dashboard';

import './App.scss'
import Reports from './pages/Reports';

function App() {

  return (
    <div className='container main-wrapper'>

      <Routes>
        <Route path='/dashboard' element={ <Dashboard /> }></Route>
        <Route path='/' element={ <Dashboard /> }></Route>
        <Route path='/analytics' element={ <Analytics /> }></Route>
        <Route path='/reports' element={ <Reports /> }></Route>
      </Routes>

    </div>
  );
}


export default App
