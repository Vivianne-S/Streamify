import { Routes, Route,} from "react-router-dom";
import './App.css'
import MoviesPage from "./pages/MoviesPage"
import MovieDetailPage from "./pages/MovieDetailPage"
import CartPage from './pages/CartPage';
import ConfirmationPage from './pages/ConfirmationPage';

function App() {
  return (
    <>
      <div>
       <Routes>
        <Route path="/" element={<MoviesPage/>} />
        <Route path="cart" element={<CartPage/>}/>
        <Route path="/movie/:id" element={<MovieDetailPage/>} />
        <Route path="/confirmation" element={<ConfirmationPage/>} />
       </Routes>
      </div>
    </>
  )
}

export default App