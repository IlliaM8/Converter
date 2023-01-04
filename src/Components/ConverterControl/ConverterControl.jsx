import s from "./ConverterControl.module.scss";
import CurrInput from "../UI/CurrInput/CurrInput";
import { useSelector, useDispatch } from "react-redux";
import arrow from "./arrow.png";
import {
  rotateCurr,
  setCurrenciesFirst,
  setCurrenciesSecond,
} from "../../store/currencySlice";
import { loadingCheck } from ".";
import { fetchConvert } from "../../store/fetchThunk";

function ConverterControl() {
  const dispatch = useDispatch();

  const { status, currencies, chooseCurr1, chooseCurr2 } = useSelector(
    (state) => state.currency
  );
  const setCurFirst = (e) => {
    dispatch(setCurrenciesFirst(e));
    dispatch(fetchConvert());
  };
  const setCurSecond = (e) => {
    dispatch(setCurrenciesSecond(e));
    dispatch(fetchConvert());
  };
  const rotateCurrency = () => {
    dispatch(rotateCurr());
    dispatch(fetchConvert());
  };
  return (
    <div className={s.container}>
      <CurrInput
        options={loadingCheck(status, currencies)}
        disabled={false}
        value={loadingCheck(status, chooseCurr1)}
        setCur={setCurFirst}
      />
      <div className={s.arrow} onClick={() => rotateCurrency()}>
        <img className={s.arrow__img} src={arrow} alt="" />
      </div>
      <CurrInput
        options={loadingCheck(status, currencies)}
        disabled={false}
        value={loadingCheck(status, chooseCurr2)}
        setCur={setCurSecond}
      />
    </div>
  );
}

export default ConverterControl;
