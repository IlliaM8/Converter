import { createAsyncThunk } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

var myHeaders = new Headers();
myHeaders.append("apikey", "5ZIDajEEIO6oPfi1OvbY6TZmz05IKYJ8");

var requestOptions = {
  method: "GET",
  redirect: "follow",
  headers: myHeaders,
};
export const fetchCurrencies = createAsyncThunk(
  "currency/fetchCurrencies",
  async function (_, { rejectWithValue }) {
    try {
      const response = await fetch(
        "https://api.apilayer.com/currency_data/list",
        requestOptions
      );
      if (!response.ok) {
        throw new Error("Server Error");
      }
      const data = await response.json();
      return data.currencies;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const fetchConvert = createAsyncThunk(
  "currency/fetchConvert",
  async function (_, { rejectWithValue, getState }) {
    const state = getState();
    const to = state.currency.chooseCurr1.label.split(" ")[0];
    const from = state.currency.chooseCurr2.label.split(" ")[0];
    const amount = state.currency.changeValue;

    try {
      const response = await fetch(
        `https://api.apilayer.com/currency_data/convert?to=${from}&from=${to}&amount=${amount}`,
        requestOptions
      );

      if (!response.ok) {
        throw new Error("Server Error");
      }

      const data = await response.json();
      return data.result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
