import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { GlobalContext } from "../contexts/GlobalContext";

export default function Loader() {
    const { is_loading } = React.useContext(GlobalContext);
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        if (is_loading) setOpen(true)
        else setOpen(false)
    }, [is_loading])

    return (
        <div>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    );
}
