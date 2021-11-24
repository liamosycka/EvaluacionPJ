import React from 'react';
import  Inicio  from './Pages/inicio';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import ABMDepartamentos from './Pages/abmDepartamentos';
import NavBar from './Components/NavBar';
export const Rutas = () => {
    return (
        <Router>
            <NavBar />
            <Routes>
                <Route path='/' element={<Inicio />}></Route>
                <Route path='/departamentos' element={<ABMDepartamentos />}></Route>
            </Routes>
        </Router>
    );
};

export default Rutas;