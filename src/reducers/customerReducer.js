import { SET_CUSTOMER_LIST, SET_PAGE_TOTAL } from "../actions/types";

const initialState = {
  customerList: [],
  totalPateCount: 0
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CUSTOMER_LIST: 
    if(action.payload.filter){

    }
      return action.payload.filter ? {...state, customerList: action.payload.list} : {...state,customerList: [...state.customerList, ...action.payload.list]};
    case SET_PAGE_TOTAL:
      return {
        ...state,
        totalPateCount: action.payload
      }

    default:
      return state;
  }

}