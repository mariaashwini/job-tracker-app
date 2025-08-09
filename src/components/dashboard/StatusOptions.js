import React from "react";
import { useFormikContext } from "formik";

export default React.memo(function StatusOptions({
  name,
  value,
  onChange,
  label,
  setFilter = false,
  className = "",
}) {
  const statusOptions = ["pending", "accepted", "rejected", "interview"];
  if (setFilter) statusOptions.unshift("all");
  const formik = useFormikContext();

  const currentValue = formik ? formik.values[name] : value;

  const handleChange = formik
    ? (e) => formik.setFieldValue(name, e.target.value)
    : onChange;

  return (
    <>
      {label && <label htmlFor={name}>{label}</label>}
      <select
        name={name}
        value={currentValue}
        onChange={handleChange}
        className={className}
      >
        {statusOptions.map((s) => (
          <option key={s} value={s}>
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </option>
        ))}
      </select>
    </>
  );
});
