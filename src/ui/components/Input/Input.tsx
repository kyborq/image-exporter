import { useEffect, useState } from "react";

import { classes } from "@ui/utils/classes.util";

import styles from "./Input.module.css";

type Props = {
  value: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  onEnter?: () => void;
  onBlur?: (value: string) => void;
  transparent?: boolean;
};

export const Input = ({
  value,
  placeholder,
  transparent,
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
      value={currentValue}
      placeholder={placeholder}
      className={classes(styles.Input, transparent && styles.Transparent)}
      onKeyDown={(e) => e.key === "Enter" && onEnter && onEnter()}
      onChange={(e) => setCurrentValue(e.target.value)}
      onBlur={() => onBlur && onBlur(currentValue)}
    />
  );
};
