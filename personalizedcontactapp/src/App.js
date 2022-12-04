import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import PrivateRouter from './router/PrivateRouter';
import { Provider } from "react-redux"
import store from './redux/app/store';

function App() {
  return (
    <Provider store={store}>
      <Routes>
          <Route  path="/" element={<Login />}/>
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<PrivateRouter />} >
            <Route path="" element={<Home />}/>
          </Route>
      </Routes>
    </Provider>
  );
}

export default App;
