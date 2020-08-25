import axios from "axios";
import { CART_START, CART_SUCCESS, CART_FAIL } from "../actions/actionTypes";
import { addToCartURL } from "../../constants";
import { authAxios } from "../../utils";

export const cartStart = () => {
  return {
    type: CART_START,
  };
};

export const cartSuccess = () => {
  return {
    type: CART_SUCCESS,
  };
};

export const cartFail = (error) => {
  return {
    type: CART_FAIL,
    error: error,
  };
};

export const addToCart = (uuid) => {
  return (dispatch) => {
    dispatch(cartStart());
    authAxios
      .post(addToCartURL, { uuid })
      .then((res) => {
        dispatch(cartSuccess());
      })
      .catch((error) => {
        dispatch(cartFail(error));
      });
  };
};
