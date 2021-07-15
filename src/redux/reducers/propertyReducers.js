import {
  ADD_PROPERTY_REQ,
  ADD_PROPERTY_SUCCESS,
  ADD_PROPERTY_FAIL,
  GET_ALL_PROPERTIES_REQ,
  GET_ALL_PROPERTIES_SUCCESS,
  GET_ALL_PROPERTIES_FAIL,
  GET_FILTERED_PROPS_REQ,
  GET_FILTERED_PROPS_SUCCESS,
  GET_FILTERED_PROPS_FAIL,
} from '../types/propertyTypes';

export const addPropertyReducer = (state = {res: ''}, action) => {
  switch (action.type) {
    case ADD_PROPERTY_REQ:
      return {
        loading: true,
      };
    case ADD_PROPERTY_SUCCESS:
      return {
        loading: false,
        res: action.payload,
      };
    case ADD_PROPERTY_FAIL:
      return {
        loading: false,
        res: '',
        err: action.payload,
      };
    default:
      return state;
  }
};

export const getAllPropertiesReducer = (state = {res: []}, action) => {
  switch (action.type) {
    case GET_ALL_PROPERTIES_REQ:
      return {
        loading: true,
      };
    case GET_ALL_PROPERTIES_SUCCESS:
      return {
        loading: false,
        res: action.payload,
      };
    case GET_ALL_PROPERTIES_FAIL:
      return {
        loading: false,
        res: [],
        err: action.payload,
      };
    default:
      return state;
  }
};

export const getFilteredPropReducer = (state = {res: []}, action) => {
  switch (action.type) {
    case GET_FILTERED_PROPS_REQ:
      return {
        loading: true,
      };
    case GET_FILTERED_PROPS_SUCCESS:
      return {
        loading: false,
        res: action.payload,
      };
    case GET_FILTERED_PROPS_FAIL:
      return {
        loading: false,
        res: [],
        err: action.payload,
      };
    default:
      return state;
  }
};
