import React, { useState } from 'react'
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import { useSelector } from 'react-redux';

export default function ChangePassword() {
    const users = useSelector((state) => state.usersList);
    const [errorMessage, setErrorMessage] = useState("");
    const [formData, setFormData] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
    });
    const onUpdate = () => {
        const user = users.filter(user => {
            return user.password === formData.oldPassword
        })
        console.log(user.length)
        if (user.length === 0) {
            setErrorMessage("Please Enter Old Password Correct")
        } else if (formData.oldPassword !== formData.confirmPassword) {
            setErrorMessage("New Password and Confirm Password Must be Same")
        } else {
            setErrorMessage("")
        }

    }

    return (
        <>
            <div className='login-container'>
                <h1>Change Password</h1>
                <p style={{ color: "red" }}>{errorMessage}</p>
                <div>
                    <TextField id="outlined-basic" label="Old Password" variant="outlined" sx={{ mb: 2, minWidth: 500 }}
                        onChange={(e) => setFormData({ ...formData, oldPassword: e.target.value })}
                    />
                </div>
                <div>
                    <TextField id="outlined-basic" label="New Password" type="password" variant="outlined" sx={{ mb: 2, minWidth: 500 }}
                        onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                    />
                </div>
                <div>
                    <TextField id="outlined-basic" label="Confirm Password" type="password" variant="outlined" sx={{ mb: 2, minWidth: 500 }}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    />
                </div>
                <div>
                    <Button variant="contained" type='button' onClick={() => onUpdate()}>UPDATE</Button>
                </div>

            </div>

        </>
    )
}
