import React,{useState} from "react";

import { NavLink } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItemMenu from "components/Grid/GridItemMenu";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table, { SpanningTable } from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import PurchaseApi from "views/Purchase/purchaseAPI";
import { Badge, Button, TextField } from "@material-ui/core";
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
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import {
  ThemeProvider,
  createMuiTheme,
  responsiveFontSizes,
} from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import Label from "@material-ui/core/FormLabel/FormLabel"
import Invoice from "components/Card/Invoice";
import { AssignmentReturnedOutlined } from "@material-ui/icons";

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
}));

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

class cartItem{
  constructor(Menu){
    this.Name=Menu.Name;
    this.Qty=1;
    this.Price=Menu.Price;
  };
  add=()=>{
    this.Qty++;
  }
}
const calculateItemTotal = cartInstance=>{
  let items=0;
  let result=0;
  cartInstance.forEach(element => {
        result=result+parseInt(element.Qty)*parseInt(element.Price)*1.07;
        items=items+parseInt(element.Qty);
    });
    return {items,total:ccyFormat( result)};
}

const CustomSkinMap = `<h1>Order Page</h1>`;
export default function Order() {
const [Cart, setCart] = useState([]);
const [Items, setItems] = useState(0);
const [Total, setTotal] = useState("0.00")
const classes = useStyles();
const cardClickedHandel=(Menu)=>{
  let cartInstance=Cart;
  const target=cartInstance.filter(ele=>ele.Name==Menu.Name)[0];
  if(target)  target.add();
  else        cartInstance.push(new cartItem(Menu));
  setCart(cartInstance);
  // console.log(cartInstance);
  let {item,total}=calculateItemTotal(cartInstance);
  setTotal(total);
  setItems(item);
}


  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="success">
              <Grid
                container
                direction="row"
                justify="flex-end"
                alignItems="center"
              >
                <Grid item xs>
                  <ThemeProvider theme={theme}>
                    <Typography variant="h4">Order</Typography>
                  </ThemeProvider>
                </Grid>
                <Grid>
                <span>Total   Rs: {Total}</span>
                <Badge color="secondary" badgeContent={Items}>
                  <ShoppingCartIcon />
                </Badge>
                </Grid>
              </Grid>
              <span className={classes.cardCategoryWhite}>
                Customer Order
              </span>

            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={8} md={6} lg ={8}>
                  <GridItemMenu onClicked={cardClickedHandel} />
                </GridItem>
                <GridItem xs={12} sm={4} md={6} lg={4}>
                  <Invoice rows={Cart}></Invoice>
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
