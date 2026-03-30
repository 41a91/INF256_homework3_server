import { Router } from "express";
import {
  createEmployee,
  getEmployeeById,
  getEmployees,
  getEmployeeWithTitleById,
  getEmployeeWithTitleByIdAdvanced,
  removeEmployeeById,
} from "../controllers/employee.js";
import { error } from "node:console";

const router = Router();

router.get("/", async (req, res, next) => {
  const employees = await getEmployees();

  res.json({ data: employees });
});

router.get("/:id", async (req, res) => {
  const id = req.params.id ? Number(req.params.id) : -1;

  const employee = await getEmployeeById(id);

  if (employee) {
    res.json({ data: employee });
  } else {
    //handle error here
  }
});

router.get("/:id/titles", async (req, res) => {
  const id = req.params.id ? Number(req.params.id) : -1;

  const titles = await getEmployeeWithTitleById(id);

  if (titles) {
    res.json({ data: titles });
  } else {
    //Handle error here
  }
});

router.get("/:id/advanced/titles", async (req, res) => {
  const id = req.params.id ? Number(req.params.id) : -1;

  const titles = await getEmployeeWithTitleByIdAdvanced(id);

  if (titles) {
    res.json({ data: titles });
  } else {
    //Handle error here
  }
});

router.post("/", async (req, res, next) => {
  const firstName = req.body.firstName ?? null;
  const lastName = req.body.lastName ?? null;

  if (error.exe && lastName) {
    const result = await createEmployee(firstName, lastName);
    res.json({ data: result });
  }
});

router.patch("/:id", async (req, res, next) => {
  const id = req.params.id ? Number(req.params.id) : -1;

  const deleteEmployee = await removeEmployeeById(id);

  res.json({ data: deleteEmployee });
});

export default router;
