// import { Request, Response } from "express";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import { mysqlPool } from "../config/dbMySQL";
// import { generateOTP } from "../utils/otpGenerator";
// import { sendEmail } from "../utils/emailHelper";

// export const signup = async (req: Request, res: Response) => {
//   const { email, password } = req.body;

//   try {
//     const hashedPassword = await bcrypt.hash(password, 10);

//     await mysqlPool.query("INSERT INTO users (email, password) VALUES (?, ?)", [
//       email,
//       hashedPassword,
//     ]);

//     res.status(201).json({ message: "User registered successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Error signing up", error });
//   }
// };

// export const sendOTP = async (req: Request, res: Response) => {
//   const { email } = req.body;

//   try {
//     const otp = generateOTP();
//     await mysqlPool.query("INSERT INTO otps (email, otp) VALUES (?, ?)", [email, otp]);

//     await sendEmail(email, "Your OTP Code", `Your OTP is ${otp}`);
//     res.status(200).json({ message: "OTP sent successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Error sending OTP", error });
//   }
// };

// export const verifyOTP = async (req: Request, res: Response) => {
//   const { email, otp } = req.body;

//   try {
//     const [rows]: any = await mysqlPool.query(
//       "SELECT * FROM otps WHERE email = ? AND otp = ? AND TIMESTAMPDIFF(MINUTE, createdAt, NOW()) <= 5",
//       [email, otp]
//     );

//     if (rows.length === 0) {
//       res.status(400).json({ message: "Invalid or expired OTP" });
//       return;
//     }

//     res.status(200).json({ message: "OTP verified successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Error verifying OTP", error });
//   }
// };

// import { Request, Response } from "express";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import { mysqlPool } from "../config/dbMySQL";
// import { generateOTP } from "../utils/otpGenerator";
// import { sendEmail } from "../utils/emailHelper";

// export const signup = async (req: Request, res: Response) => {
//   const { email, password } = req.body;

//   try {
//     const hashedPassword = await bcrypt.hash(password, 10);

//     await mysqlPool.query("INSERT INTO users (email, password) VALUES (?, ?)", [
//       email,
//       hashedPassword,
//     ]);

//     res.status(201).json({ message: "User registered successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Error signing up", error });
//   }
// };

// export const login = async (req: Request, res: Response) => {
//   const { email, password } = req.body;





// import { Request, Response } from "express";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import { mysqlPool } from "../config/dbMySQL";
// import { generateOTP } from "../utils/otpGenerator";
// import { sendEmail } from "../utils/emailHelper";

// export const signup = async (req: Request, res: Response) => {
//   const { email, password, name, date_of_birth } = req.body;

//   try {
//     const hashedPassword = await bcrypt.hash(password, 10);

//     await mysqlPool.query(
//       "INSERT INTO users (email, password, name, date_of_birth) VALUES (?, ?, ?, ?)",
//       [email, hashedPassword, name, date_of_birth]
//     );

//     res.status(201).json({ message: "User registered successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Error signing up", error });
//   }
// };







import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { mysqlPool } from "../config/dbMySQL";
import { generateOTP } from "../utils/otpGenerator";
import { sendEmail } from "../utils/emailHelper";
import jwt from "jsonwebtoken";

// export const signup = async (req: Request, res: Response) => {
//   const { email, password, name, date_of_birth } = req.body;

//   try {
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const otp = generateOTP();

//     await mysqlPool.query(
//       "INSERT INTO unverified_users (email, password, name, date_of_birth, otp) VALUES (?, ?, ?, ?, ?)",
//       [email, hashedPassword, name, date_of_birth, otp]
//     );

//     await sendEmail(email, "Your OTP Code", `Your OTP code is ${otp}`);

//     res.status(201).json({ message: "OTP sent to email. Please verify to complete signup." });
//   } catch (error) {
//     res.status(500).json({ message: "Error signing up", error });
//   }
// };

export const signup = async (req: Request, res: Response) => {
  const { email, password, name, date_of_birth } = req.body;

  try {
    // Check if the email already exists in the users table
    const [registeredUser]: any = await mysqlPool.query("SELECT * FROM users WHERE email = ?", [email]);

    if (registeredUser.length > 0) {
      res.status(400).json({ message: "Email already registered. Please log in." });
      return;
    }

    // Check if the email already exists in the unverified_users table
    const [existingUser]: any = await mysqlPool.query("SELECT * FROM unverified_users WHERE email = ?", [email]);

    if (existingUser.length > 0) {
      // Generate a new OTP
      const otp = generateOTP();

      // Update the existing record with the new OTP
      await mysqlPool.query(
        "UPDATE unverified_users SET otp = ?, otp_created_at = NOW() WHERE email = ?",
        [otp, email]
      );

      // Resend the OTP email
      await sendEmail(email, "Your OTP Code", `Your OTP code is ${otp}`);

      res.status(200).json({ message: "OTP resent to email. Please verify to complete signup." });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = generateOTP();

    await mysqlPool.query(
      "INSERT INTO unverified_users (email, password, name, date_of_birth, otp) VALUES (?, ?, ?, ?, ?)",
      [email, hashedPassword, name, date_of_birth, otp]
    );

    await sendEmail(email, "Your OTP Code", `Your OTP code is ${otp}`);

    res.status(201).json({ message: "OTP sent to email. Please verify to complete signup." });
  } catch (error) {
    res.status(500).json({ message: "Error signing up", error });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const [rows]: any = await mysqlPool.query("SELECT * FROM users WHERE email = ?", [email]);

    if (rows.length === 0) {
      res.status(400).json({ message: "Invalid email or password" });
      return;
    }

    const user = rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      res.status(400).json({ message: "Invalid email or password" });
      return;
    }

    const token = jwt.sign({ id: user.id, email: user.email, name:user.name }, process.env.JWT_SECRET || "", {
      expiresIn: "1h",
    });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
};

export const sendOTP = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    const otp = generateOTP();
    await mysqlPool.query("INSERT INTO otps (email, otp) VALUES (?, ?)", [email, otp]);

    await sendEmail(email, "Your OTP Code", `Your OTP is ${otp}`);
    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error sending OTP", error });
  }
};

