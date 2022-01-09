import React from 'react'
import { Container, IconButton, Input, TextField } from '@material-ui/core';
import '../../assets/css/NewDish.css';
import { container } from 'assets/jss/material-dashboard-react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { AiOutlineDelete } from 'react-icons/ai';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CloseIcon from '@material-ui/icons/Close';
const useStyles = makeStyles({
  table: {
    minWidth: 100,
  },
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];
export default function NewDish({close}) {
    const classes = useStyles()
    return (
        <Container fixed id="_root">
            <Container className="_Header">
                <IconButton onClick={close(false)} aria-label="delete" style={{ color:"white"}} >
                    <CloseIcon style={{ color:"white"}} />
                </IconButton>
            </Container>
            <Container>
                <Autocomplete
                    id="combo-box-demo"
                    clearOnBlur
                    options={["123", "321", "456"]}
                    getOptionLabel={(option) => option}
                    style={{ width: 300, display: "inline-flex"}}
                    renderInput={(params) => <TextField {...params} label="Dish Name" margin="normal" />}
                />
                <IconButton aria-label="delete">
                    <AiOutlineDelete />
                </IconButton>
                <TextField className="Qty" label="Quantity" type="number" />
                <label>Estimated Time : <span id='EstimatedTime'></span></label>
                <TableContainer component={Paper}>
                    <Table className={classes.table} size="small" aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="right">Row&nbsp;Material</TableCell>
                                <TableCell align="right">Requier&nbsp;(g)</TableCell>
                                <TableCell align="right">Stock&nbsp;(g)</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow key={row.name}>
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="right">{row.calories}</TableCell>
                                    <TableCell align="right">{row.fat}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
            <Container className="_Footer"></Container>
        </Container>
    )
}
