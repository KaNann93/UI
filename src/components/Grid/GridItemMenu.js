import React, { useState } from 'react'

//import { Card } from '@material-ui/core'
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Tasks from "components/Tasks/Tasks.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

const useStyles = makeStyles(styles);

export default function GridItemMenu({onClicked}) {
    const initialState = [{ Name: "Rice", Price: "50",Avalibility:"15" },
    { Name: "Ruti", Price: "40", Avalibility: "25" },
    { Name: "Rice", Price: "50", Avalibility: "45" },
    { Name: "Ruti", Price: "40", Avalibility: "25" },
    { Name: "Rice", Price: "50", Avalibility: "15" },
    { Name: "Ruti", Price: "40", Avalibility: "35" }];
    const [Menu, setMenu] = useState(initialState);
    const classes = useStyles();


    return (
        <GridContainer>
            {Menu.map((element, key) => {
                return <GridItem key={key} xs={12} sm={4} md={6} lg={4}>
                    <Card onClick={()=>{onClicked(element)}} style={{backgroundColor: "#e4efe7",cursor: "pointer"}}>
                        <CardHeader color="warning" stats icon>
                            <CardIcon color="warning">
                                <h2>{element.Name}</h2>
                            </CardIcon>
                            <div>
                                <p className={classes.cardCategory}>
                                    Price
                                </p>
                                <h3 className={classes.cardTitle}>
                                    {element.Price}
                                </h3>
                            </div>
                        </CardHeader>
                        <CardFooter stats>
                            <div className={classes.stats}>
                                <Danger>
                                    <Warning />
                                </Danger>
                                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                                    Plate Avaliable : {element.Avalibility}
                                </a>
                            </div>
                        </CardFooter>
                    </Card>
                </GridItem>
            })}
        </GridContainer>
    )
}
