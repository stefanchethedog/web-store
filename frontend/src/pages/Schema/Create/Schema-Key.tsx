import { Select, TextField, MenuItem, FormControlLabel, Checkbox, Button, InputLabel, FormControl } from "@mui/material";

type Props = {
  name: string;
  type: string;
  required: boolean;
  index: number | string;
  onRemove: (index: number | string) => void;
  onPropChange: <T, >(keyName: string, propName: string, value: T) => void;
  availableSchemas?: string[];
}

//TODO: add object key type
const KEY_TYPES = ["number", "string", "schema"];

export default function SchemaKey({
  name, type, required, index, onPropChange, onRemove, availableSchemas
}: Props) {
  return (
    <div className="schema_key">
      <TextField
        type="text"
        label="Key name"
        name="name"
        value={name}
        onChange={(e) => onPropChange(name, "name", e.target.value)}
      >
      </TextField>
      <Select
        value={type.toLowerCase()}
        onChange={(e) => onPropChange(name, "type", e.target.value)}
      >
        {KEY_TYPES.map((type) => <MenuItem key={`${type}--${index}`} value={type}>{type}</MenuItem>)}
      </Select>
      {(availableSchemas && type == "schema") &&
        <>
          <FormControl>
            <InputLabel id="schemaLabel">Schema</InputLabel>
            <Select
              label="Schema"
              labelId="schemaLabel"
              sx={{
                minWidth: "100px"
              }}
            >
              {availableSchemas.map((name) => <MenuItem value={name}>{name}</MenuItem>)}
            </Select>
          </FormControl>
        </>
      }
      <FormControlLabel
        label="Required"
        control={
          <Checkbox checked={required} onChange={(e) => onPropChange(name, "required", e.target.checked)}></Checkbox>
        }
      />
      <Button variant="contained" onClick={() => onRemove(index)}>Remove</Button>
    </div>
  );
}
