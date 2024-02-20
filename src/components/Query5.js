import React, { useEffect, useState, useContext, useRef } from 'react';
import { GlobalContext } from "../contexts/GlobalContext";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { parseDate } from '@internationalized/date';
import { DateRangePicker, Provider, defaultTheme } from '@adobe/react-spectrum'
import Select from '@mui/material/Select';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);


const Query5 = () => {
    const [location, setLocation] = useState('');
    const [year, setYear] = useState('');
    const [allYears, setAllYears] = useState([]);
    const [weapon, setWeapon] = useState('');


    const { query5, getQuery5, getAllAreas, areas, weapons, getWeapons } = useContext(GlobalContext);


    useEffect(() => {
        let mounted = true;
        async function getQuery() {
            if (areas.length === 0) await getAllAreas();
            if (weapons.length === 0) await getWeapons();
            await getQuery5();
        }
        if (mounted) {
            getQuery();
        }
        return () => (mounted = false);
    }, []);

    useEffect(() => {
        if (query5.length > 0) {
            setAllYears(() => [...new Set(query5.map(y => y.YEAR))]);
        }
    }, [query5])

    const labels = [2020, 2021, 2022, 2023];

    const data = {
        labels,
        datasets: [
            {
                label: 'Weapon usage rate change over year',
                data: labels.map(label => query5?.find(q => label === q.YEAR && location === q.AREA_CODE && weapon === q.WEAPON_USED_CODE)?.YEAR_OVER_YEAR_CHANGE),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        ],
    };
    console.log(year);

    const options = {
        responsive: true,
        scales: {
            y: {
                title: {
                    display: true,
                    text: 'Weapons usage rate change'
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Years'
                }
            }
        },
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Fluctuations in Weapon Types Used in Crimes Over Time in Specific Locations',
            },
        },
    };

    const handleChangeYear = (event) => {
        setYear(event.target.value);
    };

    const handleChange = (event) => {
        setLocation(event.target.value);
    };

    const handleChangeWeapon = (event) => {
        setWeapon(event.target.value);
    };

    return ((query5.length > 0 && allYears.length > 0 && weapons.length > 0) ?
        (<Provider theme={defaultTheme}>
            <Box sx={{ minWidth: 120, backgroundColor: 'white' }} >
                <FormControl sx={{ m: 1, minWidth: 120, marginRight: '64px' }}>
                    <InputLabel id="location-select-label">Location</InputLabel>
                    <Select
                        labelId="location-select-label"
                        id="location-simple-select"
                        value={(() => {
                            if (location === '') {
                                setLocation(areas[0].AREA_CODE);
                            }
                            return location
                        })()}
                        label="Location"
                        onChange={handleChange}
                    >
                        {areas.map(area => <MenuItem value={area?.AREA_CODE}>{area?.AREA_NAME}</MenuItem>)}
                    </Select>
                </FormControl>

                <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="weapon-select-label">Weapon</InputLabel>
                    <Select
                        labelId="weapon-select-label"
                        id="weapon-simple-select"
                        value={(() => {
                            if (weapon === '') {
                                setWeapon(weapons[0].WEAPON_USED_CODE)
                            }
                            return weapon
                        })()}
                        label="weapon"
                        onChange={handleChangeWeapon}
                    >
                        {weapons?.map(w => <MenuItem value={w.WEAPON_USED_CODE}>{w.WEAPON_DESCR}</MenuItem>)}
                    </Select>
                </FormControl>

                <div style={{ position: 'relative', height: '60vh', width: '80vw', display: 'flex', flexWrap: 'wrap' }}>

                    <div style={{ flex: '0 0 60%' }}>
                        <Line options={options} data={data} />


                    </div>
                    <div style={{ flex: '0 0 10%' }}></div>
                    <div style={{ flex: '0 0 30%', display: 'flex', alignItems: 'center' }}>
                        Query aims to analyze how the types of weapons used in crimes fluctuate over time in specific locations
                    </div>
                </div>
            </Box>
        </Provider>) : <></>
    );
}

export default Query5;