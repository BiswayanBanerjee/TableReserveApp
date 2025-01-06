import { JwtPayload } from "jsonwebtoken";
import * as express from "express";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
      } | JwtPayload ;
    }
  }
}

export {};


// import { JwtPayload } from "jsonwebtoken";

// declare global {
//   namespace Express {
//     interface Request {
//       user?: {
//         id: string;
//         email: string;
//       };
//     }
//   }
// }

// export {};


