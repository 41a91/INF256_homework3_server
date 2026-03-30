import { Many, relations } from "drizzle-orm";
import { mysqlTable, serial, varchar, datetime } from "drizzle-orm/mysql-core";
import { titles } from "./title.js";
import { employeeDepartments } from "./employee-department.js";

export const employees = mysqlTable("employees_table", {
  id: serial().primaryKey(),
  firstName: varchar("first_name", { length: 25 }).notNull(),
  lastName: varchar("last_name", { length: 25 }).notNull(),
  hireDate: datetime("hire_date").notNull(),
});

export const employeesRelations = relations(employees, ({ many }) => ({
  titles: many(titles),
  employeeDepartments: many(employeeDepartments),
}));
