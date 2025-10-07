import { useState } from 'react'
import { Routes, Route, Link } from "react-router-dom";
import './App.css'
import MoviesPage from "./pages/MoviesPage"
import MovieDetailPage from "./pages/MovieDetailPage"

function App() {

  return (
    <>
      <div>
       <Routes>
        <Route path="/" element={<MoviesPage/>} />
        <Route path="/detail" element={<MovieDetailPage/>} />
      </Routes>
      </div>
    
    </>
  )
}

export default App
