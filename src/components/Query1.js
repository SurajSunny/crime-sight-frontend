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
import { faker } from '@faker-js/faker';
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


const Query1 = () => {
    const [location, setLocation] = useState('');
    const [date, setDate] = useState({
        start: parseDate('2020-02-03'),
        end: parseDate('2020-02-08')
    });
    const [year, setYear] = useState('');
    let [allYears, setAllYears] = useState([]);
    const { query1, getQuery1, getAllAreas, areas } = useContext(GlobalContext);


    useEffect(() => {
        let mounted = true;
        async function getQuery() {
            await getAllAreas();
            await getQuery1();
        }
        if (mounted) {
            getQuery();
        }
        return () => (mounted = false);
    }, []);

    useEffect(() => {
        if (query1.length > 0) {
            setAllYears(() => [...new Set(query1.map(y => y.YEAR))])
        }
    }, [query1])

    const labels = ['Spring', 'Summer', 'Fall', 'Winter'];

    console.log(labels.map(label => query1.find(q => {
        return q.SEASON === label && year === q.YEAR && location === q.AREA_CODE
    })));
    const data = {
        labels,
        datasets: [
            {
                label: 'Dataset 1',
                data: labels.map(label => query1.find(q => q.SEASON === label && year === q.YEAR && location === q.AREA_CODE)?.CRIME_COUNT),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        ],
    };
    console.log(year);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Crime rates in different LAPD Community Police Station Areas over time',
            },
        },
    };

    const handleChangeYear = (event) => {
        setYear(event.target.value);
    };

    const handleChange = (event) => {
        setLocation(event.target.value);
    };

    return ((query1.length > 0 && allYears.length > 0) ?
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
                    <InputLabel id="year-select-label">Year</InputLabel>
                    <Select
                        labelId="year-select-label"
                        id="year-simple-select"
                        value={(() => {
                            if (year === '') {
                                setYear(allYears[0])
                            }
                            return year
                        })()}
                        label="Location"
                        onChange={handleChangeYear}
                    >
                        {allYears?.map(y => <MenuItem value={y}>{y}</MenuItem>)}
                    </Select>
                    {/* <DateRangePicker
                            label="Date range"
                            value={date}
                            onChange={setDate}
                        /> */}
                </FormControl>
                <div style={{ position: 'relative', height: '60vh', width: '80vw' }}>
                    <Line options={options} data={data} />
                </div>
            </Box>
        </Provider>) : <></>
    );
}

export default Query1;