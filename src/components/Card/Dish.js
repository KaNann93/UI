import GridItem from 'components/Grid/GridItem'
import React, { useState } from 'react'
import ChartistGraph from 'react-chartist';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import AccessTime from '@material-ui/icons/AccessTime';
import Card from 'components/Card/Card';
import CardHeader from 'components/Card/CardHeader';
import CardBody from 'components/Card/CardBody';
import CardFooter from 'components/Card/CardFooter';
import { dailySalesChart } from 'variables/charts';
import styles from "assets/jss/material-dashboard-react/components/CardDishStyle";
import { makeStyles } from '@material-ui/core/styles';
import { Badge, IconButton, TextField } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import { GiCampCookingPot } from "react-icons/gi";
import { AiOutlineDelete } from "react-icons/ai";
import { GrCompliance } from "react-icons/gr";
const useStyles = makeStyles(styles);
export default function Dish({ data, ...rest }) {
    const classes = useStyles();
    const [Items, setItems] = useState(1)
    return (
        <GridItem {...rest}>

            <Badge color="secondary" badgeContent={Items}>
                <Card chart>
                    <CardHeader color="success">
                        <div >
                            <h1>{data}</h1>
                        </div>
                    </CardHeader>
                    <CardBody style={{ justifyContent: "space-between", display: 'flex' }}>
                        <IconButton size="medium" color="secondary" aria-label="delete">
                            <GiCampCookingPot></GiCampCookingPot>
                        </IconButton>
                        <IconButton aria-label="delete">
                            <AiOutlineDelete />
                        </IconButton>
                        <IconButton aria-label="delete">
                            <TextField type="number" inputProps={{ min: "1", max: "5" }} />
                        </IconButton>
                        <IconButton color="primary" aria-label="delete">
                            <GrCompliance color="primary"/>
                        </IconButton>
                    </CardBody>
                    <CardFooter chart>
                        <div className={classes.stats}>
                            <AccessTime /> updated 4 minutes ago
                </div>
                    </CardFooter>
                </Card>

            </Badge>
        </GridItem>
    )
}
