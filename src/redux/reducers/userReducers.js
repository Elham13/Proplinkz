import {
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  GET_USER_BY_ID_REQ,
  GET_USER_BY_ID_SUCCESS,
  GET_USER_BY_ID_FAIL,
  ADD_TO_WISHLIST_REQ,
  ADD_TO_WISHLIST_SUCCESS,
  ADD_TO_WISHLIST_FAIL,
} from '../types/userTypes';

export const registerUserReducer = (state = {res: ''}, action) => {
  switch (action.type) {
    case REGISTER_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case REGISTER_USER_SUCCESS:
      return {
        loading: false,
        res: action.payload,
        err: '',
      };
    case REGISTER_USER_FAIL:
      return {
        loading: false,
        res: '',
        err: action.payload,
      };
    default:
      return state;
  }
};

export const loginReducer = (state = {res: {}}, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_SUCCESS:
      return {
        loading: false,
        res: action.payload,
        err: '',
      };
    case LOGIN_FAIL:
      return {
        loading: false,
        res: {},
        err: action.payload,
      };
    default:
      return state;
  }
};

export const getUserByIdReducer = (state = {res: {}}, action) => {
  switch (action.type) {
    case GET_USER_BY_ID_REQ:
      return {
        ...state,
        loading: true,
      };
    case GET_USER_BY_ID_SUCCESS:
      return {
        loading: false,
        res: action.payload,
        err: '',
      };
    case GET_USER_BY_ID_FAIL:
      return {
        loading: false,
        res: {},
        err: action.payload,
      };
    default:
      return state;
  }
};

export const addToWishlistReducer = (state = {res: ''}, action) => {
  switch (action.type) {
    case ADD_TO_WISHLIST_REQ:
      return {
        ...state,
        loading: true,
      };
    case ADD_TO_WISHLIST_SUCCESS:
      return {
        loading: false,
        res: action.payload,
        err: '',
      };
    case ADD_TO_WISHLIST_FAIL:
      return {
        loading: false,
        res: '',
        err: action.payload,
      };
    default:
      return state;
  }
};
