import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { modulesTable } from "./modules";

export const resourcesTable = pgTable("resources", {
  id: serial("id").primaryKey(),
  moduleId: integer("module_id").notNull().references(() => modulesTable.id),
  type: text("type").notNull(), // book, video, film, podcast, website, essay
  title: text("title").notNull(),
  author: text("author"),
  url: text("url"),
  description: text("description"),
  isFree: boolean("is_free").notNull().default(false),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const insertResourceSchema = createInsertSchema(resourcesTable).omit({ id: true });
export type InsertResource = z.infer<typeof insertResourceSchema>;
export type Resource = typeof resourcesTable.$inferSelect;
