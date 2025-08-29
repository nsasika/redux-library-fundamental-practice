const redux = require("redux");
const createStore = redux.createStore;
// to combine multiple reducers
const combineReducers = redux.combineReducers;
const reduxLogger = require("redux-logger");
const logger = reduxLogger.createLogger();
const applyMiddleware = redux.applyMiddleware;
const ORDER_PIZZA = "ORDER_PIZZA";
const ORDER_BURGER = "ORDER_BURGER";

function orderBurger() {
  return {
    type: ORDER_BURGER,
  }
};

function orderPizza() {
  return {
    type: ORDER_PIZZA,
    payload: "Pizza Shop",
  };
}

const initialStateForPizza = {
  pizzaBase: 100,
};

const initialStateForBurger = {
  burgerBuns: 200,
};

const reducerPizza = (state = initialStateForPizza, action) => {
  switch (action.type) {
    case ORDER_PIZZA:
      return {
        ...state,
        pizzaBase: state.pizzaBase - 1,
      };  
    default:
      return state;
  }
};

const reducerBurger = (state = initialStateForBurger, action) => {
  switch (action.type) {
    case ORDER_BURGER:
      return {
        ...state,
        burgerBuns: state.burgerBuns - 1,
      };  
    default:
      return state;
  }
};

// combine reducers
const rootReducer = combineReducers({
  pizza: reducerPizza,
  burger: reducerBurger,
});

// STORE
// 1- Store needs to hold application state
const store = createStore(rootReducer,applyMiddleware(logger));

// 2 - It exposes a getState() method to access the current state
console.log("Initial State", store.getState());

// 3 - Registering listeners via subscribe(listener)
const unsubscribe = store.subscribe(() => {});

// 4 - Allowing state to be updated via dispatch(action)
store.dispatch(orderPizza());
store.dispatch(orderPizza());
store.dispatch(orderBurger());
unsubscribe();
store.dispatch(orderPizza());
store.dispatch(orderPizza());
