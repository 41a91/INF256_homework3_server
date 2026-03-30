import { relations } from "drizzle-orm";
import { mysqlTable, serial, varchar } from "drizzle-orm/mysql-core";
import { employeeDepartments } from "./employee-department.js";

export const departments = mysqlTable("departments_table", {
  id: serial().primaryKey(),
  name: varchar({ length: 40 }).notNull(),
});

export const departmentsRelations = relations(departments, ({ many }) => ({
  employeeDepartments: many(employeeDepartments),
}));
