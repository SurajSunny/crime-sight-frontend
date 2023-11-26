import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Query1 from '../components/Query1';
import Query2 from '../components/Query2';
import Query3 from '../components/Query3';
import Query4 from '../components/Query4';
import Query5 from '../components/Query5';


const Tabs = () => {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="Crime Rate" value="1" />
                        <Tab label="Theft Rate" value="2" />
                        <Tab label="Peak Hour" value="3" />
                        <Tab label="Victim Counts" value="4" />
                        <Tab label="Weapon Usage Rate" value="5" />
                    </TabList>
                </Box>
                <TabPanel value="1"><Query1 /></TabPanel>
                <TabPanel value="2"><Query2 /></TabPanel>
                <TabPanel value="3"><Query3 /></TabPanel>
                <TabPanel value="4"><Query4 /></TabPanel>
                <TabPanel value="5"><Query5 /></TabPanel>
            </TabContext>
        </Box>);
}

export default Tabs;