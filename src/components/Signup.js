import React, { useEffect, useState } from 'react'
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';

export default function Signup() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    console.log(params, "Prams")

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        mobileNumber: ""
    });

    const [errors, setErrors] = useState();

    const [message, setMessage] = useState("");
    const [toaster, setToaster] = React.useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
    });
    const { vertical, horizontal, open } = toaster;


    useEffect(() => {
        if (Object.keys(params).length !== 0) {
            getUserById();
        }
    }, [])

    const getUserById = async () => {
        try {
            const response = await fetch(`http://localhost:4200/users/${params.id}`);
            const data = await response.json();
            console.log(data)
            setFormData({
                firstName: data.firstName || "",
                lastName: data.lastName || "",
                email: data.email || "",
                password: data.password || "",
                mobileNumber: data.mobileNumber || 0
            });
            dispatch({ type: "USER", payload: data })
        }
        catch (error) {
            throw new Error(error);
        }
    }

    const validateForm = () => {
        let errors = {};
        let isValid = true;
        const alphaRegex = /^[A-Za-z]+$/;
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;


        if (formData.firstName === "" || formData.firstName === null) {
            errors.firstName = "First Name is Required";
            isValid = false;
        } else if (formData.firstName.length < 5) {
            errors.firstName = "Length should be greater than or Equal to 5";
            isValid = false;
        }
        else if (!alphaRegex.test(formData.firstName)) {
            errors.firstName = "First Name must contain only alphabetic characters";
            isValid = false;
        }

        if (formData.lastName === "" || formData.lastName === null) {
            errors.lastName = "Last Name is Required";
            isValid = false;
        }
        if (formData.email === "" || formData.email === null) {
            errors.email = "Email is Required";
            isValid = false;
        }
        if (formData.password === "" || formData.password === null) {
            errors.password = "Password is Required";
            isValid = false;
        } else if (!passwordRegex.test(formData.password)) {
            errors.password = "Password must be at least 8 characters long, contain at least one uppercase letter, one digit, and one special character";
            isValid = false;
        }


        if (formData.mobileNumber === "" || formData.mobileNumber === null) {
            errors.mobileNumber = "Mobile Number is Required";
            isValid = false;
        } else if (formData.mobileNumber.length !== 10) {
            errors.mobileNumber = "Length Should be 10";
            isValid = false;
        }

        setErrors(errors);
        return isValid;
    }

    const onSubmit = () => {
        if (!validateForm()) {
            return;
        } else {
            if (params.id) {
                updateAccount();
            } else {
                createAccount();
            }
        }
    }



    const createAccount = async () => {
        try {
            const response = await fetch('http://localhost:4200/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            dispatch({ type: "CREATE_ACCOUNT", payload: data })
            setMessage("Account Created Successfully");
            setToaster({ ...toaster, open: true });
            setTimeout(() => {
                navigate('/login')
            }, 2000)
        }
        catch (error) {
            throw new Error(error);
        }
    }

    const updateAccount = async () => {
        try {
            const response = await fetch(`http://localhost:4200/users/${params.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            dispatch({ type: "UPDATE_ACCOUNT", payload: data })
            setMessage("User Updated Successfully");
            setToaster({ ...toaster, open: true });
            setTimeout(() => {
                navigate('/home/users')
            }, 2000)
        }
        catch (error) {
            throw new Error(error);
        }
    }

    return (
        <>
            <Box sx={{ width: 500 }}>
                <Snackbar
                    anchorOrigin={{ vertical, horizontal }}
                    open={open}
                    message={message}
                    key={vertical + horizontal}
                />
            </Box>
            <div className='login-container'>
                <h1>{Object.keys(params).length === 0 ? "CREATE ACCOUNT" : "UPDATE ACCOUNT"}</h1>
                <div>
                    <TextField id="outlined-basic" label={!formData.firstName ? "First Name" : ""} variant="outlined" sx={{ mb: 2, minWidth: 500 }}
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    />
                    <p style={{ color: "red" }}>{errors?.firstName}</p>
                </div>
                <div>
                    <TextField id="outlined-basic" label="Last Name" variant="outlined" sx={{ mb: 2, minWidth: 500 }}
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    />
                    <p style={{ color: "red" }}>{errors?.lastName}</p>

                </div>
                <div>
                    <TextField id="outlined-basic" label="Email" variant="outlined" sx={{ mb: 2, minWidth: 500 }}
                        value={formData.email}

                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                    <p style={{ color: "red" }}>{errors?.email}</p>

                </div>
                <div>
                    <TextField id="outlined-basic" label="Password" variant="outlined" sx={{ mb: 2, minWidth: 500 }}
                        value={formData.password} type='password'

                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                    <p style={{ color: "red" }}>{errors?.password}</p>

                </div>
                <div>
                    <TextField id="outlined-basic" label="MobileNumber" variant="outlined" sx={{ mb: 2, minWidth: 500 }}
                        value={formData.mobileNumber}

                        onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
                    />
                    <p style={{ color: "red" }}>{errors?.mobileNumber}</p>

                </div>
                <div>
                    <Button variant="contained" onClick={() => onSubmit()}>{Object.keys(params).length === 0 ? "REGISTER" : "UPDATE"}</Button>
                </div>
            </div>
        </>

    )
}
