import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
import {localApi} from '../../consts/utils';

export const addPropertyAction = load => {
  return async dispatch => {
    dispatch({type: ADD_PROPERTY_REQ});
    const user = await AsyncStorage.getItem('@user');

    if (user) {
      const u = JSON.parse(user);
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${u.token}`,
          },
        };
        const {data} = await axios.post(
          `${localApi}/properties/`,
          load,
          config,
        );
        dispatch({type: ADD_PROPERTY_SUCCESS, payload: data.Success});
      } catch (error) {
        error.response
          ? dispatch({
              type: ADD_PROPERTY_FAIL,
              payload: error.response.data.Fail,
            })
          : dispatch({type: ADD_PROPERTY_FAIL, payload: error.message});
      }
    } else {
      dispatch({
        type: ADD_PROPERTY_FAIL,
        payload: 'You are not authorized please login',
      });
    }
  };
};

export const getAllPropertiesAction = () => {
  return async dispatch => {
    dispatch({type: GET_ALL_PROPERTIES_REQ});

    try {
      const {data} = await axios.get(`${localApi}/properties/`);
      dispatch({type: GET_ALL_PROPERTIES_SUCCESS, payload: data});
    } catch (error) {
      error.response
        ? dispatch({
            type: GET_ALL_PROPERTIES_FAIL,
            payload: error.response.data.Fail,
          })
        : dispatch({type: GET_ALL_PROPERTIES_FAIL, payload: error.message});
    }
  };
};

export const getFilteredPropsAction = load => {
  return async dispatch => {
    dispatch({type: GET_FILTERED_PROPS_REQ});

    try {
      const {data} = await axios.post(`${localApi}/properties/filtered`, load);
      dispatch({type: GET_FILTERED_PROPS_SUCCESS, payload: data});
    } catch (error) {
      error.response
        ? dispatch({
            type: GET_FILTERED_PROPS_FAIL,
            payload: error.response.data.Fail,
          })
        : dispatch({type: GET_FILTERED_PROPS_FAIL, payload: error.message});
    }
  };
};
