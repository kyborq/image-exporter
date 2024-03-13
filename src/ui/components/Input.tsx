import { useEffect, useState } from "react";

import { classes } from "@ui/utils/classes.util";

import "./Input.css";

type Props = {
  value: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  onEnter?: () => void;
  onBlur?: (value: string) => void;
  transparent?: boolean;
  keep?: boolean;
};

export const Input = ({
  value,
  placeholder,
  transparent,
  keep,
  onChange,
  onEnter,
  onBlur,
}: Props) => {
  const [currentValue, setCurrentValue] = useState(value);

  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  useEffect(() => {
    onChange && onChange(currentValue);
  }, [currentValue]);

  return (
    <input
      className={classes("input", transparent && "transparent")}
      placeholder={placeholder}
      value={currentValue}
      onKeyDown={(e) => e.key === "Enter" && onEnter && onEnter()}
      onChange={(e) => setCurrentValue(e.target.value)}
      onBlur={() => onBlur && onBlur(currentValue)}
    />
  );
};
