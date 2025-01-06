// import { Request, Response } from "express";
// import { Note } from "../models/note";

// export const createNote = async (req: Request, res: Response): Promise<void> => {
//   const { title, content } = req.body;

//   try {
//     const user = (req as any).user; // Dynamically access req.user

//     if (!user || !user.id) {
//       res.status(401).json({ message: "Unauthorized" });
//       return;
//     }

//     const note = new Note({
//       userId: user.id,
//       title,
//       content,
//     });

//     await note.save();
//     res.status(201).json({ message: "Note created successfully", note });
//   } catch (error) {
//     res.status(500).json({ message: "Error creating note", error: error instanceof Error ? error.message : error });
//   }
// };

// export const deleteNote = async (req: Request, res: Response): Promise<void> => {
//   const { id } = req.params;

//   try {
//     const user = (req as any).user; // Dynamically access req.user

//     if (!user || !user.id) {
//       res.status(401).json({ message: "Unauthorized" });
//       return;
//     }

//     const note = await Note.findOneAndDelete({ _id: id, userId: user.id });

//     if (!note) {
//       res.status(404).json({ message: "Note not found or you do not have permission to delete it" });
//       return;
//     }

//     res.status(200).json({ message: "Note deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Error deleting note", error: error instanceof Error ? error.message : error });
//   }
// };

// export const viewNote = async (req: Request, res: Response): Promise<void> => {
//   const { id } = req.params;

//   try {
//     const user = (req as any).user; // Dynamically access req.user

//     if (!user || !user.id) {
//       res.status(401).json({ message: "Unauthorized" });
//       return;
//     }

//     const note = await Note.findOne({ _id: id, userId: user.id });

//     if (!note) {
//       res.status(404).json({ message: "Note not found or you do not have permission to view it" });
//       return;
//     }

//     res.status(200).json(note);
//   } catch (error) {
//     res.status(500).json({ message: "Error viewing note", error: error instanceof Error ? error.message : error });
//   }
// };

// export const editNote = async (req: Request, res: Response): Promise<void> => {
//   const { id } = req.params;
//   const { title, content } = req.body;

//   try {
//     const user = (req as any).user; // Dynamically access req.user

//     if (!user || !user.id) {
//       res.status(401).json({ message: "Unauthorized" });
//       return;
//     }

//     const note = await Note.findOneAndUpdate(
//       { _id: id, userId: user.id },
//       { title, content },
//       { new: true }
//     );

//     if (!note) {
//       res.status(404).json({ message: "Note not found or you do not have permission to edit it" });
//       return;
//     }

//     res.status(200).json({ message: "Note updated successfully", note });
//   } catch (error) {
//     res.status(500).json({ message: "Error editing note", error: error instanceof Error ? error.message : error });
//   }
// };

// export const viewAllNotes = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const user = (req as any).user; // Dynamically access req.user

//     if (!user || !user.id) {
//       res.status(401).json({ message: "Unauthorized" });
//       return;
//     }

//     const notes = await Note.find({ userId: user.id });

//     res.status(200).json(notes);
//   } catch (error) {
//     res.status(500).json({ message: "Error retrieving notes", error: error instanceof Error ? error.message : error });
//   }
// };


// import { Request, Response } from "express";
// import mongoose from "mongoose";
// import { Note } from "../models/note";

// // Method to show available time slots
// export const showAvailableTimeSlots = async (req: Request, res: Response): Promise<void> => {
//   const { date } = req.params;

//   try {
//     const reservations = await Note.find({ reservationDateTime: { $gte: new Date(date), $lt: new Date(new Date(date).setDate(new Date(date).getDate() + 1)) } });

//     // Assuming time slots are hourly from 9 AM to 9 PM
//     const timeSlots = Array.from({ length: 12 }, (_, i) => new Date(new Date(date).setHours(9 + i, 0, 0, 0)));

//     const availableTimeSlots = timeSlots.filter(slot => !reservations.some((reservation: { reservationDateTime: { getTime: () => number; }; }) => reservation.reservationDateTime.getTime() === slot.getTime()));

//     res.status(200).json({ availableTimeSlots });
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching available time slots", error: error instanceof Error ? error.message : error });
//   }
// };

// // Method to create a booking and prevent double bookings
// export const createBooking = async (req: Request, res: Response): Promise<void> => {
//   const { reservationDateTime, numberOfGuests, name, contactDetails } = req.body;

//   try {
//     const existingReservation = await Note.findOne({ reservationDateTime });

//     if (existingReservation) {
//       res.status(400).json({ message: "Time slot already booked" });
//       return;
//     }

//     const newNote = new Note({
//       _id: new mongoose.Types.ObjectId(),
//       reservationDateTime,
//       numberOfGuests,
//       name,
//       contactDetails
//     });

//     await newNote.save();

