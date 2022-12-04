import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import PrivateRouter from './router/PrivateRouter';

function App() {
  return (
    <div>
      <Routes>
          <Route  path="/" element={<Login />}/>
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<PrivateRouter />} >
            <Route path="" element={<Home />}/>
          </Route>
      </Routes>
    </div>
  );
}

export default App;
