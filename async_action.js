const redux = require("redux");
const createStore = redux.createStore;
const FETCH_REQUEST = "FETCH_REQUEST";
const FETCH_SUCCESS = "FETCH_SUCCESS";
const FETCH_ERROR = "FETCH_ERROR";

function fetchRequest() {
  return {
    type: FETCH_REQUEST,
  };
}

function fetchSuccess(products) {
  return {
    type: FETCH_SUCCESS,
    payload: products,
  };
}

function fetchError(error) {
  return {
    type: FETCH_ERROR,
    payload: error,
  };
}

const initialState = {
    loading: false,
    products: [],
    error: false,
  };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      };
    case FETCH_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

const store = createStore(reducer);