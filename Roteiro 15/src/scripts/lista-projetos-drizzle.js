import { db } from "../database/db.js";
import { projetos } from "../database/schema.js";
import { asc } from "drizzle-orm";

async function listarProjetos() {
  const resultado = await db
    .select()
    .from(projetos)
    .orderBy(asc(projetos.id));

  console.table(resultado);
}

listarProjetos()
  .catch(console.error)
  .finally(() => process.exit());