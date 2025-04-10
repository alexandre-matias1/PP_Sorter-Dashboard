import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "path";


export async function openDb() {
  const dbPath = path.join(process.cwd(), "database.db");

  return await open({
    filename: dbPath,
    driver: sqlite3.Database,
  });
}
