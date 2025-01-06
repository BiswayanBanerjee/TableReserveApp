// import { Request, Response, NextFunction } from "express";
// import jwt, { JwtPayload } from "jsonwebtoken";
// import { UserPayload } from "../types/UserPayload";

// export const authenticate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//   const token = req.header("Authorization")?.split(" ")[1];

//   if (!token) {
//     res.status(401).json({ message: "Access denied" });
//     return;
//   }

//   try {
//     const verified = jwt.verify(token, process.env.JWT_SECRET || "") as JwtPayload;
//     req.user = verified; // Attach user info to the request object
//     next();
//   } catch (error) {
//     res.status(400).json({ message: "Invalid token" });
//   }
// };

import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export const authenticate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Access denied" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "") as JwtPayload;

    // Use a type assertion to add `user` dynamically
    (req as any).user = { id: decoded.id, email: decoded.email }; 
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token" });
  }
};




