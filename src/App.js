import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Tabs from './common/Tabs'
import AllRoutes from './routes/AllRoutes';
import { GlobalProvider } from "./contexts/GlobalContext";
import './App.css';
import Loader from './common/Loader';

function App() {
  return (
    <>
      <GlobalProvider>
        <AppBar position="static" style={{backgroundColor:'#e24747'}}>
          <Toolbar variant="dense">
            <Loader />
            <Typography variant="h5" color="inherit" component="div" sx={{ margin: "auto" }}>
              Crime Sight
            </Typography>
          </Toolbar>
        </AppBar>
        <AllRoutes />
      </GlobalProvider>
    </>
  );
}

export default App;
