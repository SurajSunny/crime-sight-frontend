import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Query1 from '../components/Query1';

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
                        <Tab label="Query 1" value="1" />
                        <Tab label="Query 2" value="2" />
                        <Tab label="Query 3" value="3" />
                        <Tab label="Query 4" value="4" />
                        <Tab label="Query 5" value="5" />
                    </TabList>
                </Box>
                <TabPanel value="1"><Query1 /></TabPanel>
                <TabPanel value="2">Item Two</TabPanel>
                <TabPanel value="3">Item Three</TabPanel>
                <TabPanel value="4">Item Four</TabPanel>
                <TabPanel value="5">Item Five</TabPanel>
            </TabContext>
        </Box>);
}

export default Tabs;