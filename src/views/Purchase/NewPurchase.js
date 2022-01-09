


import React, { useState, useEffect, Fragment } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
//import Table, { SpanningTable } from "components/Table/Table.js";
import Table from "@material-ui/core/Table";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Token from "utility/useToken";
import PurchaseApi from "views/Purchase/purchaseAPI";
import { Button, TextField } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import ReceiptIcon from "@material-ui/icons/Receipt";
import Modal from "@material-ui/core/Modal";
import "react-autocomplete-input/dist/bundle.css";
import TableM from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { getCustNameFromServer, getUnit } from 'views/Purchase/purchaseAPI';
import {
  ThemeProvider,
  createMuiTheme,
  responsiveFontSizes,
} from "@material-ui/core/styles";

import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DeleteIcon from "@material-ui/icons/Delete";
import Label from "@material-ui/core/FormLabel/FormLabel";
import TableContainer from '@material-ui/core/TableContainer';
import { setPurchaseDetailsIntoDB } from 'views/Purchase/purchaseAPI.js';
import TableHead from "@material-ui/core/TableHead";
import Paper from '@material-ui/core/Paper';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import clsx from 'clsx';
import Input from '@material-ui/core/Input';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';

const filter = createFilterOptions();

export default function NewPurchase() {
  // Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
  const [unitList, setUnitList] = useState([{}]);
  const [values, setValues] = React.useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });

  const [customUnitBox, setCustomUnitBox] = useState(false);
  const [value, setValue] = React.useState(null);

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
  }));
  const classes = useStyles();

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const [unitElement, setUnitElement] = useState(null);
  let activeUnitElement;
  const changeUnitOpen = (e) => {
    console.log(e.target.parentElement.getAttribute("Index"));
    activeUnitElement = e.target;
    setUnitElement(activeUnitElement);
    setCustomUnitBox(true);
  }

  const changeUnitClose = () => {
    if (value != null) {
      var index = unitElement.parentElement.getAttribute("Index").split("_")[1];
      unitElement.innerText = value.unit;
      let ele = unitElement;
      console.log(ele);
      saveOnBlur(ele, index, 'Unit');
      setUnit(value.unit);
    }
    setCustomUnitBox(false);
  }

  const closeUnitDialog = () => {
    setCustomUnitBox(false);
  }

  const rows = [
    createRow(<TextField key={1} />,
      <FormControl className={clsx(classes.margin, classes.withoutLabel, classes.textField)}>
        <Input
          id="standard-adornment-weight"
          //value={values.weight}
          onChange={handleChange('weight')}
          endAdornment={<InputAdornment 
            position="end" 
            onClick={e => changeUnitOpen(e)}
            index={'Unit_0'}
            //onChange={(e) => saveOnBlur(e, index, 'Qty')}
            >Unit</InputAdornment>}
          aria-describedby="standard-weight-helper-text"
          inputProps={{
            'aria-label': 'weight',
          }}
        />
      </FormControl>,
      <TextField key={4} />)
  ];

  const toDate = () => {
    let date = new Date();
    let dd = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    let mm = (date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : (date.getDate() + 1);
    let yyyy = date.getFullYear();
    return mm + "/" + dd + "/" + yyyy;
  }
  const [PurchaseCustName, setPurchaseCustName] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date(toDate()));
  const [QtyAndPrice, setQtyAndPrice] = useState([]);
  const [test1, setTest1] = useState("0.00");
  const [data, setData] = useState(rows);
  const [storeID, setStoreID] = useState();
  const [unit, setUnit] = useState('Unit');
  //setData([createRow(<TextField key={1} />, <TextField key={2} />, <TextField key={3} />)]);
  const DISCOUNT_RATE = 0;

  function subtotal(items) {
    return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
  }

  const invoiceSubtotal = subtotal(data);
  const invoiceDiscounts = DISCOUNT_RATE * invoiceSubtotal;
  const invoiceTotal = invoiceSubtotal-invoiceDiscounts;
  function ccyFormat(num) {
    return `${num.toFixed(2)}`;
  }

  function priceRow(qty, unitPrice) {
    return qty * unitPrice;
  }

  function createRow(desc, qty, unitPrice) {
    const price = priceRow(qty.value, unitPrice.value);
    return { desc, qty, rate: <TextField />, price: 0, HighlightOffIcon: <HighlightOffIcon /> };
  }

  const saveOnBlur = async (e, index, type) => {
    console.log(index);
    if(type==="Desc") {
      console.log(type);
      let unt = await getUnit(e.value, setUnitList);
      let unitEle = document.querySelectorAll("[Index='Unit_"+index+"']");
      console.log(unitList);
      unitEle[0].getElementsByTagName("p")[0].innerText = unt.split("-")[0];
      setUnit(unt.split("-")[0]);
      console.log(unit);
      //setUnit(unit.add(unit.split("-")[0]));
    }

    let obj = [];
    if (!QtyAndPrice[index]) {
      obj = QtyAndPrice;
      obj.push({ [type]: e.value || e.innerText});
      //obj.push({["Unit"]:unit});
      setQtyAndPrice(obj);
    } else {
      obj = QtyAndPrice;
      obj[index][type] = e.value || e.innerText;
      obj[index]["Unit"] = unit;
      setQtyAndPrice(obj);
    }
    const dummy = data;
    const lastItem = dummy[index];
    lastItem.price = ((QtyAndPrice[index]?.Qty || 0) * (QtyAndPrice[index]?.UnitPrice || 0));
    dummy[index] = lastItem;
    setData(dummy);
    const val = test1 + 1;
    setTest1(val);
    console.log(QtyAndPrice);
  }

  const onUpdate = (index) => {
    const dummy = data;
    if (index < dummy.length - 1) { return; }
    dummy.push(createRow(<TextField key={data.length + "-" + 1} />,
      <FormControl className={clsx(classes.margin, classes.withoutLabel, classes.textField)}>
        <Input
          id="standard-adornment-weight"
          //value={values.weight}
          onChange={handleChange('weight')}
          endAdornment={<InputAdornment 
            position="end" 
            index={'Unit_'+data.length}
            onClick={e => changeUnitOpen(e)}
            >{unit}</InputAdornment>}
          aria-describedby="standard-weight-helper-text"
          inputProps={{
            'aria-label': 'weight',
          }}
        />
      </FormControl>,
      <TextField key={data.length + "-" + 3} />))
    setData(dummy);
    const val = test1 + 1;
    setTest1(val);
  }

  const deleteRow = (index) => {
    let dummy = data;
    if (dummy.length > 1) {
      console.log(index);
      //dummy = dummy.slice(index+1);
      console.log(dummy);
      setData(dummy);
      const val = test1 + 1;
      setTest1(val);
    }
  }

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

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
  let theme = createMuiTheme();
  theme = responsiveFontSizes(theme);

  let keyCode = 0;
  const handleKeyDown = (event) => {
    keyCode = event.keyCode;
  }
  const handleFocus = (event) => {
    console.log(event.eventPhase);
    const sampleData = ["chayan", "sujit"];
    const inputData = event.target.value;
    sampleData.forEach(element => {
      console.log(element)
      if (element.startsWith(inputData) && keyCode != 8) {
        event.target.value = element;
        event.target.setSelectionRange(inputData.length, element.length);
      }
    });
  }
  let getCustName = (e) => {
    var value = e.value;
    try {
      if (value.trim().length >= 3) {
        console.log(e.value);
        console.log(e);
        setStoreID(value);
        getCustNameFromServer(e.value, setPurchaseCustName);
      }
    } catch (error) {
      console.log("Error occured");
    }
  }
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="success">
            {" "}
            <Grid
              container
              direction="row"
              justify="flex-end"
              alignItems="center"
            >
              <Grid item xs>
                <ThemeProvider theme={theme}>
                  <Typography variant="h5">Purchase Voucher</Typography>
                </ThemeProvider>
              </Grid>
            </Grid>
          </CardHeader>
          <CardBody>
            <TableM>
              <TableBody>
                <TableRow justify="space-between">
                  <TableCell>
                    <TextField
                      size="small"
                      label="Customer ID"
                      onChange={(e) => getCustName(e.target)}
                    />
                    <Label>{PurchaseCustName}</Label>
                  </TableCell>
                  <TableCell>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="dd/MM/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label="Invoice Date"
                        value={selectedDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                        autoOk={true}
                        style={{ float: 'right' }}
                      />
                    </MuiPickersUtilsProvider>
                  </TableCell>
                </TableRow>
              </TableBody>
            </TableM>
          </CardBody>
          <CardBody>
            {/* <SpanningTable /> */}
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="spanning table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center" colSpan={4}>
                      Details
                    </TableCell>
                    <TableCell align="Center" colSpan={2}>Price</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="Center">Desc</TableCell>
                    <TableCell align="Center">Qty.</TableCell>
                    <TableCell align="center">Rate</TableCell>
                    <TableCell align="center" colSpan={4}>Sum</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell align="Center" onChange={() => onUpdate(index)} onBlur={(e) => saveOnBlur(e.target, index, 'Desc')}>{row.desc}</TableCell>
                      <TableCell align="Center" onBlur={(e) => saveOnBlur(e.target, index, 'Qty')}>{row.qty}</TableCell>
                      <TableCell align="center" onBlur={(e) => saveOnBlur(e.target, index, 'UnitPrice')}>{row.rate}</TableCell>
                      <TableCell align="center" colSpan={4}>{ccyFormat(row.price)}</TableCell>
                      <TableCell align="Center" onClick={() => deleteRow(index)} color="red">{row.HighlightOffIcon}</TableCell>
                    </TableRow>
                  ))}

                  <TableRow>
                    <TableCell rowSpan={2} />
                    <TableCell rowSpan={2} />
                    <TableCell colSpan={1}>Subtotal</TableCell>
                    <TableCell colSpan={4} align="center">{ccyFormat(invoiceSubtotal)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Discount</TableCell>
                    <TableCell align="center">{`${(DISCOUNT_RATE * 100).toFixed(0)} %`}</TableCell>
                    <TableCell colSpan={2} align="left">{ccyFormat(invoiceDiscounts)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell rowSpan={2} />
                    <TableCell rowSpan={2} />
                    <TableCell colSpan={1}>Total</TableCell>
                    <TableCell colSpan={3} align="center">{ccyFormat(invoiceTotal)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={3} align="right"><Button>Save</Button></TableCell>
                    <TableCell><Button onClick={() => setPurchaseDetailsIntoDB({ QtyAndPrice, PurchaseCustName, selectedDate, unit })}>Submit</Button></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </CardBody>
        </Card>
      </GridItem>
      <Fragment />
      <Dialog disableBackdropClick disableEscapeKeyDown open={customUnitBox} onClose={closeUnitDialog}>
        <DialogTitle>Select Unit</DialogTitle>
        <DialogContent>
          <Autocomplete
            value={value}
            onChange={(event, newValue) => {
              if (typeof newValue === 'string') {
                setValue({
                  unit: newValue,
                });
              } else if (newValue && newValue.inputValue) {
                // Create a new value from the user input
                setValue({
                  unit: newValue.inputValue,
                });
              } else {
                setValue(newValue);
              }
            }}
            filterOptions={(options, params) => {
              const filtered = filter(options, params);

              // Suggest the creation of a new value
              if (params.inputValue !== '') {
                filtered.push({
                  inputValue: params.inputValue,
                  unit: `Add "${params.inputValue}"`,
                });
              }

              return filtered;
            }}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            id="free-solo-with-text-demo"
            options={unitList}
            getOptionLabel={(option) => {
              // Value selected with enter, right from the input
              if (typeof option === 'string') {
                return option;
              }
              // Add "xxx" option created dynamically
              if (option.inputValue) {
                return option.inputValue;
              }
              // Regular option
              return option.unit;
            }}
            renderOption={(option) => option.unit}
            //style={{ width: '100%' }}
            freeSolo
            renderInput={(params) => (
              <TextField {...params} variant="outlined" />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeUnitDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={changeUnitClose} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </GridContainer>
  )
}