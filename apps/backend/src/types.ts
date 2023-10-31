export interface DBEntityRow {
  entity_id: number;
  attribute_id: number;
  value_id: number;
  name: string;
  category: string;
  data_type: number;
  flags: number;
  value: string;
}

export interface PropertyValues {
  [key: string]: string,
}

export interface PropertyGroup {
  [key: string]: PropertyValues;
}

export interface ApiEntity {
  entityId: number,
  name: string,
  properties: PropertyGroup;
}