import { classes } from "@ui/utils/classes.util";

import styles from "./Select.module.css";

type Props = {
  items: string[];
  value: number;
  onClick?: (value: number) => void;
};

export const Select = ({ items, value, onClick }: Props) => {
  return (
    <div className={styles.Select}>
      {items.map((item, index) => {
        return (
          <span
            key={index}
            className={classes(
              styles.Option,
              value === index && styles.Selected
            )}
            onClick={() => onClick && onClick(index)}
          >
            {item}
          </span>
        );
      })}
    </div>
  );
};
