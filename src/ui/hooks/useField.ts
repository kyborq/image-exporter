import { useState } from "react";

export const useField = () => {
  const [value, setValue] = useState("");

  const handleChange = (value: string) => {
    setValue(value);
  };

  const clearValue = () => {
    setValue("");
  };

  return { value, handleChange, clearValue };
};
