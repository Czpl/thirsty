import LandingPage from './components/LandingPage/LandingPage';
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';
import { BrowserRouter as Router} from 'react-router-dom';
import {Routes, Route} from 'react-router-dom';
import pot from './assets/PottedPlant7.svg';

function MainRouter() {
 
  return (
    <>
      <div>
        <img src={pot} className="plant" alt="plant icon" />
      </div>
      <h1>Thirsty</h1>
      <Router>                           
        <Routes>
          <Route path="/" element={<LandingPage/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/login" element={<Login/>}/>
        </Routes>                    
      </Router>
    </>
  );

}
 
export default MainRouter;