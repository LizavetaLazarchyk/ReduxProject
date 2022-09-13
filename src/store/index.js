// import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
// import ReduxThunk from "redux-thunk";
import heroes from "../reducers/heroes";
import filters from "../reducers/filters";
import { configureStore } from '@reduxjs/toolkit';

const stringMiddleware = () => (next) => (action) => {
  if (typeof action === 'string') {
      return next({
          type: action
      })
  }
  return next(action)
};

const store = configureStore({
  reducer: {heroes, filters},  
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware),
  devTools: process.env.NODE_ENV !== 'production',
})

export default store;

// enhancer может модифицировать весь store, а Middleware только dispatch (next в функции)
// const enhancer = (createStore) => (...args) => {
//   const store = createStore(...args);

//   const oldDispatch = store.dispatch;
//   store.dispatch = (action) => {
//       if (typeof action === 'string') {
//           return oldDispatch({
//               type: action
//           })
//       }
//       return oldDispatch(action)
//   }
//   return store;
// }

// const store = createStore(
//   combineReducers({ heroes, filters }),
//   compose(
//     applyMiddleware(ReduxThunk, stringMiddleware),
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//     )
  // compose(
  //   enhancer,
  //   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  //   )
    // );

