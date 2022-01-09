import React, {useState} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import FormControl from '@material-ui/core/FormControl';
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import avatar from "assets/img/faces/marc.jpg";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
};

//const useStyles = makeStyles(styles);

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));


export default function Recipe() {
  const classes = useStyles();
  const [state, setState] = useState({recipe: '',name: 'kk',});

  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  return (
    <div>
      <GridContainer>
        <GridItem xs={18} sm={18} md={8}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Recipe</h4>
              <p className={classes.cardCategoryWhite}>Recipe Details</p>
            </CardHeader>
            <CardBody>
            <FormControl className={classes.formControl}>
            <InputLabel htmlFor="age-native-recipe">Recipe</InputLabel>
        <Select
          native
          value={state.recipe}
          onChange={handleChange}
          inputProps={{
            name: 'recipe',
            id: 'age-native-simple',
          }}
        >
          <option aria-label="None" value="" />
          <option value={10}>Maggi</option>
          <option value={20}>Rice plate</option>
          <option value={30}>Noodles</option>
        </Select>
        </FormControl>

        <FormControl className={classes.formControl}>
            <InputLabel htmlFor="age-native-simple">Ingredients</InputLabel>
        <Select
          native
          value={state.age}
          onChange={handleChange}
          inputProps={{
            name: 'recipe',
            id: 'age-native-simple',
          }}
        >
          <option aria-label="None" value="" />
          <option value={10}>Maggi</option>
          <option value={20}>Rice</option>
          <option value={30}>Noodles</option>
          <option value={10}>Lentils</option>
          <option value={20}>Veggies</option>
          <option value={30}>spices</option>
        </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
            <InputLabel htmlFor="age-native-simple">Quantity</InputLabel>
        <Select
          native
          value={state.age}
          onChange={handleChange}
          inputProps={{
            name: 'recipe',
            id: 'age-native-simple',
          }}
        >
          <option aria-label="None" value="" />
          <option value={10}>1</option>
          <option value={20}>2</option>
          <option value={30}>3</option>
          <option value={10}>4</option>
          <option value={20}>5</option>
          <option value={30}>6</option>

        </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
            <InputLabel htmlFor="age-native-simple">Unit</InputLabel>
        <Select
          native
          value={state.age}
          onChange={handleChange}
          inputProps={{
            name: 'recipe',
            id: 'age-native-simple',
          }}
        >
          <option aria-label="None" value="" />
          <option value={10}>Litre</option>
          <option value={20}>Tbsp</option>
          <option value={30}>tsp</option>
          <option value={10}>cup</option>
          <option value={20}>pack</option>
          <option value={30}>tsp</option>
        </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
        <Button variant="contained" color="primary">
        Add
        </Button>
        </FormControl>
            </CardBody>
            <CardFooter>
            <FormControl className={classes.formControl}>
        <InputLabel shrink htmlFor="select-multiple-native">
          Details
        </InputLabel>
        <Select
          multiple
          native
          //value={personName}
         // onChange={handleChangeMultiple}
          inputProps={{
            id: 'select-multiple-native',
          }}
        >
        </Select>
      </FormControl>
      </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}


