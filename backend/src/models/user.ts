// import { mysqlPool } from "../config/dbMySQL";

// export const createUserTable = async () => {
//   const query = `
//     CREATE TABLE IF NOT EXISTS users (
//       id INT AUTO_INCREMENT PRIMARY KEY,
//       email VARCHAR(255) UNIQUE NOT NULL,
//       password VARCHAR(255) NOT NULL
//     );
//     CREATE TABLE IF NOT EXISTS otps (
//       id INT AUTO_INCREMENT PRIMARY KEY,
//       email VARCHAR(255) NOT NULL,
//       otp VARCHAR(6) NOT NULL,
//       createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//       FOREIGN KEY (email) REFERENCES users(email)
//     );
//   `;
//   await mysqlPool.query(query);
// };

// import { mysqlPool } from "../config/dbMySQL";

// export const createUserTable = async () => {
//   const userTableQuery = `
//     CREATE TABLE IF NOT EXISTS users (
//       id INT AUTO_INCREMENT PRIMARY KEY,
//       email VARCHAR(255) UNIQUE NOT NULL,
//       password VARCHAR(255) NOT NULL,
//       name VARCHAR(255) NOT NULL,
//       date_of_birth DATE NOT NULL
//     );
//   `;

//   const otpTableQuery = `
//     CREATE TABLE IF NOT EXISTS otps (
//       id INT AUTO_INCREMENT PRIMARY KEY,
//       email VARCHAR(255) NOT NULL,
//       otp VARCHAR(6) NOT NULL,
//       createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//       FOREIGN KEY (email) REFERENCES users(email)
//     );
//   `;

//   await mysqlPool.query(userTableQuery);
//   await mysqlPool.query(otpTableQuery);
// };


import { mysqlPool } from "../config/dbMySQL";

export const createUserTable = async () => {
  const userTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      name VARCHAR(255) NOT NULL,
      date_of_birth DATE NOT NULL
    );
  `;

  const otpTableQuery = `
    CREATE TABLE IF NOT EXISTS otps (
      id INT AUTO_INCREMENT PRIMARY KEY,
      email VARCHAR(255) NOT NULL,
      otp VARCHAR(6) NOT NULL,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (email) REFERENCES users(email)
    );
  `;

  const unverifiedUserTableQuery = `
    CREATE TABLE IF NOT EXISTS unverified_users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      name VARCHAR(255) NOT NULL,
      date_of_birth DATE NOT NULL,
      otp VARCHAR(6) NOT NULL,
      otp_created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  await mysqlPool.query(userTableQuery);
  await mysqlPool.query(otpTableQuery);
  await mysqlPool.query(unverifiedUserTableQuery);
};