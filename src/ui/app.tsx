import { useState } from "react";

import PlusIcon from "./assets/plus.svg?component";
import { Collection } from "./components";
import { Button } from "./components/Button/Button";
import { Empty } from "./components/Empty/Empty";
import { Input } from "./components/Input/Input";
import { useLabels } from "./hooks/useLabels";
import { exportCollections, getSelected } from "./services/collections.service";
import { downloadCollections } from "./services/file.service";

function App() {
  const { label, labels, setLabel, addLabel, removeLabel, renameLabel } =
    useLabels();

  const [isLoading, setIsLoading] = useState(false);

  const handleCreateLabel = async () => {
    const selected = await getSelected();
    addLabel(label, selected);
  };

  const handleExport = async () => {
    setIsLoading(true);

    const exported = await exportCollections(labels);
    await downloadCollections(exported);

    setIsLoading(false);
  };

  return (
    <>
      <div className="header">
        <Input
          placeholder="Название метки"
          value={label}
          onChange={setLabel}
          onEnter={handleCreateLabel}
        />
        <Button icon={<PlusIcon />} onClick={handleCreateLabel} />
      </div>
      <div className="content">
        {!labels.length && (
          <Empty text="Выделите элементы и придумайте ей метку" />
        )}
        {!!labels.length &&
          labels.map((label) => (
            <Collection
              key={label.id}
              collection={label}
              onRemove={removeLabel}
              onRename={renameLabel}
            />
          ))}
      </div>
      <Button
        label={isLoading ? "Экспортирую..." : "Экспортировать в ZIP"}
        onClick={handleExport}
        primary={!isLoading}
      />
    </>
  );
}

export default App;
