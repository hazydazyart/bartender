import React, {createContext, useReducer} from 'react';
import {
	ADD_FILTER,
	DELETE_FILTER,
	DO_SEARCH,
	ADD_SHOPPING,
	SET_INCLUDE,
	LOADING
} from './constants';
import {recipes} from '../data/recipes';

export const StoreContext = createContext();

const initialState = {
	filteredRecipes: [],
	ingredientFilters: [],
	shoppingList: [],
	additionalFilter: 'include-any',
	loading: false
};

const reducer = (state, action) => {
	switch (action.type) {
		case ADD_FILTER:
			return addItemToFilter(state, action);
		case DELETE_FILTER:
			return deleteItemFromFilter(state, action);
		case DO_SEARCH:
			return filterRecipes(state);
		case SET_INCLUDE:
			return updateAdditionalFilter(state, action);
		case ADD_SHOPPING:
			return addItemToShopping(state, action);
		case LOADING:
			return setLoading(state);
		default:
			return state;
	}
}

const setLoading = (state) => {
	return {
		...state,
		filteredRecipes: [],
		loading: true
	}
}

const addItemToFilter = (state, action) => {
	return {
		...state,
		ingredientFilters: [...state.ingredientFilters, action.ingredient]
	}
}

const deleteItemFromFilter = (state, action) => {
    const filteredIngredients = state.ingredientFilters.filter((name) => {
        return name !== action.ingredient
    });

    return {
    	...state,
    	ingredientFilters: filteredIngredients
    }
}

const addItemToShopping = (state, action) => {
	return {
		...state,
		shoppingList: [...state.shoppingList, action.ingredient]
	}
}

const updateAdditionalFilter = (state, action) => {
	return {
		...state,
		additionalFilter: action.additionalFilter
	}
}

const filterRecipes = (state) => {
	const {
		additionalFilter,
		ingredientFilters
	} = state;
    const tempArray = [];
    let toBeRemoved;

    if (additionalFilter === "include-any") {
      recipes.forEach((recipe) => {
        recipe.ingredients.forEach((ingredient) => {
          if (ingredientFilters.includes(ingredient)) {
            tempArray.push(recipe)
          }
        })
      });
    } else {
      recipes.forEach((recipe) => {
        toBeRemoved = false;
        recipe.ingredients.forEach((ingredient) => {
          if (!ingredientFilters.includes(ingredient)) {
            toBeRemoved = true;
          }
        })

        !toBeRemoved && tempArray.push(recipe);
      });
    }

    return {
    	...state,
    	loading: false,
    	filteredRecipes: getUniqueListBy(tempArray, 'name')
    }
}

const getUniqueListBy = (arr, key) => {
  return [...new Map(arr.map(item => [item[key], item])).values()]
}

export const StoreProvider = (props) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	return (
		<StoreContext.Provider value={[state, dispatch]}>
			{props.children}
		</StoreContext.Provider>
	);
}
