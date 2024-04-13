// import { Request, Response, NextFunction } from "express";
// import { prisma } from "../utils/db";

// // Testing Panel controller

// const serviceControllerTest = async (req: Request, res: Response) => {
//   res.json({ message: "Panel Controller Running" });
// };

// // Create a panel POST REQUEST

// const createService = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   // console.log("calling Create");
//   console.log("req.body", req.body);
//   const {
//     length,
//     width,
//     qty,
//     stockSheet: stockSheetData,
//     panelLength,
//     panelWidth,
//     panelQty,
//   } = req.body;
//   try {
//     // Create the stock sheet
//     // const stockSheet = await prisma.stock_Sheets.create({
//     //   data: {
//     //     length,
//     //     width,
//     //     qty,
//     //   },
//     // });
//     // console.log("stockSheet", stockSheet);
//     // Create the panel and connect it to the created stock sheet
//     // const panel = await prisma.panel.create({
//     //   data: {
//     //     panelLength,
//     //     panelWidth,
//     //     panelQty,
//     //     stockSheet: {
//     //       connect: { id: stockSheet.id },
//     //     },
//     //   },
//     // });
//     // console.log("panel", panel);
//     // // Return both the created stock sheet and panel
//     // res.json({ stockSheet, panel });
//   } catch (error) {
//     console.log("error", error);
//     next(error);
//   }
// };

// const createServiceMaster = async (req: Request, res: Response) => {
//   // console.log("req.body", req.body);
//   const {
//     service_name,
//     company_name,
//     services_offered,
//     service_type,
//     service_rate,
//     service_status,
//   } = req.body;
//   try {
//     const service = await prisma.mservicermasternew.create({
//       data: {
//         sServiceName: service_name,
//         nCompanyID: company_name,
//         sServicesOffered: services_offered,
//         sServiceType: service_type,
//         nServiceRate: service_rate,
//         sActive: service_status,
//       },
//     });
//     return res.json(service);
//   } catch (error) {
//     console.log("error", error);
//   }
// };

// const getAllServices = async (req: Request, res: Response) => {
//   try {
//     const allServices = await prisma.mservicermasternew.findMany({
//       orderBy: {
//         nServiceId: "asc",
//       },
//       select: {
//         nServiceId: true,
//         sServiceName: true,
//         sServicesOffered: true,
//         sServiceType: true,
//         nServiceRate: true,
//         sActive: true,
//         nCompanyID: true,
//       },
//     });
//     return res.json(allServices);
//   } catch (error) {
//     console.log("error", error);
//   }
// };

// const getSingleService = async (req: Request, res: Response) => {
//   const { id } = req.params;
//   // console.log("id", id);
//   try {
//     const service = await prisma.mservicename.findUnique({
//       where: {
//         nserviceId: +id,
//       },
//     });
//     // console.log("service", service);
//     if (!service) {
//       return res.json({ message: "No service with this ID found" });
//     }

//     return res.json(service);
//   } catch (error) {
//     console.log("error", error);
//   }
// };

// export default {
//   createServiceMaster,
//   serviceControllerTest,
//   getAllServices,
//   getSingleService,
// };
