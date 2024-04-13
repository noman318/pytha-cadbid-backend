import { Request, Response } from "express";
import { prisma } from "../utils/db";

const getAllCompany = async (req: Request, res: Response) => {
  const { name } = req.query;
  console.log("name", name);
  if (typeof name !== "string") {
    return res
      .status(400)
      .json({ error: "Name parameter is missing or invalid" });
  } else if (name === "") {
    const companies = await prisma.mcompany.findMany({
      where: {
        sName: {
          startsWith: name,
        },
      },
      select: {
        sName: true,
        nCompanyID: true,
      },
      skip: 0,
      take: 5,
      orderBy: {
        nCompanyID: "asc",
      },
    });
    return res.json(companies);
  }
  try {
    const allCompanyNames = await prisma.mcompany.findMany({
      where: {
        sName: {
          startsWith: name,
        },
      },
      select: {
        sName: true,
        nCompanyID: true,
      },
      skip: 0,
    });
    res.json(allCompanyNames);
  } catch (error) {
    console.error("Error fetching company names:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getSingleCompany = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const company = await prisma.mcompany.findUnique({
      where: { nCompanyID: +id },
    });
    if (!company) {
      return res.json({ message: "No Company found with this ID" });
    }
    return res.json(company);
  } catch (error) {
    console.log("error", error);
  }
};

const createCompany = async (req: Request, res: Response) => {
  console.log("req.body", req.body);
  const { sName, sAddr1, sCompanyKey, nPackageMasterID } = req.body;
  try {
    const company = await prisma.mcompany.create({
      data: {
        sName: "Pytha India",
        sAddr1: "Mumbai",
        sCompanyKey: "HK221",
        nPackageMasterID: 1,
      },
    });
    return res.json(company);
  } catch (error) {
    console.log("error", error);
  }
};

export default { getAllCompany, createCompany, getSingleCompany };
