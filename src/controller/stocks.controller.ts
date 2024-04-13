import { Request, Response, NextFunction } from "express";
import { prisma } from "../utils/db";

// Testing stocks controller

const testStocksController = async (req: Request, res: Response) => {
  res.json({ message: "Stock Controller Running" });
};

// Create a Stock Sheets POST REQUEST

const createStocksSheets = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { length, width, qty } = req.body;
  try {
    // const panel = await prisma.stock_Sheets.create({
    //   data: {
    //     length,
    //     width,
    //     qty,
    //   },
    // });
    // res.json(panel);
  } catch (error) {
    console.log("error", error);
    next(error);
  }
};

export default { createStocksSheets, testStocksController };