//     res.status(201).json({ message: "Booking created successfully", reservation: newNote });
//   } catch (error) {
//     res.status(500).json({ message: "Error creating booking", error: error instanceof Error ? error.message : error });
//   }
// };

// // Method to delete a booking
// export const deleteBooking = async (req: Request, res: Response): Promise<void> => {
//   const { id } = req.params;

//   try {
//     const note = await Note.findByIdAndDelete(id);

//     if (!note) {
//       res.status(404).json({ message: "Booking not found" });
//       return;
//     }

//     res.status(200).json({ message: "Booking deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Error deleting booking", error: error instanceof Error ? error.message : error });
//   }
// };

// // Method to edit a booking
// export const editBooking = async (req: Request, res: Response): Promise<void> => {
//   const { id } = req.params;
//   const { reservationDateTime, numberOfGuests, name, contactDetails } = req.body;

//   try {
//     const existingReservation = await Note.findOne({ reservationDateTime });

//     if (existingReservation && existingReservation._id.toString() !== id) {
//       res.status(400).json({ message: "Time slot already booked" });
//       return;
//     }

//     const updatedNote = await Note.findByIdAndUpdate(
//       id,
//       { reservationDateTime, numberOfGuests, name, contactDetails },
//       { new: true }
//     );

//     if (!updatedNote) {
//       res.status(404).json({ message: "Booking not found" });
//       return;
//     }

//     res.status(200).json({ message: "Booking updated successfully", reservation: updatedNote });
//   } catch (error) {
//     res.status(500).json({ message: "Error updating booking", error: error instanceof Error ? error.message : error });
//   }
// };

// // Method to display booking summary
// export const bookingSummary = async (req: Request, res: Response): Promise<void> => {
//   const { id } = req.params;

//   try {
//     const reservation = await Note.findById(id);

//     if (!reservation) {
//       res.status(404).json({ message: "Reservation not found" });
//       return;
//     }

//     res.status(200).json({ message: "Booking summary", reservation });
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching booking summary", error: error instanceof Error ? error.message : error });
//   }
// };

// import { Request, Response } from "express";
// import mongoose from "mongoose";
// import { Note } from "../models/note";

// // Method to show available time slots
// export const showAvailableTimeSlots = async (req: Request, res: Response): Promise<void> => {
//   const { date } = req.params;

//   try {
//     const reservations = await Note.find({ reservationDateTime: { $gte: new Date(date), $lt: new Date(new Date(date).setDate(new Date(date).getDate() + 1)) } });

//     // Assuming time slots are hourly from 9 AM to 9 PM
//     const timeSlots = Array.from({ length: 12 }, (_, i) => new Date(new Date(date).setHours(9 + i, 0, 0, 0)));

//     const availableTimeSlots = timeSlots.filter(slot => !reservations.some(reservation => reservation.reservationDateTime.getTime() === slot.getTime()));

//     res.status(200).json({ availableTimeSlots });
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching available time slots", error: error instanceof Error ? error.message : error });
//   }
// };

// // Method to create a booking and prevent double bookings
// export const createBooking = async (req: Request, res: Response): Promise<void> => {
//   const { reservationDateTime, numberOfGuests, name, phoneNumber, email } = req.body;

//   try {
//     const existingReservation = await Note.findOne({ reservationDateTime });

//     if (existingReservation) {
//       res.status(400).json({ message: "Time slot already booked" });
//       return;
//     }

//     const newNote = new Note({
//       _id: new mongoose.Types.ObjectId(),
//       reservationDateTime,
//       numberOfGuests,
//       name,
//       phoneNumber,
//       email
//     });

//     await newNote.save();

//     res.status(201).json({ message: "Booking created successfully", reservation: newNote });
//   } catch (error) {
//     res.status(500).json({ message: "Error creating booking", error: error instanceof Error ? error.message : error });
//   }
// };

// // Method to delete a booking
// export const deleteBooking = async (req: Request, res: Response): Promise<void> => {
//   const { id } = req.params;

//   try {
//     const note = await Note.findByIdAndDelete(id);

//     if (!note) {
//       res.status(404).json({ message: "Booking not found" });
//       return;
//     }

//     res.status(200).json({ message: "Booking deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Error deleting booking", error: error instanceof Error ? error.message : error });
//   }
// };

// // Method to edit a booking
// export const editBooking = async (req: Request, res: Response): Promise<void> => {
//   const { id } = req.params;
//   const { reservationDateTime, numberOfGuests, name, phoneNumber, email } = req.body;

//   try {
//     const existingReservation = await Note.findOne({ reservationDateTime });

//     if (existingReservation && existingReservation._id.toString() !== id) {
//       res.status(400).json({ message: "Time slot already booked" });
//       return;
//     }

