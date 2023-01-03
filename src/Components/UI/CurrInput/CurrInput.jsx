import React from "react";
import Select from "react-select";
import s from "./CurrInput.module.scss";

function CurrInput({ options, disabled, value, setCur }) {
  return (
    <Select
      placeholder="Выбирите валюту"
      className={s.select}
      classNamePrefix="cur-select"
      onChange={(e) => setCur(e)}
      value={value}
      options={options}
      isLoading={false}
      isClearable={false}
      isRtl={false}
      isSearchable={true}
      isDisabled={disabled}
    />
  );
}

export default CurrInput;
