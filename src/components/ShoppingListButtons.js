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

  const {
    ingredientFilters,
    name,
    shoppingList
  } = state;

  const listId = name + '-shopping-list'

  const ingredientsForShoppingList = ingredients.filter(ingredient => !ingredientFilters.includes(ingredient) && !shoppingList.includes(ingredient));

  const handleAddToListClick = (ingredient) => {
    dispatch({
      type: 'ACTIONS/ADD_TO_SHOPPING_LIST',
      ingredient
    });

    if (ingredientsForShoppingList.length > 0) {
      document.querySelectorAll(`#${listId} button`)[0].focus();
    }
  }


  if (ingredientsForShoppingList.length < 1) {
    return null;
  }

  return (
    <>
      <div>
        Add the missing ingredients to your shopping list:
      </div>
      <ul id={listId}>
        {ingredientsForShoppingList.map((item, idx) => (
          <li>
            <Button
              aria-label={`Add ${item} to shopping list`}
              color="primary"
              className={classes.buttonText}
              key={'shoppingbutton' + idx}
              onClick={() => handleAddToListClick(item)}>{item}</Button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default ShoppingListButtons;
