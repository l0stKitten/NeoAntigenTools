import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import { Typography, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const drawerWidth = 300;
const minDrawer = 120;

export default function RightBar({ open, toolName, onClose }) {
    return (
        <Drawer
            sx={{
                width: { xs: open ? minDrawer : '0px', sm: open ? drawerWidth : '0px' },
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: { xs: minDrawer, sm: drawerWidth },
                    boxSizing: 'border-box',
                    backgroundColor: 'transparent',
                },
            }}
            anchor="right"
            variant="persistent"
            open={open}
            className='drawerBackground'
            PaperProps={{ elevation: 16 }}
        >
            <Toolbar>
                <IconButton
                    edge="start"
                    color="inherit"
                    onClick={onClose}
                    aria-label="close"
                >
                    <ArrowBackIcon />
                </IconButton>
                <Typography variant='h6' sx={{ flexGrow: 1, textAlign: 'center' }} fontWeight='bold'>
                    Tool {toolName}
                </Typography>
            </Toolbar>
            <Divider />
        </Drawer>
    );
}
