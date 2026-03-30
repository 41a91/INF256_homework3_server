import { mysqlTable, int, primaryKey } from "drizzle-orm/mysql-core";
import { employees } from "./employee.js";
import { departments } from "./department.js";
import { relations } from "drizzle-orm";

export const employeeDepartments = mysqlTable(
  "employee_department_table",
  {
    employeeId: int("employee_id")
      .references(() => employees.id)
      .notNull(),
    departmentId: int("department_id")
      .references(() => departments.id)
      .notNull(),
  },
  (table) => [primaryKey({ columns: [table.departmentId, table.employeeId] })], //Sets up a composite primary key so indexing is used
);

export const employeeDepartmentsRelations = relations(
  employeeDepartments,
  ({ one }) => ({
    employee: one(employees, {
      fields: [employeeDepartments.employeeId],
      references: [employees.id],
    }),
    department: one(departments, {
      fields: [employeeDepartments.departmentId],
      references: [departments.id],
    }),
  }),
);
