import { createContext } from 'react';
import { useSocket } from '../hooks/useSocket';

// Create a context
export const SocketContext = createContext();

// Create a provider
export const SocketProvider = ({ children }) => {

    const { socket, online } = useSocket('http://localhost:8080');



    return (
        <SocketContext.Provider
            value={{ socket, online }}>
            {children}
        </SocketContext.Provider>
    )
}