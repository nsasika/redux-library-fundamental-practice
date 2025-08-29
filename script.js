const redux = require("redux");
const createStore = redux.createStore;
const ORDER_PIZZA = "ORDER_PIZZA";

//Action
// const action = {
//   type: ORDER_PIZZA,
//   shop_name:'Pizza Shop'
// }

//Action Creator
function orderPizza() {
  return {
    type: ORDER_PIZZA,
    payload: "Pizza Shop",
  };
}

//Reducer
const initialState = {
  pizzaBase: 100,
  toppings: ["cheese", "tomato", "onion"],
};

const reducer = (state = initialState, action) => {
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

// STORE
// 1- Store needs to hold application state
const store = createStore(reducer);

// 2 - It exposes a getState() method to access the current state
console.log("Initial State", store.getState());

// 3 - Registering listeners via subscribe(listener)
const unsubscribe = store.subscribe(() => {
  console.log("Updated State", store.getState());
});

// 4 - Allowing state to be updated via dispatch(action)
store.dispatch(orderPizza());
store.dispatch(orderPizza());
store.dispatch(orderPizza());
unsubscribe();
store.dispatch(orderPizza());
store.dispatch(orderPizza());
