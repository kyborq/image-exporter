import { classes } from "@ui/utils/classes.util";

import styles from "./Button.module.css";

type Props = {
  icon?: React.ReactNode;
  label?: string;
  primary?: boolean;
  disabled?: boolean;
  onClick?: () => void;
};

export const Button = ({ label, icon, primary, disabled, onClick }: Props) => {
  return (
    <button
      className={classes(styles.Button, primary && styles.Primary)}
      disabled={disabled}
      onClick={onClick}
    >
      {icon}
      {label}
    </button>
  );
};
