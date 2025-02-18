import './App.css';
import {
  BrowserRouter
  , Route, Routes
} from 'react-router-dom';
import Main from './pages/main/Main';
import Header from './components/header/Header';
import NavigationMenu from './components/navigation-menu/NavigationMenu';

function App() {
  return (
    <div className='container'>
      <BrowserRouter>
        <Header/>
        <div className='d-flex'>
          <NavigationMenu/>
          <Routes>
            <Route path="/" element={<Main/>} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
