import { useState } from "react";

import { TCollection } from "@ui/models/label.model";

import ChevronDownIcon from "../../assets/chevron-down.svg?component";
import ChevronRightIcon from "../../assets/chevron-right.svg?component";
import CrossIcon from "../../assets/cross.svg?component";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import { Preview } from "../Preview";
import styles from "./Collection.module.css";

type Props = {
  collection: TCollection;
  onRename?: (id: string, newName: string) => void;
  onRemove?: (id: string) => void;
};

export const Collection = ({ collection, onRename, onRemove }: Props) => {
  const [expanded, setExpanded] = useState(false);

  const { id, name, elements } = collection;

  const visibleElements = elements.slice(0, elements.length > 5 ? 4 : 5);
  const totalElements = expanded ? elements : visibleElements;

  const handleRemove = () => {
    onRemove && onRemove(id);
  };

  const handleRename = (value: string) => {
    onRename && onRename(id, value);
  };

  return (
    <div className={styles.Card}>
      <div className={styles.Label}>
        <Button
          icon={expanded ? <ChevronDownIcon /> : <ChevronRightIcon />}
          onClick={() => setExpanded((e) => !e)}
        />
        <Input
          value={name}
          placeholder={name}
          onBlur={handleRename}
          transparent
        />
        <Button icon={<CrossIcon />} onClick={handleRemove} />
      </div>
      {!!elements.length && (
        <div className={styles.Preview}>
          {totalElements.map((element) => (
            <Preview image={element.image} />
          ))}
          {!expanded && elements.length > 5 && (
            <div className={styles.Placeholder}>
              {`+${elements.length - visibleElements.length}`}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
