import pool from "../db/database.js";
import { eq } from "drizzle-orm";
import { employees } from "../db/schema/employee.js";
import { titles } from "../db/schema/title.js";
import { type EmployeeWithTitles } from "../types/employee.js";

export const getEmployees = async () => {
  const result = await pool.query.employees.findMany({});

  return result;
};

export const getEmployeeById = async (id: number) => {
  const employee = await pool
    .select()
    .from(employees)
    .where(eq(employees.id, id));

  return employee.length > 0 && employee[0] ? employee[0] : null;
};

export const getEmployeeWithTitleById = async (id: number) => {
  const result = await pool
    .select({
      employeeId: employees.id,
      employeeFirstName: employees.firstName,
      employeeLastName: employees.lastName,
      titleId: titles.id,
      title: titles.title,
    })
    .from(employees)
    .leftJoin(titles, eq(employees.id, titles.employeeId))
    .where(eq(employees.id, id));

  const map = new Map<number, EmployeeWithTitles>();

  for (const row of result) {
    if (!map.has(row.employeeId)) {
      map.set(row.employeeId, {
        id: row.employeeId,
        name: row.employeeFirstName + " " + row.employeeLastName,
        titles: [],
      });
    }

    if (row.titleId) {
      map.get(row.employeeId)?.titles.push({
        id: row.titleId,
        title: row.title ? row.title : "",
      });
    }
  }

  const employeeData = Array.from(map.values());

  return employeeData.length > 0 && employeeData[0] ? employeeData[0] : null;
};

export const getEmployeeWithTitleByIdAdvanced = async (id: number) => {
  const result = await pool.query.employees.findFirst({
    where: (employees, { eq }) => eq(employees.id, id),
    with: {
      titles: true,
    },
  });

  return result ? result : null;
};

export const createEmployee = async (firstName: string, lastName: string) => {
  const result = await pool
    .insert(employees)
    .values({ firstName, lastName, hireDate: new Date() });

  return result[0] && result[0].affectedRows > 0 ? true : false;
};

export const removeEmployeeById = async (id: number) => {
  const result = await pool.delete(employees).where(eq(employees.id, id));

  return result[0] && result[0].affectedRows > 0 ? true : false;
};
