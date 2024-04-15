import { Request, Response, NextFunction } from "express";
import { prisma } from "../utils/db";
import { Session } from "express-session";
import bcryptjs from "bcryptjs";
const createUser = async (req: Request, res: Response) => {
  // console.log("req.body", req.body);
  const {
    name,
    email,
    mobile,
    user_id,
    password,
    user_type,
    level,
    company_id,
    otp_auth,
  } = req.body;
  const sName = name;
  const sEmail = email;
  const sMobile = mobile;
  const sUserName = user_id;
  const sPassword = password;
  const sUserType = user_type;
  const sLevel = level;
  const sOtpAuth = otp_auth;
  const nCompanyID = company_id;
  try {
    let company = await prisma.mcompany.findUnique({
      where: { nCompanyID: +nCompanyID },
    });

    if (!company) {
      company = await prisma.mcompany.create({
        data: {
          sName: sUserName,
          sAddr1: "Mumbai",
          sCompanyKey: "NKSSW123",
          nPackageMasterID: 2,
        },
      });
    }
    const hashedPassword = await bcryptjs.hash("123456", 10);
    const user = await prisma.muser.create({
      data: {
        sName,
        sEmail,
        sMobile,
        sUserName,
        sUserType,
        sPassword: hashedPassword,
        sOtpAuth,
        sLevel,
        nCompanyID: company?.nCompanyID || +nCompanyID,
      },
    });
    return res.json(user);
  } catch (error) {
    console.log("error", error);
  }
};

// const getAllUsers = async (req: Request, res: Response) => {
//   try {
//     const page = parseInt(req.query.page as string) || 1;
//     const perPage = parseInt(req.query.perPage as string) || 10;
//     const skip = (page - 1) * perPage;
//     const allUsers = await prisma.muser.findMany({
//       // include: {
//       //   mcompany: true,
//       // },
//       skip,
//       take: perPage,
//       select: {
//         sName: true,
//         sEmail: true,
//         sLevel: true,
//         sMobile: true,
//         sUserName: true,
//         sUserType: true,
//         mcompany: {
//           select: {
//             sName: true,
//           },
//         },
//       },
//     });
//     res.json(allUsers);
//   } catch (error) {
//     console.log("error", error);
//   }
// };
const getAllUsers = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const perPage = parseInt(req.query.perPage as string) || 10;
    const skip = (page - 1) * perPage;

    const allUsers = await prisma.muser.findMany({
      skip,
      take: perPage,
      select: {
        nCompanyID: true,
        sName: true,
        sEmail: true,
        sLevel: true,
        sMobile: true,
        sUserName: true,
        sUserType: true,
      },
    });

    // Map users to rename nCompanyID to id
    const mappedUsers = allUsers.map((user) => ({
      id: user.nCompanyID.toString(),
      ...user,
      // Remove the nCompanyID field
      nCompanyID: undefined,
    }));

    res.json({ users: mappedUsers });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await prisma.muser.findUnique({ where: { nUserID: +id } });
  res.json(user);
};
// const getUserById = async (nEmailUserID: string) => {
//   try {
//     const userId = parseInt(nEmailUserID);
//     const user = await prisma.memailuser.findUnique({
//       where: { nEmailUserID: userId },
//     });

//     return user;
//   } catch (error) {
//     return error;
//   }
// };
// const user = getUserById("1");
// console.log("user", user);

interface CustomRequest extends Request {
  session: Session & { user?: any }; // Make sure session property matches Session type
}
// const loginUser = async (req: CustomRequest, res: Response) => {
//   try {
//     console.log("req.body", req.body);
//     const { email } = req.body;
//     console.log("email", email);

//     // const userData = await prisma.user.findMany({});
//     // console.log("userData", userData);
//     // if (userData) {
//     //   res.json({ message: "found" });
//     // }
//     // res.json({ message: "Not Found" });
//     return;
//     //@ts-expect-error

//     const existingUser = await getUserById(user.nEmailUserID!.toString());
//     //@ts-expect-error
//     if (!existingUser || existingUser.bEmailVerified === 0) {
//       return res.status(401).json({ message: "Unauthorized" });
//     }
//     req.session.user = existingUser;
//     return res.status(200).json({ success: true });
//   } catch (error) {
//     console.error("Error processing login:", error);
//     return res.status(500).json({ message: "Internal Server Error" });
//   }
// };

export default {
  createUser,
  getAllUsers,
  getSingleUser,
};