//     const updatedNote = await Note.findByIdAndUpdate(
//       id,
//       { reservationDateTime, numberOfGuests, name, phoneNumber, email },
//       { new: true }
//     );

//     if (!updatedNote) {
//       res.status(404).json({ message: "Booking not found" });
//       return;
//     }

//     res.status(200).json({ message: "Booking updated successfully", reservation: updatedNote });
//   } catch (error) {
//     res.status(500).json({ message: "Error updating booking", error: error instanceof Error ? error.message : error });
//   }
// };

// // Method to display booking summary
// export const bookingSummary = async (req: Request, res: Response): Promise<void> => {
//   const { id } = req.params;

//   try {
//     const reservation = await Note.findById(id);

//     if (!reservation) {
//       res.status(404).json({ message: "Reservation not found" });
//       return;
//     }

//     res.status(200).json({ message: "Booking summary", reservation });
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching booking summary", error: error instanceof Error ? error.message : error });
//   }
// };

import { Request, Response } from "express";
import mongoose from "mongoose";
import { Note } from "../models/note";

// Method to show available time slots
export const showAvailableTimeSlots = async (req: Request, res: Response): Promise<void> => {
  const { date } = req.params;

  try {
    const reservations = await Note.find({ reservationDateTime: { $gte: new Date(date), $lt: new Date(new Date(date).setDate(new Date(date).getDate() + 1)) } });

    // Assuming time slots are hourly from 9 AM to 9 PM
    const timeSlots = Array.from({ length: 12 }, (_, i) => new Date(new Date(date).setHours(9 + i, 0, 0, 0)));

    const availableTimeSlots = timeSlots.filter(slot => !reservations.some(reservation => reservation.reservationDateTime.getTime() === slot.getTime()));

    res.status(200).json({ availableTimeSlots });
  } catch (error) {
    res.status(500).json({ message: "Error fetching available time slots", error: error instanceof Error ? error.message : error });
  }
};

// Method to create a booking and prevent double bookings
export const createBooking = async (req: Request, res: Response): Promise<void> => {
  const { reservationDateTime, numberOfGuests, name, phoneNumber, email, restaurantName } = req.body;

  try {
    const existingReservation = await Note.findOne({ reservationDateTime });

    if (existingReservation) {
      res.status(200).json({ message: "Time slot already booked" });
      return;
    }

    const newNote = new Note({
      _id: new mongoose.Types.ObjectId(),
      reservationDateTime,
      numberOfGuests,
      name,
      phoneNumber,
      email,
      restaurantName
    });

    await newNote.save();

    res.status(201).json({ message: "Booking created successfully", reservation: newNote });
  } catch (error) {
    res.status(500).json({ message: "Error creating booking", error: error instanceof Error ? error.message : error });
  }
};

// Method to delete a booking
export const deleteBooking = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const note = await Note.findByIdAndDelete(id);

    if (!note) {
      res.status(404).json({ message: "Booking not found" });
      return;
    }

    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting booking", error: error instanceof Error ? error.message : error });
  }
};

// Method to edit a booking
export const editBooking = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { reservationDateTime, numberOfGuests, name, phoneNumber, email, restaurantName } = req.body;

  try {
    const existingReservation = await Note.findOne({ reservationDateTime });

    if (existingReservation && existingReservation._id.toString() !== id) {
      res.status(400).json({ message: "Time slot already booked" });
      return;
    }

    const updatedNote = await Note.findByIdAndUpdate(
      id,
      { reservationDateTime, numberOfGuests, name, phoneNumber, email, restaurantName },
      { new: true }
    );

    if (!updatedNote) {
      res.status(404).json({ message: "Booking not found" });
      return;
    }

    res.status(200).json({ message: "Booking updated successfully", reservation: updatedNote });
  } catch (error) {
    res.status(500).json({ message: "Error updating booking", error: error instanceof Error ? error.message : error });
  }
};

// Method to display booking summary
export const bookingSummary = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const reservation = await Note.findById(id);

    if (!reservation) {
      res.status(404).json({ message: "Reservation not found" });
      return;
    }

    res.status(200).json({ message: "Booking summary", reservation });
  } catch (error) {
    res.status(500).json({ message: "Error fetching booking summary", error: error instanceof Error ? error.message : error });
  }
};

// Method to fetch bookings associated with an email ID
export const fetchBookingsByEmail = async (req: Request, res: Response): Promise<void> => {
  const { email } = req.params;

  try {
    const bookings = await Note.find({ email });

    if (bookings.length === 0) {
      res.status(200).json({ message: "No bookings found for this email", bookings: [] });
      return;
    }

    res.status(200).json({ message: "Bookings fetched successfully", bookings });
  } catch (error) {
    res.status(500).json({ message: "Error fetching bookings", error: error instanceof Error ? error.message : error });
  }
};