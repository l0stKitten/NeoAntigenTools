import React from 'react';
import { Fragment } from 'react';
import Flow from './Components/Flow';
import SideBarMUI from './Components/SideBarMUI';
import Box from '@mui/material/Box';
import CustomScrollbarStyles from './styles/CustomScrollBar';

function App() {
    return (
        <Fragment>
            <CustomScrollbarStyles />
            <Box sx={{ display: 'flex', width: '100vw' }}>
                <SideBarMUI></SideBarMUI>
                
                <Box
                    component="main"
                    sx={{ flexGrow: 1, bgcolor: 'background.default', height: '100vh' }}
                >
                    <Flow></Flow>
                </Box>
            </Box>
        </Fragment>
    );
}

export default App;