import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {localApi} from '../../consts/utils';
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

export const registerUserAction = load => {
  return async dispatch => {
    dispatch({type: REGISTER_USER_REQUEST});

    try {
      const {data} = await axios.post(`${localApi}/user/register`, load);
      dispatch({type: REGISTER_USER_SUCCESS, payload: data.Success});
    } catch (error) {
      error.response
        ? dispatch({
            type: REGISTER_USER_FAIL,
            payload: error.response.data.Fail,
          })
        : dispatch({type: REGISTER_USER_FAIL, payload: error.message});
    }
  };
};

export const loginAction = load => {
  return async dispatch => {
    dispatch({type: LOGIN_REQUEST});

    try {
      const {data} = await axios.post(`${localApi}/user/login`, load);
      await AsyncStorage.removeItem('@user');
      await AsyncStorage.setItem('@user', JSON.stringify(data));
      dispatch({type: LOGIN_SUCCESS, payload: data});
    } catch (error) {
      error.response
        ? dispatch({
            type: LOGIN_FAIL,
            payload: error.response.data.Fail,
          })
        : dispatch({type: LOGIN_FAIL, payload: error.message});
    }
  };
};

export const getUserByIdAction = id => {
  return async dispatch => {
    dispatch({type: GET_USER_BY_ID_REQ});
    const user = await AsyncStorage.getItem('@user');
    if (!user) {
      dispatch({
        type: GET_USER_BY_ID_FAIL,
        payload: 'You are not authorized please login first',
      });
      return;
    }
    try {
      const u = JSON.parse(user);
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${u.token}`,
        },
      };
      const {data} = await axios.get(`${localApi}/user/${id}`, config);
      dispatch({type: GET_USER_BY_ID_SUCCESS, payload: data});
    } catch (error) {
      error.response
        ? dispatch({
            type: GET_USER_BY_ID_FAIL,
            payload: error.response.data.Fail,
          })
        : dispatch({type: GET_USER_BY_ID_FAIL, payload: error.message});
    }
  };
};

export const addToWishListAction = (load, msg) => {
  return async dispatch => {
    dispatch({type: ADD_TO_WISHLIST_REQ});
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
          `${localApi}/user/wishlist/${msg}`,
          load,
          config,
        );
        console.log('REDUx: ', data);
        dispatch({type: ADD_TO_WISHLIST_SUCCESS, payload: data.Success});
      } catch (error) {
        error.response
          ? dispatch({
              type: ADD_TO_WISHLIST_FAIL,
              payload: error.response.data.Fail,
            })
          : dispatch({type: ADD_TO_WISHLIST_FAIL, payload: error.message});
      }
    } else {
      dispatch({
        type: ADD_TO_WISHLIST_FAIL,
        payload: 'You are not authorized please login',
      });
    }
  };
};
