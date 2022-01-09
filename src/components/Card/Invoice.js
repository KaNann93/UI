import { Card, Badge } from '@material-ui/core';
import React from 'react'
import CardBody from './CardBody'
import CardFooter from './CardFooter'
import CardHeader from './CardHeader'
import CardIcon from './CardIcon'
import { makeStyles, ThemeProvider, createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import GridItemMenu from 'components/Grid/GridItemMenu';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Danger from 'components/Typography/Danger';
import Warning from 'components/Typography/Warning';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import KeyboardVoiceIcon from '@material-ui/icons/KeyboardVoice';
import Icon from '@material-ui/core/Icon';
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';
const TAX_RATE = 0.07;

function ccyFormat(num) {
    return `${num.toFixed(2)}`;
}

function priceRow(qty, unit) {
    return qty * unit;
}

function createRow(desc, qty, unit) {
    const price = priceRow(qty, unit);
    return { desc, qty, unit, price };
}

function subtotal(items) {
    return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

// const rows = [
//     createRow('Paperclips (Box)', 100, 1.15),
//     createRow('Paper (Case)', 10, 45.99),
//     createRow('Waste Basket', 2, 17.99),
// ];

const invoiceSubtotal = rows => {
    let result = 0;
    rows.forEach(element => {
        result = result + parseInt(element.Qty) * parseInt(element.Price);
    });
    return result;
};
const invoiceTaxes = rows => TAX_RATE * invoiceSubtotal(rows);
const invoiceTotal = rows => (TAX_RATE + 1) * invoiceSubtotal(rows);

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

const styles = {
    cardCategoryWhite: {
        "&,& a,& a:hover,& a:focus": {
            color: "rgba(255,255,255,.62)",
            margin: "0",
            fontSize: "14px",
            marginTop: "0",
            marginBottom: "0",
        },
        "& a,& a:hover,& a:focus": {
            color: "#FFFFFF",
        },
    },
    cardTitleWhite: {
        color: "#FFFFFF",
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none",
        "& small": {
            color: "#777",
            fontSize: "65%",
            fontWeight: "400",
            lineHeight: "1",
        },
    },
};

const useStyles = makeStyles((theme) => ({
    styles,
    paper: {
        position: "absolute",
        width: 1000,
        backgroundColor: theme.palette.background.paper,
        //border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    table: {
        minWidth: 100,
    },
    button: {
        margin: theme.spacing(1),
        right:'0px'
    },
}));

export default function Invoice({ rows }) {

    const classes = useStyles();

    return (
        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <Card style={{ backgroundColor: "#e4efe7", cursor: "pointer" }}>
                    <CardBody>
                        <TableContainer component={Paper}>
                            <Table className={classes.table} aria-label="spanning table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Desc</TableCell>
                                        <TableCell align="right">Sum</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row) => (
                                        <TableRow key={row.Name}>
                                            <TableCell>{row.Qty} X {row.Name}</TableCell>
                                            <TableCell align="right">{ccyFormat(parseInt(row.Price))}</TableCell>
                                        </TableRow>
                                    ))}

                                    <TableRow>
                                        <TableCell colSpan={1}>Subtotal</TableCell>
                                        <TableCell align="right">{ccyFormat(invoiceSubtotal(rows))}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell style={{ justifyContent: "space-between", display: 'flex' }}><span>TAX</span><span>{`${(TAX_RATE * 100).toFixed(0)} %`}</span></TableCell>
                                        <TableCell align="right">{ccyFormat(invoiceTaxes(rows))}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell colSpan={1}>Total</TableCell>
                                        <TableCell align="right">{ccyFormat(invoiceTotal(rows))}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <div>
                            <Button
                                variant="contained"
                                color="secondary"
                                className={classes.button}
                                startIcon={<DeleteIcon />}
                            >
                                Delete
                            </Button>
                            {/* This Button uses a Font Icon, see the installation instructions in the Icon component docs. */}
                            <Button
                                variant="contained"
                                color="primary"
                                className={classes.button}
                                endIcon={<Icon>send</Icon>}
                            >
                                Send
                            </Button>
                        </div>
                    </CardBody>
                    <CardFooter stats>
                        <div className={classes.stats}>
                            <Danger>
                                <Warning />
                            </Danger>
                            <a href="#pablo" onClick={(e) => e.preventDefault()}>
                                Notice regarding Order May be time...
                            </a>
                        </div>
                    </CardFooter>
                </Card>
            </GridItem>
            <GridItem></GridItem>
        </GridContainer>
    )
}
