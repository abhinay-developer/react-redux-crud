import React, { useEffect, useState } from 'react'
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';

export default function Login() {
    const dispatch = useDispatch();
    const [responseMessage, setResponseMessage] = useState("");
    const users = useSelector((state) => state.usersList);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [toaster, setToaster] = React.useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
    });
    const [errors, setErrors] = useState();

    const { vertical, horizontal, open } = toaster;
    const apiUsers = async () => {
        try {
            const users = await fetch("http://localhost:4200/users");
            const data = await users.json();
            dispatch({ type: "USERS_LIST", payload: data })
        } catch (err) {
            throw new Error(err);
        }

    }

    useEffect(() => {
        apiUsers();
    }, [])


    const validateForm = () => {
        let errors = {};
        let isValid = true;


        if (formData.email === "" || formData.email === null) {
            errors.email = "Please enter email";
            isValid = false;
        }
        if (formData.password === "" || formData.password === null) {
            errors.password = "Please enter password";
            isValid = false;
        }
        setErrors(errors);
        return isValid;
    }

    const onLogin = () => {
        if (!validateForm()) {
            return;
        } else {
            const isLoggedIn = users.filter(user => user.email === formData.email && user.password === formData.password)
            console.log(isLoggedIn)
            if (isLoggedIn.length >= 1) {
                dispatch({ type: "LOGIN", payload: isLoggedIn })
                dispatch({ type: "LOGGED_IN", payload: true })
                setToaster({ ...toaster, open: true });
                setResponseMessage("")
                setTimeout(() => {
                    navigate('/home/users')
                }, 2000)
            } else {
                setResponseMessage("INVALID CREDENTIALS ,PLEASE LOGIN AGAIN !!!!")
            }
        }


    }



    const onRegister = () => {
        navigate("/signup")
    }
    return (
        <>
            {/* <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               
            </Box> */}
            <Box sx={{ width: 500 }}>
                <Snackbar
                    anchorOrigin={{ vertical, horizontal }}
                    open={open}
                    message={"LOGIN SUCCESS"}
                    key={vertical + horizontal}
                />
            </Box>
            <div className='login-container'>
                <h1>LOGIN</h1>
                {responseMessage && <h3 style={{ color: 'red' }}>{responseMessage}</h3>}
                <div>
                    <TextField id="outlined-basic" label="Email" variant="outlined" sx={{ mb: 2, minWidth: 500 }}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                    <p style={{ color: "red" }}>{errors?.email}</p>

                </div>
                <div>
                    <TextField id="outlined-basic" label="Password" type="password" variant="outlined" sx={{ mb: 2, minWidth: 500 }}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                    <p style={{ color: "red" }}>{errors?.password}</p>

                </div>
                <div>
                    <Button variant="contained" type='button' onClick={() => onLogin()}>LOGIN</Button>
                </div>
                <div>
                    <h4>Do you Want to Register? <Button variant="contained" onClick={() => onRegister()}>REGISTER <span></span></Button>

                    </h4>
                </div>
            </div>
        </>
    )
}
