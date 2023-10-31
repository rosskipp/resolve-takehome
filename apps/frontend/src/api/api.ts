import { ApiEntity } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const getEntityById = async (id: number): Promise<{ data: ApiEntity | null, error: Error | null; }> => {
  try {
    const url = `${API_URL}/api/entity/${id}`;
    console.log(url);
    const res = await fetch(url);
    return {
      data: await res.json() as unknown as ApiEntity,
      error: null
    };
  } catch (error) {
    console.error(error);
    return {
      data: null,
      error: error as Error
    };
  }
};