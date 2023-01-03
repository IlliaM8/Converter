import { createSlice } from "@reduxjs/toolkit";
import { fetchConvert, fetchCurrencies } from "./fetchThunk";

class Currency {
  constructor(abr, label) {
    this.label = `${abr} (${label})`;
    this.value = `${abr} (${label})`;
  }
}
const currencySlise = createSlice({
  name: "currency",
  initialState: {
    currencies: [],

    chooseCurr1: {},
    chooseCurr2: {},

    changeValue: 1,

    status: "",
    error: null,
  },
  reducers: {
    setCurrenciesFirst(state, action) {
      state.chooseCurr1 = action.payload;
    },
    setCurrenciesSecond(state, action) {
      state.chooseCurr2 = action.payload;
    },

    getChangeValue(state, action) {
      state.changeValue = action.payload;
    },
    setChangedValue(state, action) {
      state.changeValue = action.payload;
    },
    rotateCurr(state, payload) {
      const cur1 = state.chooseCurr1;
      state.chooseCurr1 = state.chooseCurr2;
      state.chooseCurr2 = cur1;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCurrencies.pending, (state, action) => {
      state.chooseCurr1.label = "Загрузка";
      state.chooseCurr2.label = "Загрузка";

      state.status = "pending";
      state.error = null;
    });

    builder.addCase(fetchCurrencies.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.error = null;

      for (const key in action.payload) {
        state.currencies.push(new Currency(key, action.payload[key]));
      }

      state.chooseCurr1 = state.currencies.find(
        (s) => s.label === "USD (United States Dollar)"
      );
      state.chooseCurr2 = state.currencies.find(
        (s) => s.label === "UAH (Ukrainian Hryvnia)"
      );
    });

    builder.addCase(fetchCurrencies.rejected, (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    });

    builder.addCase(fetchConvert.pending, (state, action) => {
      state.status = "wait";
      state.error = null;
    });
    builder.addCase(fetchConvert.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.error = null;
      state.changedValue = action.payload.toFixed(2);
    });
    builder.addCase(fetchConvert.rejected, (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
      console.log(action.error.message);
    });
  },
});
export const {
  setCurrenciesFirst,
  setCurrenciesSecond,
  rotateCurr,
  getChangeValue,
  setChangedValue,
} = currencySlise.actions;
export default currencySlise.reducer;
