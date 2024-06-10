import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
export default function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const isLoggedIn = useSelector((state) => state.isLoggedIn);
    console.log(isLoggedIn)

    const onLogin = () => {
        navigate('login');
    }

    const onLogOut = () => {
        dispatch({ type: "LOGGED_IN", payload: false })
        navigate('login');
    }
    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            {/* <MenuIcon /> */}
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Redux Curd
                        </Typography>

                        {!isLoggedIn ? <Button color="inherit" onClick={() => onLogin()}>Login</Button> : <Button color="inherit" onClick={() => onLogOut()}>Logout</Button>}

                    </Toolbar>
                </AppBar>
            </Box>
        </>
    )
}
