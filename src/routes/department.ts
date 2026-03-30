import type { Router } from "express";
import {
  createNewDepartment,
  getDepartments,
  getEmployeesForDepartment,
  removeDepartmentById,
} from "../controllers/department.js";

const router = Router();

router.get("/", async (req, res, next) => {
  const departments = await getDepartments();

  res.json({ data: departments });
});

router.get("/:id/employees", async (req, res, next) => {
  const id = req.params.id ? Number(req.params.id) : -1;

  const employees = await getEmployeesForDepartment(id);

  if (employees) {
    res.json({ data: employees });
  } else {
    //Handle error here
  }
});

router.post("/", async (req, res, next) => {
  const name = req.body.name ? req.body.name : null;

  if (name) {
    const department = await createNewDepartment({ name });
    if (department) {
      res.json({ data: department });
    } else {
      //Handle error here
    }
  } else {
    //Handle error here
  }
});

router.delete("/:id", async (req, res, next) => {
  const id = req.params.id ? Number(req.params.id) : -1;

  const deleteDepartment = await removeDepartmentById(id);

  res.json({ data: deleteDepartment });
});

export default router;
