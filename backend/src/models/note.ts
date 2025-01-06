// import mongoose, { Schema, Document } from "mongoose";

// export interface INote extends Document {
//   _id: mongoose.Types.ObjectId;
//   reservationDateTime: Date;
//   numberOfGuests: number;
//   name: string;
//   contactDetails: string;
// }

// const NoteSchema: Schema = new Schema({
//   _id: { type: mongoose.Types.ObjectId, auto: true },
//   reservationDateTime: { type: Date, required: true },
//   numberOfGuests: { type: Number, required: true },
//   name: { type: String, required: true },
//   contactDetails: { type: String, required: true },
// }, { timestamps: true });

// export const Note = mongoose.model<INote>("Note", NoteSchema);

import mongoose, { Schema, Document } from "mongoose";

export interface INote extends Document {
  _id: mongoose.Types.ObjectId;
  reservationDateTime: Date;
  numberOfGuests: number;
  name: string;
  phoneNumber: string;
  email: string;
  restaurantName: string;
}

const NoteSchema: Schema = new Schema({
  _id: { type: mongoose.Types.ObjectId, auto: true },
  reservationDateTime: { type: Date, required: true },
  numberOfGuests: { type: Number, required: true },
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true },
  restaurantName: { type: String, required: true },
}, { timestamps: true });

export const Note = mongoose.model<INote>("Note", NoteSchema);
