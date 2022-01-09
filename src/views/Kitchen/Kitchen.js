import { Container, Drawer, Fab, Input } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import AddIcon from '@material-ui/icons/Add';
import Dish from 'components/Card/Dish'
import GridContainer from 'components/Grid/GridContainer'
import React,{useState} from 'react'
import Api from './kitchenApi'
import NewDish from './NewDish';

const useStyles = makeStyles({
    list: {
      width: 250,
    },
    fullList: {
      width: 'auto',
    },
  });

export default function Kitchen() {
    const [Dishes, setDishes] = useState(Api.getDishesFromServer());
    const classes = useStyles();
    const [NewDishState, setNewDish] = useState(false);
    const toggleDrawer =  open => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
        setNewDish(open);
      };    
    return (
        <Container className="container" style={{display:"flex"}}>
            <GridContainer style={{display:"flex"}}>
                {Dishes.map((dish,count)=>{return <Dish key={count} xs={12} sm={6} md={4} lg={3} data={dish}/>})}
                
            </GridContainer>
            <Fab onClick={toggleDrawer(true)} color="primary" aria-label="add" style={{position:"fixed",zIndex:"5",right:"20px",bottom:"20px"}}>
                <AddIcon/>
            </Fab>
            {NewDishState?(
                <NewDish close={toggleDrawer}></NewDish>
            ):null}
        </Container>
    )
}
