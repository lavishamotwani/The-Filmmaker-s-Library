import { pgTable, text, serial, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { coursesTable } from "./courses";

export const phasesTable = pgTable("phases", {
  id: serial("id").primaryKey(),
  courseId: integer("course_id").notNull().references(() => coursesTable.id),
  title: text("title").notNull(),
  description: text("description").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const insertPhaseSchema = createInsertSchema(phasesTable).omit({ id: true });
export type InsertPhase = z.infer<typeof insertPhaseSchema>;
export type Phase = typeof phasesTable.$inferSelect;
