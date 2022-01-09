import React, { useState } from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
// core components
import styles from "assets/jss/material-dashboard-react/components/tableStyle.js";
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import { Button, TextField } from "@material-ui/core";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import {setPurchaseDetailsIntoDB} from 'views/Purchase/purchaseAPI.js';

//const useStyles = makeStyles(styles);
const useStyles = makeStyles(styles, {
  table: {
    minWidth: 700,
  },
});

export default function CustomTable(props) {
  const classes = useStyles();
  const { tableHead, tableData, tableHeaderColor } = props;
  return (
    <div className={classes.tableResponsive}>
      <Table className={classes.table}>
        {tableHead !== undefined ? (
          <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
            <TableRow className={classes.tableHeadRow}>
              {tableHead.map((prop, key) => {
                return (
                  <TableCell
                    className={classes.tableCell + " " + classes.tableHeadCell}
                    key={key}
                  >
                    {prop}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
        ) : null}
        <TableBody>
          {tableData.map((prop, key) => {
            return (
              <TableRow key={key} className={classes.tableBodyRow}>
                {prop.map((prop, key) => {
                  return (
                    <TableCell className={classes.tableCell} key={key}>
                      {prop}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

CustomTable.defaultProps = {
  tableHeaderColor: "gray",
};

CustomTable.propTypes = {
  tableHeaderColor: PropTypes.oneOf([
    "warning",
    "primary",
    "danger",
    "success",
    "info",
    "rose",
    "gray",
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.string),
  tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
};

const TAX_RATE = 0.07;

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

function priceRow(qty, unit) {
  return qty * unit;
}

function createRow(desc, qty, unit) {
  const price = priceRow(qty.value, unit.value);
  return { desc, qty, unit, price : 0, HighlightOffIcon : <HighlightOffIcon/> };
}

function subtotal(items) {
  return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

const rows = [
  createRow(<TextField key={1}/>, <TextField key={2}/>, <TextField key={3}/>)
];

const invoiceSubtotal = subtotal(rows);
const invoiceTaxes = TAX_RATE * invoiceSubtotal;
const invoiceTotal = invoiceTaxes + invoiceSubtotal;

export function SpanningTable() {
  const classes = useStyles();
  const [data, setData] = useState(rows);
  const [test1, setTest1] = useState(1);
  const [QtyAndPrice, setQtyAndPrice] = useState([]);
  const saveOnBlur = (e, index, type) => {
    let obj = [];
    if(!QtyAndPrice[index]) {
      obj = QtyAndPrice;
      obj.push({[type] : e.target.value})
      setQtyAndPrice(obj);
    } else {
      obj = QtyAndPrice;
      obj[index][type] = e.target.value;
      setQtyAndPrice(obj);
    }
    const dummy = data;
    const lastItem = dummy[index];
    // if(QtyAndPrice[index].Qty?.trim().length <= 0) {QtyAndPrice[index].Qty = 0;}
    // if(QtyAndPrice[index].Unit?.trim().length <= 0) {QtyAndPrice[index].Unit = 0;}
    lastItem.price = ((QtyAndPrice[index]?.Qty||0) * (QtyAndPrice[index]?.Unit||0));
    dummy[index] = lastItem;
    setData(dummy);
    const val = test1+1;
    setTest1(val);
  }
  const onUpdate = (index) => {
    const dummy = data;
    if(index < dummy.length-1) {return;}
    dummy.push(createRow(<TextField key={data.length+"-"+1}/>, <TextField key={data.length+"-"+2}/>, <TextField key={data.length+"-"+3}/>))
    setData(dummy);
    const val = test1+1;
    setTest1(val);
  }

  const deleteRow = (index) => {
    let dummy = data;
    if(dummy.length > 1) {
      console.log(index);
    //dummy = dummy.slice(index+1);
    console.log(dummy);
    setData(dummy);
    const val = test1+1;
    setTest1(val);
    }
  }

  const saveDetailsInDB = () => {
    var dummy = QtyAndPrice;
  }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={3}>
              Details
            </TableCell>
            <TableCell align="right">Price</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Desc</TableCell>
            <TableCell align="right">Qty.</TableCell>
            <TableCell align="right">Unit</TableCell>
            <TableCell align="right">Sum</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              <TableCell onChange={() => onUpdate(index)} onBlur={(e) => saveOnBlur(e, index, 'Desc')}>{row.desc}</TableCell>
              <TableCell align="right" onBlur={(e) => saveOnBlur(e, index, 'Qty')}>{row.qty}</TableCell>
              <TableCell align="right" onBlur={(e) => saveOnBlur(e, index, 'Unit')}>{row.unit}</TableCell>
              <TableCell align="right">{ccyFormat(row.price)}</TableCell>
              <TableCell align="right" onClick={() => deleteRow(index)} color="red">{row.HighlightOffIcon}</TableCell>
            </TableRow>
          ))}

          <TableRow>
            <TableCell rowSpan={3} />
            <TableCell colSpan={2}>Subtotal</TableCell>
            <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Tax</TableCell>
            <TableCell align="right">{`${(TAX_RATE * 100).toFixed(0)} %`}</TableCell>
            <TableCell align="right">{test1}</TableCell>{/**ccyFormat(invoiceTaxes) */}
          </TableRow>
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={3} align="right"><Button>Save</Button></TableCell>
            <TableCell><Button onClick={() => setPurchaseDetailsIntoDB(QtyAndPrice)}>Submit</Button></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}