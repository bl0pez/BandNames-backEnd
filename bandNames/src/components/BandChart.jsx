import { Chart, registerables } from 'chart.js';
import { useContext, useEffect, useState } from 'react';
Chart.register(...registerables);

import { SocketContext } from '../context/SocketContext';

export const BandChart = () => {

    const { socket } = useContext(SocketContext);

    const [bandas, setBandas] = useState([]);

    useEffect(() => {
        socket.on('current-bands', (bands) => {
            setBandas(bands);
        });

        return () => socket.off('current-bands');
    }, [socket]);

    const data = {
        labels: bandas.map(band => band.name),
        datasets: [{
            label: 'Las mejores bandas',
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            data: bandas.map(band => band.votes),
        }]
    };

    const config = {
        type: 'bar',
        data: data,
        options: {
            animation: false,
            indexAxis: 'y',
        }
    };



    useEffect(() => {
        const myChart = new Chart(
            document.getElementById('myChart'),
            config
        );

        return () => myChart.destroy();

    }, [bandas]);




    return (
        <canvas id='myChart' height="150">
        </canvas>
    )
}
