import './App.css';
import {
  BrowserRouter
  , Route, Routes
} from 'react-router-dom';
import Orders from './pages/orders/Orders';
import Header from './components/header/Header';
import NavigationMenu from './components/navigation-menu/NavigationMenu';
import Products from './pages/products/Products';

function App() {
  return (
    <div className='container-xxl' style={{maxWidth:"1440px"}}>
      <BrowserRouter>
        <Header/>
        <div className='d-flex'>
          <NavigationMenu/>
          <Routes>
            <Route path="/" element={<Orders/>} />
            <Route path="/products" element={<Products/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
