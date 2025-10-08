import { Routes, Route,} from "react-router-dom";
import './App.css'
import MoviesPage from "./pages/MoviesPage"
import MovieDetailPage from "./pages/MovieDetailPage"
import CartPage from './pages/CartPage';

function App() {

  return (
    <>
      <div>
       <Routes>
        <Route path="/" element={<MoviesPage/>} />
        <Route path="/detail" element={<MovieDetailPage/>} />
        <Route path="/cart" element={<CartPage/>} />
      </Routes>
      </div>
    
    </>
  )
}

export default App
