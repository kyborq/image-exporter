import CrossIcon from "./assets/cross.svg?component";
import PlusIcon from "./assets/plus.svg?component";
import { Button } from "./components/Button";
import { Empty } from "./components/Empty";
import { Input } from "./components/Input";
import { useLabels } from "./hooks/useLabels";

function App() {
  const { label, labels, setLabel, addLabel, removeLabel, renameLabel } =
    useLabels();

  const handleCreateLabel = () => {
    addLabel(label, []);
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
          labels.map((label) => {
            return (
              <div className="label">
                <Input
                  value={label.name}
                  placeholder={label.name}
                  onBlur={(value) => {
                    renameLabel(label.id, value || label.name);
                  }}
                  transparent
                />
                <Button
                  icon={<CrossIcon />}
                  onClick={() => removeLabel(label.id)}
                />
              </div>
            );
          })}
      </div>
      <Button label="Экспортировать" primary />
    </>
  );
}

export default App;
