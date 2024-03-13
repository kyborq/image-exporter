import { format } from "date-fns";
import { saveAs } from "file-saver";
import JSZip from "jszip";
import { useState } from "react";

import { NetworkMessages } from "@common/network/messages";

import PlusIcon from "./assets/plus.svg?component";
import { Button } from "./components/Button";
import { Card } from "./components/Card";
import { Empty } from "./components/Empty";
import { Input } from "./components/Input";
import { useLabels } from "./hooks/useLabels";
import { Exported } from "./models/exported.model";
import { uuid } from "./utils/uuid.util";

function App() {
  const { label, labels, setLabel, addLabel, removeLabel, renameLabel } =
    useLabels();

  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const toPreview = (bytes: Uint8Array) => {
    const url = URL.createObjectURL(
      new Blob([bytes.buffer], { type: "image/png" })
    );
    return url;
  };

  const addToZip = async (name: string, exported: Exported[]) => {
    const zip = new JSZip();

    const zipOptions: JSZip.JSZipGeneratorOptions = {
      type: "blob",
      compression: "DEFLATE",
      compressionOptions: {
        level: 6,
      },
    };

    exported.forEach((frame, index) => {
      zip.file(
        `${frame.folderName}/${index}_${frame.fileName}_${uuid()}.png`,
        frame.bytes
      );
    });

    const content = await zip.generateAsync(zipOptions, (metadata) => {
      setProgress(metadata.percent);

      if (metadata.percent === 100) {
        setIsLoading(false);
      }
    });

    saveAs(content as any, name);
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
    setIsLoading(true);

    const res: Exported[] = await NetworkMessages.EXPORT.request(labels);

    const date = new Date();
    const today = format(date, "HH:mm:ss");

    addToZip(`Exported_${today}`, res);
  };

  const progressText = `${progress.toFixed(0)}%`;

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
      <Button
        label={isLoading ? progressText : "Экспортировать"}
        onClick={handleExport}
        primary={!isLoading}
      />
    </>
  );
}

export default App;
