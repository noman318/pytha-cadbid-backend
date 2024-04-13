import { Router } from "express";
import companyController from "../controller/company.controller";

const router = Router();

router
  .route("/")
  .get(companyController.getAllCompany)
  .post(companyController.createCompany);

router.route("/:id").get(companyController.getSingleCompany);

export default router;
