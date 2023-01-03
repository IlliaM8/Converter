import s from "./ValueInput.module.scss";

function ValueInput({ getValue, value }) {
  return (
    <input
      placeholder="Введите сумму для конвертации"
      className={s.input}
      type="number"
      onChange={(e) => getValue(e)}
      value={value}
    />
  );
}

export default ValueInput;
