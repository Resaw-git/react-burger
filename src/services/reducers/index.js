import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients'
import { constructorReducer } from './constructor'
import { modalReducer } from './modal'
import { orderReducer } from './order'

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  constructorList: constructorReducer,
  modal: modalReducer,
  order: orderReducer
})