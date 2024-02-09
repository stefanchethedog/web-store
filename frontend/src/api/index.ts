const BASE_URL = "http://localhost:5555";

// SCHEMAS SECTION
const SCHEMAS_BASE = `${BASE_URL}/schema`;

const GET_ALL_SCHEMAS = `${SCHEMAS_BASE}`;
const GET_SCHEMA_BY_ID = (id: String) => `${SCHEMAS_BASE}/${id}`;
const GET_SCHEMA_BY_NAME = (name: String) =>
  `${SCHEMAS_BASE}/get-by-name/${name}`;
const GET_ALL_SCHEMA_NAMES = `${SCHEMAS_BASE}/get-all-schema-names`;
const GET_SCHEMA_INTERFACE = `${SCHEMAS_BASE}/get-schemas-interface`;

const UPDATE_SCHEMA_BY_ID = (id: String) => `${SCHEMAS_BASE}/${id}`;
const UPDATE_SCHEMA_BY_NAME = (name: String) =>
  `${SCHEMAS_BASE}/update-by-name/${name}`;

const DELETE_SCHEMA_BY_ID = (id: String) => `${SCHEMAS_BASE}/${id}`;
const DELETE_SCHEMA_BY_NAME = (name: String) =>
  `${SCHEMAS_BASE}/delete-by-name/${name}`;

const CREATE_SCHEMA = `${SCHEMAS_BASE}`;


// ITEMS SECTION

const ITEMS_BASE = `${BASE_URL}/items`;

const GET_ALL_ITEMS_FROM_SCHEMAS = `${ITEMS_BASE}/get-items-by-schemas`;

export {
  GET_ALL_SCHEMAS,
  CREATE_SCHEMA,
  DELETE_SCHEMA_BY_ID,
  DELETE_SCHEMA_BY_NAME,
  GET_SCHEMA_BY_ID,
  GET_SCHEMA_BY_NAME,
  UPDATE_SCHEMA_BY_ID,
  UPDATE_SCHEMA_BY_NAME,
  GET_ALL_SCHEMA_NAMES,
  GET_SCHEMA_INTERFACE,

  GET_ALL_ITEMS_FROM_SCHEMAS
};
