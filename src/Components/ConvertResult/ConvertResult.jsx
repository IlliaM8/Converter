import { useSelector } from "react-redux";

function ConvertResult() {
  const { chooseCurr1, chooseCurr2, changedValue, changeValue } = useSelector(
    (state) => state.currency
  );

  return (
    <div className="converter__text-row">
      <div className="converter__text">
        {`${chooseCurr1.label}: ${changeValue}`}
      </div>
      <div>=</div>
      <div className="converter__text">
        {changedValue}: ({chooseCurr2.label})
      </div>
    </div>
  );
}

export default ConvertResult;
