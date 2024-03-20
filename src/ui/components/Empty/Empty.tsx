import styles from "./Empty.module.css";

type Props = {
  text: string;
};

export const Empty = ({ text }: Props) => {
  return (
    <div className={styles.Empty}>
      <span className={styles.Text}>{text}</span>
    </div>
  );
};
