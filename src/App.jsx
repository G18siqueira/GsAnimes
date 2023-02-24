import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Header from './components/Header';
import Footer from './components/Footer';

import './App.scss';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <ToastContainer autoClose={3000} />
      <Header />

      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default App;
