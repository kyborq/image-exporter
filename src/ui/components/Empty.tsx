import "./Empty.css";

type Props = {
  text: string;
};

export const Empty = ({ text }: Props) => {
  return (
    <div className="empty">
      <span className="empty__text">{text}</span>
    </div>
  );
};
