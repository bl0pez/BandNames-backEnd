import { useContext, useEffect, useState } from 'react';
import { SocketContext } from '../context/SocketContext';

export const CreateRows = () => {

    const [bands, setBands] = useState([]);
    const { socket } = useContext(SocketContext);

    useEffect(() => {
        socket.on('current-bands', (bands) => {
            setBands(bands);
        });

        return () => socket.off('current-bands');
    }, [socket]);


    const changeName = (event, id) => {
        const nuevoNombre = event.target.value;

        setBands(bands => bands.map(band => {
            if (band.id === id) {
                band.name = nuevoNombre;
            }
            return band;
        }));
    }

    const onPerdioFoco = (id, nombre) => {
        socket.emit('cambiar-nombre-banda', { id, nombre });
    }

    const votar = (id) => {
        socket.emit('votar-banda', id);
    }

    const borrarBanda = (id) => {
        socket.emit('borrar-banda', id);
    }


    return (
        bands.map(band => (
            <tr key={band.id}>
                <td>
                    <button
                        className="btn btn-primary"
                        onClick={() => votar(band.id)}
                    >+1</button>
                </td>
                <td>
                    <input
                        className="form-control"
                        value={band.name}
                        onChange={(e) => changeName(e, band.id)}
                        onBlur={() => onPerdioFoco(band.id, band.name)}
                    />
                </td>
                <td>
                    <h3>{band.votes}</h3>
                </td>
                <td>
                    <button
                        className="btn btn-danger"
                        onClick={() => borrarBanda(band.id)}
                    >Delete</button>
                </td>
            </tr>
        )))
}
