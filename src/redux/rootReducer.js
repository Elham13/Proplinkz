import {combineReducers} from 'redux';
import {
  addPropertyReducer,
  getAllPropertiesReducer,
  getFilteredPropReducer,
} from './reducers/propertyReducers';
import {
  registerUserReducer,
  loginReducer,
  getUserByIdReducer,
  addToWishlistReducer,
} from './reducers/userReducers';

const rootReducer = combineReducers({
  register: registerUserReducer,
  login: loginReducer,
  getUserById: getUserByIdReducer,
  addToWishlist: addToWishlistReducer,
  createProperty: addPropertyReducer,
  getAllProperties: getAllPropertiesReducer,
  filteredProps: getFilteredPropReducer,
});

export default rootReducer;
