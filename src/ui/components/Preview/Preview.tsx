import CloseIcon from "../../assets/close.svg?component";
import styles from "./Preview.module.css";

type Props = {
  image?: string;
};

export const Preview = ({ image }: Props) => {
  return (
    <div className={styles.Preview}>
      {!!image && <img className={styles.Image} src={image} />}
      <CloseIcon className={styles.Icon} stroke="red" />
    </div>
  );
};
