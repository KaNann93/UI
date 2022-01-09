import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function ButtonDropDown({ style, options, defUnit, onChange,...rest }) {
  const classes = useStyles();
  const [unit, setUnit] = useState(defUnit);
  const Opt = () => {
    return (options.map((option, index) => {
      let param = option.split('-')[0];
      return <MenuItem value={param} key={index}>{param}</MenuItem>
    }))
  }

  useEffect(() => {
    setUnit(defUnit);
  }, []);
  
  const handleChange = (event) => {
    setUnit(event.target.value);
    {onChange(event)}
  };
  return (
    <FormControl className={classes.formControl} style={style}>
      <Select
        labelId="demo-simple-select-autowidth-label"
        id="demo-simple-select-autowidth"
        value={unit}
        onChange={handleChange}
        //onChange={onChange}
        autoWidth
        {...rest}
      >
        {options.map((option, index) => {
          let param = option.split('-')[0];
          return <MenuItem value={param} key={index} {...rest}>{param}</MenuItem>
        })}

      </Select>
    </FormControl>
  );
}