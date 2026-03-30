import "dotenv/config";
import pool from "../database.js";
import { employees } from "../schema/employee.js";
import { departments } from "../schema/department.js";
import { employeeDepartments } from "../schema/employee-department.js";
import { titles } from "../schema/title.js";
import { reset, seed } from "drizzle-seed";
import { faker } from "@faker-js/faker";

const run = async () => {
  //Remove any existing data from the database
  await pool.delete(employeeDepartments);
  await pool.delete(titles);
  await pool.delete(employees);
  await pool.delete(departments);

  //Seed base tables
  await seed(pool, { employees }).refine((f) => ({
    employees: {
      columns: {
        firstName: f.firstName(),
        lastName: f.lastName(),
        hireDate: f.datetime(),
      },
      count: 50,
    },
  }));

  await seed(pool, { departments }).refine((f) => ({
    departments: {
      columns: {
        name: f.string(),
      },
      count: 5,
    },
  }));

  //Relational tables
  const allEmployees = await pool.select().from(employees);
  const allDepartments = await pool.select().from(departments);

  const employeeDepartmentRows = allEmployees.flatMap((emp) => {
    //It flattens the result of the callback by 1 level
    const shuffled = [...allDepartments].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, faker.number.int({ min: 1, max: 3 }));

    return selected.map((dep) => ({
      employeeId: emp.id,
      departmentId: dep.id,
    }));
  });

  console.log("data: ", employeeDepartmentRows);

  await pool.insert(employeeDepartments).values(employeeDepartmentRows);

  const titleRows = allEmployees.flatMap((emp) => {
    const count = faker.number.int({ min: 1, max: 3 });

    return Array.from({ length: count }).map(() => ({
      employeeId: emp.id,
      title: faker.person.jobTitle(),
      creationDate: faker.date.past(),
    }));
  });

  await pool.insert(titles).values(titleRows);
};

run()
  .catch((err) => {
    console.log("Seed failed: ", err);
  })
  .finally(() => {
    process.exit(1);
  });
