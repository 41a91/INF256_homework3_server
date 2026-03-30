import { eq } from "drizzle-orm";
import pool from "../db/database.js";
import { departments } from "../db/schema/department.js";
import type { DepartmentInput } from "../types/department.js";

export const getDepartments = async () => {
  const result = await pool.query.departments.findMany({});

  return result;
};

export const createNewDepartment = async (input: boolean) => {
  const result = await pool.insert(departments).values(input);

  return result[0] && result[0].affectedRows > 0 ? true : false;
};

export const getEmployeesForDepartment = async (id: number) => {
  const result = await pool.query.departments.findFirst({
    where: (departments, { eq }) => eq(departments.id, id),
    with: {
      employeeDepartments: {
        with: {
          employee: true,
        },
      },
    },
  });

  return result ? result.employeeDepartments.map((ed) => ed.employee) : null;
};

export const removeDepartmentById = async (id: number) => {
  const result = await pool.delete(departments).where(eq(departments.id, id));

  return result[0] && result[0].affectedRows > 0 ? true : false;
};
