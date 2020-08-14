import React, {useContext} from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import {StoreContext} from '../modules/store';

const useStyles = makeStyles((theme) => ({
  buttonText: {
    justifyContent: 'left' 
  }
}));

export const ShoppingListButtons = ({ingredients}) => {
  const classes = useStyles();
  const [state, dispatch] = useContext(StoreContext);

  const handleAddToListClick = (ingredient) => {
    dispatch({
      type: 'ACTIONS/ADD_TO_SHOPPING_LIST',
      ingredient
    })
  }

  return (
    <ul>
      {ingredients.map((item) => (
        <li>
          <Button
            color="primary"
            className={classes.buttonText}
            onClick={() => handleAddToListClick(item)}>{item}</Button>
        </li>
      ))}
    </ul>
  );
}

export default ShoppingListButtons;
