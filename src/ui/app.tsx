import { useState } from "react";

import { NetworkMessages } from "@common/network/messages";

import PlusIcon from "./assets/plus.svg?component";
import { Collection } from "./components";
import { Button } from "./components/Button/Button";
import { Empty } from "./components/Empty/Empty";
import { Input } from "./components/Input/Input";
import { useCollections } from "./hooks/useCollections";
import { useField } from "./hooks/useField";
import {
  exportCollections,
  getSelected,
  previewCollections,
} from "./services/collections.service";
import { downloadCollections } from "./services/file.service";

function App() {
  const { value, handleChange, clearValue } = useField();
  const {
    collections,
    createCollection,
    deleteCollection,
    renameCollection,
    deleteItem,
    setCollections,
  } = useCollections();

  const [isLoading, setIsLoading] = useState(false);

  const handleCreate = async () => {
    const selected = await getSelected();
    createCollection(value, selected);
    clearValue();
  };

  const handleExport = async () => {
    if (!collections.length) return;

    setIsLoading(true);

    const fulled = collections.filter(
      (collection) => !!collection.elements.length
    );
    const exported = await exportCollections(fulled);
    await downloadCollections(exported);

    setIsLoading(false);
  };

  const handleCenter = async () => {
    await NetworkMessages.CENTER.request({ collections });
    const newCollections = await previewCollections(collections);
    setCollections(newCollections);
  };

  const centerAndDownload = async () => {
    await handleCenter();
    await handleExport();
  };

  return (
    <>
      <div className="header">
        <Input
          placeholder="Название метки"
          value={value}
          onChange={handleChange}
          onEnter={handleCreate}
        />
        <Button icon={<PlusIcon />} onClick={handleCreate} />
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
        label={isLoading ? "Экспортирую..." : "Центрировать + Скачать"}
        onClick={centerAndDownload}
        primary={!isLoading}
      />
      <div className="footer">
        <Button label="Центрировать" onClick={handleCenter} />
        <Button label="Скачать" onClick={handleExport} />
      </div>
    </>
  );
}

export default App;
