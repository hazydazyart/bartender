import React, {useState, useContext, useEffect} from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import {StoreContext} from '../modules/store';
import {allIngredients} from '../data/ingredients';

const useStyles = makeStyles((theme) => ({
  ingredientFilter: {
    minWidth: '300px'
  }
}));

export const FilterSettings = () => {
	const classes = useStyles();
	const [state, dispatch] = useContext(StoreContext);
  const [value, setValue] = useState('');
  const [inputValue, setInputValue] = useState('');

  const {
  	additionalFilter
  } = state;

  const updateAdditionalFilter = (e) => {
    dispatch({
      type: 'ACTIONS/SET_INCLUDE',
      additionalFilter: e.target.value
    })
  }

  const updateIngredients = (ingredient) => {
    if (ingredient) {
      dispatch({
        type: 'ACTIONS/ADD_FILTER',
        ingredient
      })
      setValue('');
      setInputValue('');
    }
  }

	return (
		<React.Fragment>
      <Grid container spacing={2} justify="center">
        <Grid item>
          <RadioGroup row aria-label="Additional filter options" name="other-filter" value={additionalFilter} onChange={updateAdditionalFilter}>
            <FormControlLabel value="include-any" control={<Radio />} label="Include recipes with any of the following ingredients" />
            <FormControlLabel value="include-only" control={<Radio />} label="Include recipes with only the following ingredients" />
          </RadioGroup>
        </Grid>
      </Grid>
      <Grid container spacing={2} justify="center">
        <Grid item>
          <Autocomplete
            disableClearable
            value={value}
            className={classes.ingredientFilter}
            onChange={(event, newValue) => {
              setValue(newValue);
              updateIngredients(newValue);
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
            }}
            id="ingredient-filter"
            options={allIngredients}
            getOptionLabel={(option) => option}
            renderInput={(params) => <TextField {...params} label="Ingredient" variant="outlined" />} />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
