


import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table, { SpanningTable } from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
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
import {
  ThemeProvider,
  createMuiTheme,
  responsiveFontSizes,
} from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import Label from "@material-ui/core/FormLabel/FormLabel"

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

//const useStyles = makeStyles(styles);

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50; // + rand();
  const left = 50; // + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
    height: `-webkit-fill-available`,
    overflowY: `scroll`,
  };
}

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

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


export default function TableList() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const classes = useStyles();
  const [purchaseData, setPurchaseData] = useState([]);
  const [tableRow, setTableRow] = useState();
  window.addEventListener("resize", resizeFunction);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    }
  };
  window.addEventListener("resize", resizeFunction);

  const PurData = async () => {
    setPurchaseData(await PurchaseApi(sessionStorage.getItem('token')));
    console.log(purchaseData);
  };
  useEffect(() => {
    PurData();
  }, []);
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
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
  const body = (
    <div style={modalStyle} className={classes.paper}>
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
                  <TableRow>
                    <TableCell>
                      <TextField
                        size="small"
                        label="Customer ID"
                      />
                    </TableCell>
                    <Typography>

                    </Typography>
                    <Typography>

                    </Typography>
                    <TableCell>
                      <TextField
                        size="small"
                        label="Invoice Date"
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </TableM>
            </CardBody>
            <CardBody>
              <Table
                tableHeaderColor="primary"
                tableHead={[
                  "Date",
                  "Vendor",
                  "Vch No.",
                  "Vch Type",
                  "Debit",
                  "Credit",
                ]}
                tableData={[
                  [
                    <TextField key={1}
                      onKeyDown={handleKeyDown}
                      onChange={handleFocus} />,
                    <TextField key={1}
                      onKeyDown={handleKeyDown}
                      onChange={handleFocus} />,
                    <TextField key={1}
                      onKeyDown={handleKeyDown}
                      onChange={handleFocus} />,
                    <TextField key={1}
                      onKeyDown={handleKeyDown}
                      onChange={handleFocus} />,
                    <TextField key={1}
                      onKeyDown={handleKeyDown}
                      onChange={handleFocus} />,
                    <TextField key={1}
                      onKeyDown={handleKeyDown}
                      onChange={handleFocus} />,
                    <Button key={1}>
                      <DeleteIcon key={1} />
                    </Button>,
                  ],
                  [
                    <TextField key={1}
                      onKeyDown={handleKeyDown}
                      onChange={handleFocus} />,
                    <TextField key={1}
                      onKeyDown={handleKeyDown}
                      onChange={handleFocus} />,
                    <TextField key={1}
                      onKeyDown={handleKeyDown}
                      onChange={handleFocus} />,
                    <TextField key={1}
                      onKeyDown={handleKeyDown}
                      onChange={handleFocus} />,
                    <TextField key={1}
                      onKeyDown={handleKeyDown}
                      onChange={handleFocus} />,
                    <TextField key={1}
                      onKeyDown={handleKeyDown}
                      onChange={handleFocus} />,
                    <Button key={1}>
                      <DeleteIcon key={1} />
                    </Button>,
                  ],
                ]}
              />
            </CardBody>
            <CardBody>
              <SpanningTable />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );

  const state = {
    data: [],
  };
  const appendChild = () => {
    console.log("Child added");
  };
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
                {/* <label className={classes.cardTitleWhite}>
                  Purchase Invoice
                </label> */}
                <ThemeProvider theme={theme}>
                  <Typography variant="h4">Purchase</Typography>
                </ThemeProvider>
              </Grid>
              <Grid item xs style={{ flex: "revert" }}>
                <NavLink
                  to="/admin/purchase/create"
                >
                  <Button
                    variant="outlined"
                    color="inherit"
                    style={{ textTransform: "none" }}
                  >
                    <ReceiptIcon />

                  New Purchase
                </Button>
                </NavLink>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="simple-modal-title"
                  aria-describedby="simple-modal-description"
                >
                  {body}
                </Modal>
                {/* <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Sound
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <List>
          <ListItem button>
            <ListItemText primary="Phone ringtone" secondary="Titania" />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText primary="Default notification ringtone" secondary="Tethys" />
          </ListItem>
        </List>
      </Dialog> */}
              </Grid>
            </Grid>
            <span className={classes.cardCategoryWhite}>
              Recent purchase history
            </span>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={[
                "Date",
                "Vendor",
                "Vch No.",
                "Vch Type",
                "Debit",
                "Credit",
              ]}
              tableData={purchaseData}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
