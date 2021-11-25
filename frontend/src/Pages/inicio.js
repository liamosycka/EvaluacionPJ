import React, { Fragment } from 'react';
import FormAltaDependencia from '../Components/FormAltaDependencia';
import FormAltaEdificio from '../Components/FormAltaEdificio';
const Inicio = () => {
    return (
        <Fragment>
            <FormAltaEdificio />
            <FormAltaDependencia />
        </Fragment>

    )
}
export default Inicio