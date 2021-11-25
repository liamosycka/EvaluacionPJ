import React from 'react';
import  Inicio  from './Pages/inicio';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import ABMEdificios from './Pages/abmEdificios';
import BarraNav from './Components/BarraNav';
export const Rutas = () => {
    return (
        <Router>
            <BarraNav/>
            <Routes>
                <Route path='/' element={<Inicio />}></Route>
                <Route path='/edificios' element={<ABMEdificios />}></Route>
            </Routes>
        </Router>
    );
};

export default Rutas;