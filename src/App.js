import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.scss";
import ConverterControl from "./Components/ConverterControl/ConverterControl";
import ConvertResult from "./Components/ConvertResult/ConvertResult";
import ValueInput from "./Components/UI/ValueInput/ValueInput";
import { getChangeValue } from "./store/currencySlice";
import { fetchConvert, fetchCurrencies } from "./store/fetchThunk";

function App() {
  const dispatch = useDispatch();
  const changeValue = useSelector((state) => state.currency.changeValue);

  useEffect(() => {
    dispatch(fetchCurrencies());
    setTimeout(() => {
      dispatch(fetchConvert());
    }, 1000);
  }, [dispatch]);

  const getValue = (e) => {
    dispatch(getChangeValue(e.target.value));
    dispatch(fetchConvert());
  };

  return (
    <div className="wrapper">
      <h1 className="title">Конвертер</h1>
      <div className="container">
        <ValueInput getValue={getValue} value={changeValue} />
        <ConverterControl />
        <ConvertResult />
      </div>
    </div>
  );
}

export default App;
