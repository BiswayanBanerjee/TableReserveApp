// import express from "express";
// import { createNote, deleteNote } from "../controllers/noteController";
// import { authenticate } from "../middleware/authMiddleware";

// const router = express.Router();

// router.post("/", authenticate, createNote);
// router.delete("/:id", authenticate, deleteNote);

// export default router;

// import express from "express";
// import { createNote, deleteNote } from "../controllers/noteController";
// import { authenticate } from "../middleware/authMiddleware";

// const router = express.Router();

// router.post("/", authenticate, createNote); // Works because `authenticate` and `createNote` return void/Promise<void>
// router.delete("/:id", authenticate, deleteNote);

// export default router;

// import express from "express";
// import { createBooking, deleteBooking, editBooking, showAvailableTimeSlots, bookingSummary } from "../controllers/noteController";
// import { authenticate } from "../middleware/authMiddleware";

// const router = express.Router();

// router.post("/", authenticate, createBooking); // Route for creating a booking
// router.delete("/:id", authenticate, deleteBooking); // Route for deleting a booking
// router.put("/:id", authenticate, editBooking); // Route for editing a booking
// router.get("/available-slots/:date", authenticate, showAvailableTimeSlots); // Route for showing available time slots
// router.get("/summary/:id", authenticate, bookingSummary); // Route for displaying booking summary

// export default router;

import express from "express";
import { createBooking, deleteBooking, editBooking, showAvailableTimeSlots, bookingSummary, fetchBookingsByEmail } from "../controllers/noteController";
import { authenticate } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/", authenticate, createBooking); // Route for creating a booking
router.delete("/:id", authenticate, deleteBooking); // Route for deleting a booking
router.put("/:id", authenticate, editBooking); // Route for editing a booking
router.get("/available-slots/:date", authenticate, showAvailableTimeSlots); // Route for showing available time slots
router.get("/summary/:id", authenticate, bookingSummary); // Route for displaying booking summary
router.get("/email/:email", authenticate, fetchBookingsByEmail); // Route for fetching bookings by email

export default router;
