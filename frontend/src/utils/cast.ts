export default function cast(value: any, type: string) {
  switch (type.toLowerCase()) {
    case 'string':
      return value as string;
    case 'number':
      return parseFloat(value);
    default:
      return value;
  }
}
