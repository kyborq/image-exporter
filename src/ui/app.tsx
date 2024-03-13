import { NetworkMessages } from "@common/network/messages";

import PlusIcon from "./assets/plus.svg?component";
import { Button } from "./components/Button";
import { Card } from "./components/Card";
import { Empty } from "./components/Empty";
import { Input } from "./components/Input";
import { useLabels } from "./hooks/useLabels";

function App() {
  const { label, labels, setLabel, addLabel, removeLabel, renameLabel } =
    useLabels();

  const toPreview = (bytes: Uint8Array) => {
    const url = URL.createObjectURL(
      new Blob([bytes.buffer], { type: "image/png" })
    );
    return url;
  };

  const handleCreateLabel = async () => {
    const result = await NetworkMessages.SELECT.request({});

    const resultWithPreview = result.map((item) => ({
      ...item,
      image: toPreview(item.bytes),
    }));

    addLabel(label, resultWithPreview);
  };

  const handleExport = async () => {
    const res = await NetworkMessages.EXPORT.request(labels);
    console.log(res);
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
            <Card
              key={label.id}
              label={label}
              onRemove={removeLabel}
              onRename={renameLabel}
            />
          ))}
      </div>
      <Button label="Экспортировать" onClick={handleExport} primary />
    </>
  );
}

export default App;
