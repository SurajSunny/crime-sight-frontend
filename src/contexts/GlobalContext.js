
import React, { createContext, useReducer } from "react";
import api from "../httpCommon";
import GlobalReducer from "./GlobalReducer";

const initialState = {
  is_loading: false,
  areas: [],
  query1: [],
  query2: [],
  query3: [],
  query4: [],
  query5: []
};

export const GlobalContext = createContext([]);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(GlobalReducer, initialState);

  const getAllAreas = async () => {
    try {
      dispatch({ type: "LOADER" });
      const data = await api.get('/get_areas');
      dispatch({
        type: "GET_AREAS",
        payload: data.data,
      });
    } catch (error) {
      console.log(error.response?.data);
      // dispatch({ type: "GET_ERROR", payload: error.response?.data });
    }
  };

  const getQuery1 = async () => {
    try {
      dispatch({ type: "LOADER" });
      const data = await api.get('/get_complexQ1');
      dispatch({
        type: "GET_QUERY1",
        payload: data.data,
      });
    } catch (error) {
      console.log(error.response?.data);
      // dispatch({ type: "GET_ERROR", payload: error.response?.data });
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        query1: state.query1,
        areas: state.areas,
        is_loading: state.is_loading,
        getQuery1,
        getAllAreas
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}