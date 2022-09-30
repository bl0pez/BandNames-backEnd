import { useState } from 'react';

export const BandAdd = ({ crearBanda }) => {

    const [valor, setValor] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();

        if (valor.trim().length > 0) {
            crearBanda(valor);
            setValor('');
        }

    }

    return (
        <>
            <h3>Add a new band</h3>

            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    className="form-control"
                    placeholder="New band name"
                    value={valor}
                    onChange={(e) => setValor(e.target.value)}
                />
            </form>

        </>
    )
}
