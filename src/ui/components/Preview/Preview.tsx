import styles from "./Preview.module.css";

type Props = {
  image?: string;
  onClick?: () => void;
};

export const Preview = ({ image, onClick }: Props) => {
  return (
    <div className={styles.Preview} onClick={onClick}>
      {!!image && <img className={styles.Image} src={image} />}
    </div>
  );
};
