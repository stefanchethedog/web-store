type Props = {
  name: string;
  type: string;
  required: boolean;
  index: number;
  onNameChange: (name: string, index: number) => void;
  onTypeChange: (type: string, index: number) => void;
  onRequiredChange: (value: boolean, index: number) => void;
  onRemove: (index: number) => void;
}

//TODO: add object key type
const KEY_TYPES = ["number", "string"];

export default function SchemaKey({
  name, type, required, index,
  onNameChange, onTypeChange, onRequiredChange, onRemove
}: Props) {
  return (
    <div className="schema_key">
      <input type="text" placeholder="Key name..." name="name" value={name} onChange={(e) => onNameChange(e.target.value, index)} />
      <select value={type} onChange={(e) => onTypeChange(e.target.value, index)}>
        {KEY_TYPES.map((type) => <option key={`${type}--${index}`} value={type}>{type}</option>)}
      </select>
      <input type="checkbox" checked={required} onChange={(e) => onRequiredChange(e.target.checked, index)} />
      <button onClick={() => onRemove(index)}>Remove</button>
    </div>
  );
}
