import React, {createContext, useReducer} from 'react';
import {
	ADD_FILTER,
	DELETE_FILTER,
	DO_SEARCH,
	ADD_SHOPPING,
	SET_INCLUDE
} from './constants';
import {recipes} from '../data/recipes';

export const StoreContext = createContext();

const initialState = {
	filteredRecipes: [],
	ingredientFilters: [],
	shoppingList: [],
	additionalFilter: 'include-any'
};

const reducer = (state, action) => {
	switch (action.type) {
		case ADD_FILTER:
			return addItemToFilter(state, action);
		case DELETE_FILTER:
			return deleteItemFromFilter(state, action);
		case DO_SEARCH:
			return state;
		case SET_INCLUDE:
			return updateAdditionalFilter(state, action);
		case ADD_SHOPPING:
			return addItemToShopping(state, action);
		default:
			return state;
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

const filterRecipes = (state, action) => {
	const {additionalFilter} = state;
}

export const StoreProvider = (props) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	return (
		<StoreContext.Provider value={[state, dispatch]}>
			{props.children}
		</StoreContext.Provider>
	);
}
