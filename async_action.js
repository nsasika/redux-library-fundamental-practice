const { default: axios } = require("axios");
const redux = require("redux");
const thunk = require("redux-thunk").thunk;
const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;
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
        error: false,
      };
    case FETCH_ERROR:
      return {
        loading: false,
        products: [],
        error: true,
      };
    default:
      return state;
  }
};

const fetchProducts = () => {
  return function (dispatch) {
    dispatch(fetchRequest());
    axios("https://fakestoreapi.com/products")
      .then((response) => {
        const products = response.data.map((product) => product.title);
        console.log(products);
        dispatch(fetchSuccess(products));
      })
      .catch((error) => {
        dispatch(fetchError(error.message));
      });
  };
};

const store = createStore(reducer, applyMiddleware(thunk));
store.subscribe(() => {console.log(store.getState());});
store.dispatch(fetchProducts());
// unsubscribe();
