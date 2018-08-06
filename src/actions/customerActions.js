import { SET_CUSTOMER_LIST, GET_ERRORS, SET_PAGE_TOTAL } from './types';
import {BASE_URL} from './../configuration/config';
import axios from 'axios';

export const getCustomerList = (listData, flag=false) => dispatch => {
  const { keyword, type, page } = listData;

    let searchTerm = keyword.lenght === 0 ? "" : '&keyword=' + keyword;

    axios.get(`${BASE_URL}/customer/v1/customers?page=${page}${searchTerm}&type=${type}`).then(res => {

      let { results } = res.data;
      dispatch({ type: SET_PAGE_TOTAL, payload: res.data.total_pages});
      let customerData = {list: results, filter: flag};
      dispatch(setCustomerList(customerData))
    }).catch(err => {
      let serverError = {error:{}};
      try {
        serverError = err.response.data        
      } catch (error) {
        serverError = {error:{user_message:"Network error occured."}};        
      }
      dispatch({
        type: GET_ERRORS,
        payload: serverError
      });
    });
};



export const setCustomerList = (list) => {  
  return {
    type: SET_CUSTOMER_LIST,
    payload: list
  }
}



export const setPageTotal = (total) => ({
  type: SET_PAGE_TOTAL,
  payload: total
});