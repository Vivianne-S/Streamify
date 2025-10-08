import { Routes, Route } from "react-router-dom";
import './App.css'
import MoviesPage from "./pages/MoviesPage"
import MovieDetailPage from "./pages/MovieDetailPage"

function App() {
  return (
    <>
      <div>
       <Routes>
        <Route path="/" element={<MoviesPage/>} />
        <Route path="/movie/:id" element={<MovieDetailPage/>} />
       </Routes>
      </div>
    </>
  )
}

export default App