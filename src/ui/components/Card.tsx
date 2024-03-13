import { useState } from "react";

import { Label } from "@ui/models/label.model";

import ChevronDownIcon from "../assets/chevron-down.svg?component";
import ChevronRightIcon from "../assets/chevron-right.svg?component";
import CrossIcon from "../assets/cross.svg?component";
import { Button } from "./Button";
import { Input } from "./Input";

import "./Card.css";

type Props = {
  label: Label;
  onRename?: (id: string, newName: string) => void;
  onRemove?: (id: string) => void;
};

export const Card = ({ label, onRename, onRemove }: Props) => {
  const [expanded, setExpanded] = useState(false);

  const visibleElements = label.elements.slice(0, 4);

  const elements = expanded ? label.elements : visibleElements;

  const handleRemove = () => {
    onRemove && onRemove(label.id);
  };

  const handleRename = (value: string) => {
    onRename && onRename(label.id, value);
  };

  return (
    <div className="card">
      <div className="label">
        <Button
          icon={expanded ? <ChevronDownIcon /> : <ChevronRightIcon />}
          onClick={() => setExpanded((e) => !e)}
        />
        <Input
          value={label.name}
          placeholder={label.name}
          onBlur={handleRename}
          transparent
        />
        <Button icon={<CrossIcon />} onClick={handleRemove} />
      </div>
      {!!label.elements.length && (
        <div className="previews">
          {elements.map((element) => (
            <img className="previews__image" src={element.image} />
          ))}
          {!expanded && label.elements.length > 4 && (
            <div className="previews__placeholder">
              {`+${label.elements.length - visibleElements.length}`}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