// export const verifyOTP = async (req: Request, res: Response) => {
//   const { email, otp } = req.body;

//   try {
//     const [rows]: any = await mysqlPool.query(
//       "SELECT * FROM otps WHERE email = ? AND otp = ? AND TIMESTAMPDIFF(MINUTE, createdAt, NOW()) <= 5",
//       [email, otp]
//     );

//     if (rows.length === 0) {
//       res.status(400).json({ message: "Invalid or expired OTP" });
//       return;
//     }

//     res.status(200).json({ message: "OTP verified successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Error verifying OTP", error });
//   }
// };

export const verifyOTP = async (req: Request, res: Response) => {
  const { email, otp } = req.body;

  try {
    const [otpRows]: any = await mysqlPool.query(
      "SELECT * FROM otps WHERE email = ? AND otp = ? AND TIMESTAMPDIFF(MINUTE, createdAt, NOW()) <= 5",
      [email, otp]
    );

    if (otpRows.length === 0) {
      res.status(400).json({ message: "Invalid or expired OTP" });
      return;
    }

    const [userRows]: any = await mysqlPool.query("SELECT * FROM users WHERE email = ?", [email]);

    if (userRows.length === 0) {
      res.status(400).json({ message: "User not found" });
      return;
    }

    const user = userRows[0];

    // Generate JWT token
    const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, process.env.JWT_SECRET || "", {
      expiresIn: "1h",
    });

    res.status(200).json({ message: "OTP verified successfully", token });
  } catch (error) {
    res.status(500).json({ message: "Error verifying OTP", error });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  const { email, otp, newPassword } = req.body;

  try {
    const [rows]: any = await mysqlPool.query(
      "SELECT * FROM otps WHERE email = ? AND otp = ? AND TIMESTAMPDIFF(MINUTE, createdAt, NOW()) <= 5",
      [email, otp]
    );

    if (rows.length === 0) {
      res.status(400).json({ message: "Invalid or expired OTP" });
      return;
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await mysqlPool.query("UPDATE users SET password = ? WHERE email = ?", [hashedPassword, email]);

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error resetting password", error });
  }
};

// export const verifySignupOTP = async (req: Request, res: Response) => {
//   const { email, otp } = req.body;

//   try {
//     const [rows]: any = await mysqlPool.query("SELECT * FROM unverified_users WHERE email = ? AND otp = ?", [email, otp]);

//     if (rows.length === 0) {
//       res.status(400).json({ message: "Invalid or expired OTP" });
//       return;
//     }

//     const user = rows[0];

//     await mysqlPool.query(
//       "INSERT INTO users (email, password, name, date_of_birth) VALUES (?, ?, ?, ?)",
//       [user.email, user.password, user.name, user.date_of_birth]
//     );

//     await mysqlPool.query("DELETE FROM unverified_users WHERE email = ?", [email]);

//     res.status(200).json({ message: "User registered successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Error verifying OTP", error });
//   }
// };


export const verifySignupOTP = async (req: Request, res: Response) => {
  const { email, otp } = req.body;

  try {
    const [rows]: any = await mysqlPool.query(
      "SELECT * FROM unverified_users WHERE email = ? AND otp = ? AND TIMESTAMPDIFF(MINUTE, otp_created_at, NOW()) <= 5",
      [email, otp]
    );

    if (rows.length === 0) {
      res.status(400).json({ message: "Invalid or expired OTP" });
      return;
    }

    const user = rows[0];

    await mysqlPool.query(
      "INSERT INTO users (email, password, name, date_of_birth) VALUES (?, ?, ?, ?)",
      [user.email, user.password, user.name, user.date_of_birth]
    );

    await mysqlPool.query("DELETE FROM unverified_users WHERE email = ?", [email]);

    // Generate JWT token
    const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, process.env.JWT_SECRET || "", {
      expiresIn: "1h",
    });

    res.status(200).json({ message: "OTP verified successfully and user registered", token });
  } catch (error) {
    res.status(500).json({ message: "Error verifying OTP", error });
  }
};
