import { useState } from "react";

import PlusIcon from "./assets/plus.svg?component";
import { Collection } from "./components";
import { Button } from "./components/Button/Button";
import { Empty } from "./components/Empty/Empty";
import { Input } from "./components/Input/Input";
import { useCollections } from "./hooks/useCollections";
import { useField } from "./hooks/useField";
import { exportCollections, getSelected } from "./services/collections.service";
import { downloadCollections } from "./services/file.service";

function App() {
  const { value, handleChange, clearValue } = useField();
  const {
    collections,
    createCollection,
    deleteCollection,
    renameCollection,
    deleteItem,
  } = useCollections();

  const [isLoading, setIsLoading] = useState(false);

  const handleCreateLabel = async () => {
    const selected = await getSelected();
    createCollection(value, selected);
    clearValue();
  };

  const handleExport = async () => {
    setIsLoading(true);

    const exported = await exportCollections(collections);
    await downloadCollections(exported);

    setIsLoading(false);
  };

  return (
    <>
      <div className="header">
        <Input
          placeholder="Название метки"
          value={value}
          onChange={handleChange}
          onEnter={handleCreateLabel}
        />
        <Button icon={<PlusIcon />} onClick={handleCreateLabel} />
      </div>
      <div className="content">
        {!collections.length && (
          <Empty text="Выделите элементы и придумайте ей метку" />
        )}
        {!!collections.length &&
          collections.map((collection) => (
            <Collection
              key={collection.id}
              collection={collection}
              onRemove={deleteCollection}
              onRename={renameCollection}
              onRemoveItem={deleteItem}
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
