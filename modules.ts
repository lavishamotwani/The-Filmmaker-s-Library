import { pgTable, text, serial, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { phasesTable } from "./phases";

export const modulesTable = pgTable("modules", {
  id: serial("id").primaryKey(),
  phaseId: integer("phase_id").notNull().references(() => phasesTable.id),
  title: text("title").notNull(),
  description: text("description").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const insertModuleSchema = createInsertSchema(modulesTable).omit({ id: true });
export type InsertModule = z.infer<typeof insertModuleSchema>;
export type Module = typeof modulesTable.$inferSelect;
