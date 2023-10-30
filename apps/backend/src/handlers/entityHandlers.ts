import sqlite3 from 'sqlite3';

const sqliteFile = '/db.sqlite';

export const getEntityById = async (id: number) => {
  console.log('hit getEntities');
  return [];
  // const db = new sqlite3.Database('./db.sqlite');
  // const entities = await new Promise((resolve, reject) => {
  //   db.all('SELECT * FROM entities', (err, rows) => {
  //     if (err) reject(err);
  //     resolve(rows);
  //   });
  // });
  // return entities;
};