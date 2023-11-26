
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
  query5: [],
  weapons: [],
  total_records: []
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

  const getQuery2 = async () => {
    try {
      dispatch({ type: "LOADER" });
      const data = await api.get('/get_complexQ2');
      dispatch({
        type: "GET_QUERY2",
        payload: data.data,
      });
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  const getQuery3 = async () => {
    try {
      dispatch({ type: "LOADER" });
      const data = await api.get('/get_complexQ3');
      dispatch({
        type: "GET_QUERY3",
        payload: data.data,
      });
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  const getQuery4 = async () => {
    try {
      dispatch({ type: "LOADER" });
      const data = await api.get('/get_complexQ4');
      dispatch({
        type: "GET_QUERY4",
        payload: data.data,
      });
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  const getQuery5 = async () => {
    try {
      dispatch({ type: "LOADER" });
      const data = await api.get('/get_complexQ5');
      dispatch({
        type: "GET_QUERY5",
        payload: data.data,
      });
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  const getWeapons = async () => {
    try {
      dispatch({ type: "LOADER" });
      const data = await api.get('/get_weapons');
      dispatch({
        type: "GET_WEAPONS",
        payload: data.data,
      });
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  const getRecordCount = async () => {
    try {
      dispatch({ type: "LOADER" });
      const data = await api.get('/get_recordCount');
      dispatch({
        type: "GET_RECORD_COUNT",
        payload: data.data,
      });
    } catch (error) {
      console.log(error.response?.data);
    }
  };


  return (
    <GlobalContext.Provider
      value={{
        query1: state.query1,
        query2: state.query2,
        query3: state.query3,
        query4: state.query4,
        query5: state.query5,
        areas: state.areas,
        weapons: state.weapons,
        total_records: state.total_records,
        is_loading: state.is_loading,
        getQuery1,
        getAllAreas,
        getQuery2,
        getQuery3,
        getQuery4,
        getQuery5,
        getWeapons,
        getRecordCount
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}