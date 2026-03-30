import {
  mysqlTable,
  serial,
  int,
  varchar,
  datetime,
} from "drizzle-orm/mysql-core";
import { employees } from "./employee.js";
import { relations } from "drizzle-orm";

export const titles = mysqlTable("titles_table", {
  id: serial().primaryKey(),
  employeeId: int("employee_id")
    .references(() => employees.id)
    .notNull(),
  title: varchar({ length: 50 }).notNull(),
  creationDate: datetime("creation_date").notNull(),
});

export const titlesRelations = relations(titles, ({ one }) => ({
  employee: one(employees, {
    fields: [titles.employeeId],
    references: [employees.id],
  }),
}));
