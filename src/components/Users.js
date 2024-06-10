import React, { useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

export default function Users() {
    const dispatch = useDispatch();
    const users = useSelector(state => state.usersList);
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const [userId, setUserId] = useState();

    const handleClickOpen = (id) => {
        setUserId(id);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const onEdit = (id) => {
        navigate(`/update/${id}`)
    }

    const onDelete = async () => {
        try {
            const response = await fetch(`http://localhost:4200/users/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            console.log(data);
            dispatch({ type: "DELETE_ACCOUNT", payload: data })
            setOpen(false);
            // navigate('/home/users')
        }
        catch (error) {
            throw new Error(error);
        }
    }
    return (
        <>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >

                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Do you want to Delete ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => onDelete()}>YES </Button>
                    <Button onClick={handleClose} autoFocus>
                        NO
                    </Button>
                </DialogActions>
            </Dialog>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">First Name</TableCell>
                            <TableCell align="left">Last Name</TableCell>
                            <TableCell align="left">Email</TableCell>
                            <TableCell align="left">Mobile Number</TableCell>
                            <TableCell align="left">Edit</TableCell>
                            <TableCell align="left">Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="left">{row.firstName}</TableCell>
                                <TableCell align="left">{row.lastName}</TableCell>
                                <TableCell align="left">{row.email}</TableCell>
                                <TableCell align="left">{row.mobileNumber}</TableCell>
                                <TableCell align="left"><EditIcon style={{ cursor: "pointer", color: 'dodgerblue' }} onClick={() => onEdit(row.id)} /></TableCell>
                                <TableCell align="left"><DeleteIcon style={{ cursor: "pointer", color: 'red' }} onClick={() => handleClickOpen(row.id)} /></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}
