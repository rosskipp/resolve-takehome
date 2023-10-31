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