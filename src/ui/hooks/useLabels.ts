import { useState } from "react";

import { Element } from "@ui/models/element.model";
import { Label } from "@ui/models/label.model";
import { uuid } from "@ui/utils/uuid.util";

export const useLabels = () => {
  const [label, setLabel] = useState("");
  const [labels, setLabels] = useState<Label[]>([]);

  const addLabel = (name: string, elements: Element[]) => {
    if (!label) return;

    const newLabel: Label = {
      id: uuid(),
      name,
      elements,
    };

    const newLabels: Label[] = [...labels, newLabel];

    setLabels(newLabels);
    setLabel("");
  };

  const removeLabel = (id: string) => {
    const updatedLabels = labels.filter((label) => label.id !== id);
    setLabels(updatedLabels);
  };

  const isExist = (name: string) => labels.find((label) => label.name === name);

  const renameLabel = (id: string, name: string) => {
    const label = isExist(name);

    if (label) return;

    const updatedLabels = labels.map((label) =>
      label.id === id ? { ...label, name } : label
    );

    setLabels(updatedLabels);
  };

  return {
    label,
    labels,
    setLabel,
    addLabel,
    removeLabel,
    renameLabel,
  };
};
