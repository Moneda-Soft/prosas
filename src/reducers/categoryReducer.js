import { types } from '../types/types';

const initialState = {
    category: [],
    active: null,
};

export const categoryReducer = ( state = initialState, action ) => {

    switch( action.type ){
        
        case types.categoryAddNew:
            return { 
                ...state,
                category: [ 
                    ...state.category,
                    action.payload,
                ],
                active: null,
            }
        
        case types.categoryLoaded:
            return {
                ...state,
                category: [...action.payload]
            }
        
        case types.categoryDeleted:
            return {
                ...state,
                category: state.category.filter( category => (category.catId !== action.payload.catId) ),
                active: null,
            }
        
        case types.categoryEdited:
            return {
                ...state,
                category: state.category.map( category  => (category.catId === action.payload.catId) ? action.payload : category)
            }
        
        case types.categorySetActive:
            return {
                ...state,
                active: action.payload,
            }
        
        case types.categoryRemoveActive:
            return {
                ...state,
                active: null,
            }
        
        default:
            return state;
    }
}