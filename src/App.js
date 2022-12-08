import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import PrivateRouter from './router/PrivateRouter';
import Appbar from './components/Appbar';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';

function App() {
  const { loginInformation } = useSelector((state) => state.loginInfo)
  return (
    <>
      <ToastContainer />
      {loginInformation && <Appbar />}
      <Routes>
          <Route  path="/" element={<Login />}/>
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<PrivateRouter />} >
            <Route path="" element={<Home />}/>
          </Route>
      </Routes>
      </>
  );
}

export default App;
