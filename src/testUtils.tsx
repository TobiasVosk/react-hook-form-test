import {
  render
} from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import configureMockStore from "redux-mock-store";
import rootReducer from "./reducers/rootReducer";

const middlewares = [];

const mockStore = configureMockStore(middlewares);
export function createMockStoreNew(initialState) {
  const state = {
    ...rootReducer,
    ...initialState,
  };
  return mockStore(state);
}

export function renderWithRedux(component: JSX.Element, store, history) {
  return {
    ...render(
      <Provider store={store}>
        <Router history={history}>{component}</Router>
      </Provider>
    )
  };
}