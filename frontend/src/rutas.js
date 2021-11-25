import React from 'react';
import  Inicio  from './Pages/inicio';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import VerEdificios from './Pages/verEdificios';
import VerDependencias from './Pages/verDependencias';
import ModifEdificios from './Pages/modifEdificios';
import ModifDependencias from './Pages/modifDependencias';
import BarraNav from './Components/BarraNav';
export const Rutas = () => {
    return (
        <Router>
            <BarraNav/>
            <Routes>
                <Route path='/' element={<Inicio />}></Route>
                <Route path='/edificios/ver' element={<VerEdificios />}></Route>
                <Route path='/edificios/modif' element={<ModifEdificios />}></Route>
                <Route path='/dependencias/ver' element={<VerDependencias />}></Route>
                <Route path='/dependencias/modif' element={<ModifDependencias />}></Route>
            </Routes>
        </Router>
    );
};

export default Rutas;