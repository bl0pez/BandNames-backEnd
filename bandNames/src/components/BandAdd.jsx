import { useContext, useState } from 'react';
import { SocketContext } from '../context/SocketContext';

export const BandAdd = () => {

    const [valor, setValor] = useState('');
    const { socket } = useContext(SocketContext);

    const onSubmit = (e) => {
        e.preventDefault();

        if (valor.trim().length > 0) {
            socket.emit('crear-banda', { nombre: valor });
            setValor('');
        }

    }

    return (
        <>
            <h2>Add a new band</h2>

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
