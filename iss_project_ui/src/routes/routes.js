import { Routes, Route } from 'react-router-dom'
import Signup from '../views/Auth/Signup/Signup';
import Login from '../views/Auth/Login/Login';
import Home from '../views/Home/Home';
import Satellite from '../views/Satellite/Satellite';
import ProfileView from '../views/Profile/ProfileView';
import About from '../views/About/About';
import Welcome from '../views/Welcome/Welcome';

function Router() {

  return (
    <Routes>
      <Route path='/' element={<Welcome />}/>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/home' element={<Home />}/>
        <Route path='/about' element={<About />}/>
        <Route path='/satellite' element={<Satellite />}/>
        <Route path='/profile' element={<ProfileView />}/>
    </Routes>
  );
}

export default Router;
