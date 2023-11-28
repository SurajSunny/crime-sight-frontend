import React, { useEffect, useState, useContext, useRef } from 'react';
import autocolors from 'chartjs-plugin-autocolors';
import { GlobalContext } from "../contexts/GlobalContext";
import { PolarArea, Pie, Doughnut, Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
} from 'chart.js';

ChartJS.register(autocolors)


const About = () => {
    const { crimesByYear, getCrimeByYear, getCrimeCountWeapons, crimeWeapons, weapons, getWeapons, areasCrime, getAreasCrime, getAllAreas, areas } = useContext(GlobalContext);

    const labels = [2020, 2021, 2022, 2023];
    const data = {
        labels,
        datasets: [
            {
                label: 'Crime count each year',
                data: labels.map(label => crimesByYear.length && crimesByYear?.find(q => label === q.YEAR)?.TOTAL_CRIMES),
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(75, 192, 192)',
                    'rgb(255, 205, 86)',
                    'rgb(201, 203, 207)',
                    'rgb(54, 162, 235)'
                ],
            }
        ],
    };

    const options = {
        responsive: true,
        scaleShowValues: true,
        scales: {
            x: {
                border: {
                    display: false,
                }
            },
            y: {
                border: {
                    display: false,
                }
            },
            xAxes: [{
                ticks: {
                    autoSkip: false
                }
            }]
        },
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Crime count by year',
            },
        },
    };

    const labels1 = (weapons.map(w => w.WEAPON_DESCR) || []);
    const data1 = {
        labels: labels1,
        datasets: [
            {
                label: "crimes commited",
                data: labels1.map(label => {
                    return crimeWeapons?.find(c => c.WEAPON_USED_CODE === weapons?.find(w => w.WEAPON_DESCR === label)?.WEAPON_USED_CODE)?.TOTAL_CRIMES
                }),
            }
        ],
    };
    console.log(data1);

    const options1 = {
        responsive: true,
        scaleShowValues: true,
        scales: {
            xAxes: [{
                ticks: {
                    autoSkip: false
                }
            }]
        },
        plugins: {
            legend: {
                display: false,
            },
            autocolors: {
                mode: 'data',
                offset: 6
            },
            title: {
                display: true,
                text: 'Crimes commited using a particular weapon',
            },
        },
    };


    const labels2 = (areas.map(w => w.AREA_NAME) || []);
    const data2 = {
        labels: labels2,
        datasets: [
            {
                label: "crimes commited",
                data: labels2.map(label => {
                    return areasCrime?.find(c => c.AREA_CODE === areas?.find(w => w.AREA_NAME === label)?.AREA_CODE)?.TOTAL_CRIMES
                }),
            }
        ],
    };
    console.log(labels2);

    const options2 = {
        responsive: true,
        scaleShowValues: true,
        scales: {
            xAxes: [{
                ticks: {
                    autoSkip: false
                }
            }]
        },
        plugins: {
            legend: {
                display: false,
            },
            autocolors: {
                mode: 'data',
                offset: 8
            },
            title: {
                display: true,
                text: 'Crimes commited in a particular area',
            },
        },
    };



    useEffect(() => {
        getCrimeByYear();
        getCrimeCountWeapons();
        getAreasCrime();
        if (weapons.length === 0) getWeapons();
        if (areas.length === 0) getAllAreas();
    }, [])
    return crimesByYear?.length > 0 && crimeWeapons.length && weapons.length &&
        <div>
            <h4 style={{ textAlign: 'center' }}>VISUALISATION OF LAPD CRIME DATA</h4>
            <div style={{ padding: '20px', position: 'relative', height: '60vh', width: '80vw', display: 'flex', flexWrap: 'wrap' }}>
                <div style={{ flex: '0 0 33.33%' }}>
                    <PolarArea options={options} data={data} />
                </div>
                <div style={{ flex: '0 0 33.33%' }}>
                </div>
                <div style={{ flex: '0 0 33.33%' }}>
                    <Doughnut options={options1} data={data1} />
                </div>
            </div>
            <div style={{
                height: '60vh', width: '80vw', margin: 'auto', position: 'relative',
                top: '64px',
                left: '128px'
            }}>
                <Line options={options2} data={data2} />
            </div>
        </div>
}

export default About;