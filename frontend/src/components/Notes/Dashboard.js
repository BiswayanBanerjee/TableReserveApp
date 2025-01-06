// import React, { useEffect, useState } from "react";
// import {
//   Button,
//   Box,
//   Typography,
//   Grid,
//   Card,
//   CardContent,
//   IconButton,
//   TextField,
// } from "@mui/material";
// import {
//   Delete,
//   Edit,
//   Save,
//   Cancel,
//   ExpandMore,
//   ExpandLess,
//   Add,
// } from "@mui/icons-material";
// import {jwtDecode} from "jwt-decode";
// import api from "../../services/api";
// import { useNavigate } from "react-router-dom";


// const Dashboard: React.FC = () => {
//   interface Note {
//     _id: string;
//     title: string;
//     content: string;
//   }

//   interface User {
//     name: string;
//     email: string;
//   }

//   const [notes, setNotes] = useState<Note[]>([]);
//   const [expandedNote, setExpandedNote] = useState<string | null>(null);
//   const [editingNote, setEditingNote] = useState<Note | null>(null);
//   const [newNote, setNewNote] = useState<Partial<Note>>({ title: "", content: "" });
//   const [showCreateForm, setShowCreateForm] = useState(false);
//   const [user, setUser] = useState<User | null>(null);
//   const navigate = useNavigate();


//   const fetchNotes = async () => {
//     try {
//       const response = await api.get("/notes");
//       setNotes(response.data);
//     } catch (error) {
//       console.error("Error fetching notes:", error);
//     }
//   };

//   const handleDelete = async (id: string) => {
//     try {
//       await api.delete(`/notes/${id}`);
//       setNotes(notes.filter((note) => note._id !== id));
//     } catch (error) {
//       console.error("Error deleting note:", error);
//     }
//   };

//   const handleEditStart = (note: Note) => {
//     setEditingNote(note);
//   };

//   const handleEditCancel = () => {
//     setEditingNote(null);
//   };

//   const handleEditSave = async () => {
//     if (editingNote) {
//       try {
//         await api.put(`/notes/${editingNote._id}`, {
//           title: editingNote.title,
//           content: editingNote.content,
//         });
//         setNotes((prevNotes) =>
//           prevNotes.map((note) =>
//             note._id === editingNote._id ? editingNote : note
//           )
//         );
//         setEditingNote(null);
//       } catch (error) {
//         console.error("Error updating note:", error);
//       }
//     }
//   };

//   const toggleExpand = (id: string) => {
//     setExpandedNote((prev) => (prev === id ? null : id));
//     setEditingNote(null); // Exit editing mode when toggling expansion
//   };

//   const handleInputChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     if (editingNote) {
//       setEditingNote({ ...editingNote, [e.target.name]: e.target.value });
//     } else {
//       setNewNote({ ...newNote, [e.target.name]: e.target.value });
//     }
//   };

//   const handleCreateNote = async () => {
//     if (newNote.title && newNote.content) {
//       try {
//         const response = await api.post("/notes", newNote);
//         const createdNote = response.data;
  
//         // Ensure the new note has all necessary fields
//         setNotes((prevNotes) => [
//           { ...createdNote, content: newNote.content || "" },
//           ...prevNotes,
//         ]);
//         setNewNote({ title: "", content: "" });
//         setShowCreateForm(false);
//       } catch (error) {
//         console.error("Error creating note:", error);
//       }
//     }
//   };
  

//   const handleSignOut = () => {
//     localStorage.removeItem("token");
//     // window.location.href = "/login";
//     navigate("/login");
//   };

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       try {
//         const decodedToken: any = jwtDecode(token);
//         setUser({
//           name: decodedToken.name,
//           email: decodedToken.email,
//         });
//         fetchNotes();
//       } catch (error) {
//         console.error("Invalid token:", error);
//       }
//     } else {
//       // window.location.href = "/login";
//       navigate("/login");
//     }
//   }, []);

//   return (
//     <Box
//       sx={{
//         position: "relative",
//         width: "100%",
//         height: "100vh",
//         overflow: "hidden",
//       }}
//     >
//       {/* Background Image */}
//       <Box
//         sx={{
//           position: "absolute",
//           top: 0,
//           left: 0,
//           width: "100%",
//           height: "100%",
//           backgroundImage: "url(/assets/images/bg-img.png)",
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           opacity: 0.9,
//           zIndex: -5,
//         }}
//       />

//       {/* Main Content */}
//       <Box
//         sx={{
//           p: 2,
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           height: "100%",
//           backgroundColor: "rgba(255, 255, 255, 0.5)",
//         }}
//       >
//         {/* Top Bar */}
// <Box
//   sx={{
//     width: "100%",
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     mb: 2,
//   }}
// >
//   <Box
//     sx={{
//       display: "flex",
//       alignItems: "center",
//     }}
//   >
//     <img
//       src="/assets/images/hd-icon.png"
//       alt="HD Icon"
//       style={{ width: 32, height: 32, marginRight: 8 }}
//     />
//     <Typography
//       variant="h6"
//       sx={{
//         color: "#232323",
//         textAlign: "center",
//         fontFeatureSettings: "'liga' off, 'clig' off",
//         fontFamily: "Inter",
//         fontSize: "20px",
//         fontStyle: "normal",
//         fontWeight: 500,
//         lineHeight: "110%", // 22px
//         letterSpacing: "-0.8px",
//       }}
//     >
//       Dashboard
//     </Typography>
//   </Box>
//   <Button
//     variant="text"
//     color="primary"
//     onClick={handleSignOut}
//     sx={{
//       color: "#367AFF",
//       fontFeatureSettings: "'liga' off, 'clig' off",
//       fontFamily: "Inter",
//       fontSize: "14px",
//       fontStyle: "normal",
//       fontWeight: 600,
//       lineHeight: "150%",
//       textDecorationLine: "underline",
//       textDecorationStyle: "solid",
//       textDecorationSkipInk: "none",
//       textDecorationThickness: "auto",
//       textUnderlineOffset: "auto",
//       textUnderlinePosition: "from-font",
//     }}
//   >
//     Sign Out
//   </Button>
// </Box>

//         {/* Welcome Card */}
//         <Card
//           sx={{
//             width: "90%",
//             maxWidth: 500,
//             mb: 3,
//             p: 2,
//             textAlign: "center",
//             boxShadow: 2,
//             borderRadius: "10px",
//           }}
//         >
//           <CardContent>
//             <Typography variant="h6" fontWeight="bold">
//               Welcome, {user?.name || "User"}!
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               Email: {user?.email || "N/A"}
//             </Typography>
//           </CardContent>
//         </Card>

//         {/* Create Note Section */}
//         <Button
//           startIcon={<Add />}
//           variant="contained"
//           sx={{
//             width: "100%",
//             maxWidth: 300,
//             mb: 3,
//             py: 1.5,
//             fontWeight: "bold",
//             backgroundColor: "#367AFF",
//             borderRadius: "10px",
//           }}
//           onClick={() => setShowCreateForm(!showCreateForm)}
//         >
//           {showCreateForm ? "Cancel" : "Create Note"}
//         </Button>
//         {showCreateForm && (
//           <Box sx={{ width: "100%", maxWidth: 500, mb: 3 }}>
//             <TextField
//               name="title"
//               label="Title"
//               value={newNote.title}
//               onChange={handleInputChange}
//               fullWidth
//               sx={{ mb: 2 }}
//             />
//             <TextField
//               name="content"
//               label="Content"
//               value={newNote.content}
//               onChange={handleInputChange}
//               multiline
//               rows={4}
//               fullWidth
//               sx={{ mb: 2 }}
//             />
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={handleCreateNote}
//               fullWidth
//             >
//               Save Note
//             </Button>
//           </Box>
//         )}

//         {/* Notes List */}
//         <Box
//           sx={{
//             width: "100%",
//             maxWidth: 500,
//             flexGrow: 1,
//             overflowY: "auto",
//           }}
//         >
//           <Typography
//   variant="h6"
//   gutterBottom
//   sx={{
//     color: "#232323",
//     // textAlign: "center",
//     fontFeatureSettings: "'liga' off, 'clig' off",
//     fontFamily: "Inter",
//     fontSize: "20px",
//     fontStyle: "normal",
//     fontWeight: 500,
//     lineHeight: "110%", // 22px
//     letterSpacing: "-0.8px",
//   }}
// >
//   Notes
// </Typography>
//           <Grid container spacing={2}>
//   {notes.map((note, index) => (
//     <Grid item xs={12} key={note._id}>
//       <Card
//         sx={{
//           boxShadow: 1,
//           borderRadius: "8px",
//           p: 1.5,
//           backgroundColor: "#fff",
//         }}
//       >
//         <Box
//           onClick={() => toggleExpand(note._id)}
//           sx={{
//             cursor: "pointer",
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//           }}
//         >
//           <Box>
//             <Typography variant="subtitle1" fontWeight="bold">
//               Note {index + 1}: {note.title}
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               {expandedNote === note._id
//                 ? note.content || "No content available."
//                 : (note.content || "").slice(0, 15) + "..."}
//             </Typography>
//           </Box>
//           <Box>
//             <IconButton>
//               {expandedNote === note._id ? <ExpandLess /> : <ExpandMore />}
//             </IconButton>
//           </Box>
//         </Box>

//         {expandedNote === note._id && (
//           <Box sx={{ mt: 1 }}>
//             {editingNote && editingNote._id === note._id ? (
//               <>
//                 <TextField
//                   name="title"
//                   label="Title"
//                   value={editingNote.title}
//                   sx={{ mb: 2 }}
//                   onChange={handleInputChange}
//                   fullWidth
//                 />
//                 <TextField
//                   name="content"
//                   label="Content"
//                   value={editingNote.content}
//                   onChange={handleInputChange}
//                   multiline
//                   rows={4}
//                   fullWidth
//                 />
//                 <Box
//                   sx={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     mt: 1,
//                   }}
//                 >
//                   <Button
//                     startIcon={<Save />}
//                     onClick={handleEditSave}
//                     variant="contained"
//                     color="primary"
//                   >
//                     Save
//                   </Button>
//                   <Button
//                     startIcon={<Cancel />}
//                     onClick={handleEditCancel}
//                     variant="outlined"
//                     color="secondary"
//                   >
//                     Cancel
//                   </Button>
//                 </Box>
//               </>
//             ) : (
//               <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
//                 <IconButton
//                   aria-label="edit"
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     handleEditStart(note);
//                   }}
//                 >
//                   <Edit />
//                 </IconButton>
//                 <IconButton
//                   aria-label="delete"
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     handleDelete(note._id);
//                   }}
//                 >
//                   <Delete />
//                 </IconButton>
//               </Box>
//             )}
//           </Box>
//         )}
//       </Card>
//     </Grid>
//   ))}
// </Grid>

//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default Dashboard;











// import { useEffect, useState } from "react";
// import {
//   Button,
//   Box,
//   Typography,
//   Grid,
//   Card,
//   CardContent,
//   IconButton,
//   TextField,
// } from "@mui/material";
// import {
//   Delete,
//   Edit,
//   Save,
//   Cancel,
//   ExpandMore,
//   ExpandLess,
//   Add,
// } from "@mui/icons-material";
// import { jwtDecode } from "jwt-decode";
// import api from "../services/api";
// import { useRouter } from "next/router";

// const Dashboard = () => {
//   const [notes, setNotes] = useState([]);
//   const [expandedNote, setExpandedNote] = useState(null);
//   const [editingNote, setEditingNote] = useState(null);
//   const [newNote, setNewNote] = useState({ title: "", content: "" });
//   const [showCreateForm, setShowCreateForm] = useState(false);
//   const [user, setUser] = useState(null);
//   const router = useRouter();

//   const fetchNotes = async () => {
//     try {
//       const response = await api.get("/notes");
//       setNotes(response.data);
//     } catch (error) {
//       console.error("Error fetching notes:", error);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await api.delete(`/notes/${id}`);
//       setNotes(notes.filter((note) => note._id !== id));
//     } catch (error) {
//       console.error("Error deleting note:", error);
//     }
//   };

//   const handleEditStart = (note) => {
//     setEditingNote(note);
//   };

//   const handleEditCancel = () => {
//     setEditingNote(null);
//   };

//   const handleEditSave = async () => {
//     if (editingNote) {
//       try {
//         await api.put(`/notes/${editingNote._id}`, {
//           title: editingNote.title,
//           content: editingNote.content,
//         });
//         setNotes((prevNotes) =>
//           prevNotes.map((note) =>
//             note._id === editingNote._id ? editingNote : note
//           )
//         );
//         setEditingNote(null);
//       } catch (error) {
//         console.error("Error updating note:", error);
//       }
//     }
//   };

//   const toggleExpand = (id) => {
//     setExpandedNote((prev) => (prev === id ? null : id));
//     setEditingNote(null); // Exit editing mode when toggling expansion
//   };

//   const handleInputChange = (e) => {
//     if (editingNote) {
//       setEditingNote({ ...editingNote, [e.target.name]: e.target.value });
//     } else {
//       setNewNote({ ...newNote, [e.target.name]: e.target.value });
//     }
//   };

//   const handleCreateNote = async () => {
//     if (newNote.title && newNote.content) {
//       try {
//         const response = await api.post("/notes", newNote);
//         const createdNote = response.data;

//         // Ensure the new note has all necessary fields
//         setNotes((prevNotes) => [
//           { ...createdNote, content: newNote.content || "" },
//           ...prevNotes,
//         ]);
//         setNewNote({ title: "", content: "" });
//         setShowCreateForm(false);
//       } catch (error) {
//         console.error("Error creating note:", error);
//       }
//     }
//   };

//   const handleSignOut = () => {
//     localStorage.removeItem("token");
//     router.push("/login");
//   };

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       try {
//         const decodedToken = jwtDecode(token);
//         setUser({
//           name: decodedToken.name,
//           email: decodedToken.email,
//         });
//         fetchNotes();
//       } catch (error) {
//         console.error("Invalid token:", error);
//       }
//     } else {
//       router.push("/login");
//     }
//   }, []);

//   return (
//     <Box
//       sx={{
//         position: "relative",
//         width: "100%",
//         height: "100vh",
//         overflow: "hidden",
//       }}
//     >
//       {/* Background Image */}
//       <Box
//         sx={{
//           position: "absolute",
//           top: 0,
//           left: 0,
//           width: "100%",
//           height: "100%",
//           backgroundImage: "url(/assets/images/bg-img.png)",
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           opacity: 0.9,
//           zIndex: -5,
//         }}
//       />

//       {/* Main Content */}
//       <Box
//         sx={{
//           p: 2,
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           height: "100%",
//           backgroundColor: "rgba(255, 255, 255, 0.5)",
//         }}
//       >
//         {/* Top Bar */}
//         <Box
//           sx={{
//             width: "100%",
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             mb: 2,
//           }}
//         >
//           <Box
//             sx={{
//               display: "flex",
//               alignItems: "center",
//             }}
//           >
//             <img
//               src="/assets/images/hd-icon.png"
//               alt="HD Icon"
//               style={{ width: 32, height: 32, marginRight: 8 }}
//             />
//             <Typography
//               variant="h6"
//               sx={{
//                 color: "#232323",
//                 textAlign: "center",
//                 fontFeatureSettings: "'liga' off, 'clig' off",
//                 fontFamily: "Inter",
//                 fontSize: "20px",
//                 fontStyle: "normal",
//                 fontWeight: 500,
//                 lineHeight: "110%", // 22px
//                 letterSpacing: "-0.8px",
//               }}
//             >
//               Dashboard
//             </Typography>
//           </Box>
//           <Button
//             variant="text"
//             color="primary"
//             onClick={handleSignOut}
//             sx={{
//               color: "#367AFF",
//               fontFeatureSettings: "'liga' off, 'clig' off",
//               fontFamily: "Inter",
//               fontSize: "14px",
//               fontStyle: "normal",
//               fontWeight: 600,
//               lineHeight: "150%",
//               textDecorationLine: "underline",
//               textDecorationStyle: "solid",
//               textDecorationSkipInk: "none",
//               textDecorationThickness: "auto",
//               textUnderlineOffset: "auto",
//               textUnderlinePosition: "from-font",
//             }}
//           >
//             Sign Out
//           </Button>
//         </Box>

//         {/* Welcome Card */}
//         <Card
//           sx={{
//             width: "90%",
//             maxWidth: 500,
//             mb: 3,
//             p: 2,
//             textAlign: "center",
//             boxShadow: 2,
//             borderRadius: "10px",
//           }}
//         >
//           <CardContent>
//             <Typography variant="h6" fontWeight="bold">
//               Welcome, {user?.name || "User"}!
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               Email: {user?.email || "N/A"}
//             </Typography>
//           </CardContent>
//         </Card>

//         {/* Create Note Section */}
//         <Button
//           startIcon={<Add />}
//           variant="contained"
//           sx={{
//             width: "100%",
//             maxWidth: 300,
//             mb: 3,
//             py: 1.5,
//             fontWeight: "bold",
//             backgroundColor: "#367AFF",
//             borderRadius: "10px",
//           }}
//           onClick={() => setShowCreateForm(!showCreateForm)}
//         >
//           {showCreateForm ? "Cancel" : "Create Note"}
//         </Button>
//         {showCreateForm && (
//           <Box sx={{ width: "100%", maxWidth: 500, mb: 3 }}>
//             <TextField
//               name="title"
//               label="Title"
//               value={newNote.title}
//               onChange={handleInputChange}
//               fullWidth
//               sx={{ mb: 2 }}
//             />
//             <TextField
//               name="content"
//               label="Content"
//               value={newNote.content}
//               onChange={handleInputChange}
//               multiline
//               rows={4}
//               fullWidth
//               sx={{ mb: 2 }}
//             />
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={handleCreateNote}
//               fullWidth
//             >
//               Save Note
//             </Button>
//           </Box>
//         )}

//         {/* Notes List */}
//         <Box
//           sx={{
//             width: "100%",
//             maxWidth: 500,
//             flexGrow: 1,
//             overflowY: "auto",
//           }}
//         >
//           <Typography
//             variant="h6"
//             gutterBottom
//             sx={{
//               color: "#232323",
//               fontFeatureSettings: "'liga' off, 'clig' off",
//               fontFamily: "Inter",
//               fontSize: "20px",
//               fontStyle: "normal",
//               fontWeight: 500,
//               lineHeight: "110%", // 22px
//               letterSpacing: "-0.8px",
//             }}
//           >
//             Notes
//           </Typography>
//           <Grid container spacing={2}>
//             {notes.map((note, index) => (
//               <Grid item xs={12} key={note._id}>
//                 <Card
//                   sx={{
//                     boxShadow: 1,
//                     borderRadius: "8px",
//                     p: 1.5,
//                     backgroundColor: "#fff",
//                   }}
//                 >
//                   <Box
//                     onClick={() => toggleExpand(note._id)}
//                     sx={{
//                       cursor: "pointer",
//                       display: "flex",
//                       justifyContent: "space-between",
//                       alignItems: "center",
//                     }}
//                   >
//                     <Box>
//                       <Typography variant="subtitle1" fontWeight="bold">
//                         Note {index + 1}: {note.title}
//                       </Typography>
//                       <Typography variant="body2" color="text.secondary">
//                         {expandedNote === note._id
//                           ? note.content || "No content available."
//                           : (note.content || "").slice(0, 15) + "..."}
//                       </Typography>
//                     </Box>
//                     <Box>
//                       <IconButton>
//                         {expandedNote === note._id ? <ExpandLess /> : <ExpandMore />}
//                       </IconButton>
//                     </Box>
//                   </Box>
//                   {expandedNote === note._id && (
//                     <Box sx={{ mt: 2 }}>
//                       {editingNote?._id === note._id ? (
//                         <Box>
//                           <TextField
//                             label="Title"
//                             value={editingNote.title}
//                             name="title"
//                             onChange={handleInputChange}
//                             fullWidth
//                             sx={{ mb: 2 }}
//                           />
//                           <TextField
//                             label="Content"
//                             value={editingNote.content}
//                             name="content"
//                             onChange={handleInputChange}
//                             multiline
//                             rows={4}
//                             fullWidth
//                             sx={{ mb: 2 }}
//                           />
//                           <Box sx={{ display: "flex", justifyContent: "space-between" }}>
//                             <Button
//                               variant="outlined"
//                               color="secondary"
//                               onClick={handleEditCancel}
//                             >
//                               Cancel
//                             </Button>
//                             <Button
//                               variant="contained"
//                               color="primary"
//                               onClick={handleEditSave}
//                             >
//                               Save
//                             </Button>
//                           </Box>
//                         </Box>
//                       ) : (
//                         <Box
//                           sx={{
//                             display: "flex",
//                             justifyContent: "space-between",
//                           }}
//                         >
//                           <IconButton onClick={() => handleEditStart(note)}>
//                             <Edit />
//                           </IconButton>
//                           <IconButton onClick={() => handleDelete(note._id)}>
//                             <Delete />
//                           </IconButton>
//                         </Box>
//                       )}
//                     </Box>
//                   )}
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default Dashboard;


// import { useEffect, useState } from "react";
// import {
//   Button,
//   Box,
//   Typography,
//   Grid,
//   Card,
//   CardContent,
//   IconButton,
//   TextField,
//   MenuItem,
//   Select,
//   Modal,
// } from "@mui/material";
// import {
//   Delete,
//   Edit,
//   Save,
//   Cancel,
//   ExpandMore,
//   ExpandLess,
//   Add,
// } from "@mui/icons-material";
// import { jwtDecode } from "jwt-decode";
// import api from "../services/api";
// import { useRouter } from "next/router";

// const Dashboard = () => {
//   const [reservations, setReservations] = useState([]);
//   const [expandedReservation, setExpandedReservation] = useState(null);
//   const [editingReservation, setEditingReservation] = useState(null);
//   const [newReservation, setNewReservation] = useState({
//     reservationDateTime: "",
//     numberOfGuests: "",
//     name: "",
//     contactDetails: "",
//   });
//   const [showCreateForm, setShowCreateForm] = useState(false);
//   const [availableSlots, setAvailableSlots] = useState([]);
//   const [user, setUser] = useState(null);
//   const [showSummary, setShowSummary] = useState(false);
//   const [summaryData, setSummaryData] = useState(null);
//   const router = useRouter();

//   const fetchReservations = async () => {
//     try {
//       const response = await api.get("/reservations");
//       setReservations(response.data);
//     } catch (error) {
//       console.error("Error fetching reservations:", error);
//     }
//   };

//   const handleDeleteReservation = async (id) => {
//     try {
//       await api.delete(`/notes/${id}`);
//       setReservations(reservations.filter((res) => res._id !== id));
//     } catch (error) {
//       console.error("Error deleting reservation:", error);
//     }
//   };

//   const handleEditStart = (reservation) => {
//     setEditingReservation(reservation);
//   };

//   const handleEditCancel = () => {
//     setEditingReservation(null);
//   };

//   const handleEditSave = async () => {
//     if (editingReservation) {
//       try {
//         await api.put(`/notes/${editingReservation._id}`, editingReservation);
//         setReservations((prev) =>
//           prev.map((res) =>
//             res._id === editingReservation._id ? editingReservation : res
//           )
//         );
//         setEditingReservation(null);
//       } catch (error) {
//         console.error("Error updating reservation:", error);
//       }
//     }
//   };

//   const fetchAvailableSlots = async (date) => {
//     try {
//       const response = await api.get(`/notes/available-slots/${date}`);
//       setAvailableSlots(response.data.slots);
//     } catch (error) {
//       console.error("Error fetching available slots:", error);
//     }
//   };

//   const fetchBookingSummary = async (id) => {
//     try {
//       const response = await api.get(`/notes/summary/${id}`);
//       setSummaryData(response.data);
//       setShowSummary(true);
//     } catch (error) {
//       console.error("Error fetching booking summary:", error);
//     }
//   };

//   const handleCreateReservation = async () => {
//     if (
//       newReservation.reservationDateTime &&
//       newReservation.numberOfGuests &&
//       newReservation.name &&
//       newReservation.contactDetails
//     ) {
//       try {
//         const response = await api.post("/notes/", newReservation);
//         setReservations((prev) => [response.data.reservation, ...prev]);
//         setNewReservation({
//           reservationDateTime: "",
//           numberOfGuests: "",
//           name: "",
//           contactDetails: "",
//         });
//         setShowCreateForm(false);
//       } catch (error) {
//         console.error("Error creating reservation:", error);
//       }
//     }
//   };

//   const handleInputChange = (e) => {
//     if (editingReservation) {
//       setEditingReservation({
//         ...editingReservation,
//         [e.target.name]: e.target.value,
//       });
//     } else {
//       setNewReservation({
//         ...newReservation,
//         [e.target.name]: e.target.value,
//       });
//     }
//   };

//   const toggleExpand = (id) => {
//     setExpandedReservation((prev) => (prev === id ? null : id));
//     setEditingReservation(null); // Exit editing mode when toggling expansion
//   };

//   const handleSignOut = () => {
//     localStorage.removeItem("token");
//     router.push("/login");
//   };

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       try {
//         const decodedToken = jwtDecode(token);
//         setUser({
//           name: decodedToken.name,
//           email: decodedToken.email,
//         });
//         fetchReservations();
//       } catch (error) {
//         console.error("Invalid token:", error);
//       }
//     } else {
//       router.push("/login");
//     }
//   }, []);

//   return (
//     <Box
//       sx={{
//         position: "relative",
//         width: "100%",
//         height: "100vh",
//         overflow: "hidden",
//       }}
//     >
//       <Box
//         sx={{
//           position: "absolute",
//           top: 0,
//           left: 0,
//           width: "100%",
//           height: "100%",
//           backgroundImage: "url(/assets/images/bg-img.png)",
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           opacity: 0.9,
//           zIndex: -5,
//         }}
//       />

//       <Box
//         sx={{
//           p: 2,
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           height: "100%",
//           backgroundColor: "rgba(255, 255, 255, 0.5)",
//         }}
//       >
//         <Box
//           sx={{
//             width: "100%",
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             mb: 2,
//           }}
//         >
//           <Box sx={{ display: "flex", alignItems: "center" }}>
//             <img
//               src="/assets/images/hd-icon.png"
//               alt="HD Icon"
//               style={{ width: 32, height: 32, marginRight: 8 }}
//             />
//             <Typography variant="h6" sx={{ color: "#232323" }}>
//               Dashboard
//             </Typography>
//           </Box>
//           <Button variant="text" onClick={handleSignOut} sx={{ color: "#367AFF" }}>
//             Sign Out
//           </Button>
//         </Box>

//         <Card sx={{ width: "90%", maxWidth: 500, mb: 3, p: 2, textAlign: "center" }}>
//           <CardContent>
//             <Typography variant="h6" fontWeight="bold">
//               Welcome, {user?.name || "User"}!
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               Email: {user?.email || "N/A"}
//             </Typography>
//           </CardContent>
//         </Card>

//         <Button
//           startIcon={<Add />}
//           variant="contained"
//           sx={{ width: "100%", maxWidth: 300, mb: 3 }}
//           onClick={() => setShowCreateForm(!showCreateForm)}
//         >
//           {showCreateForm ? "Cancel" : "Create Reservation"}
//         </Button>

//         {showCreateForm && (
//           <Box sx={{ width: "100%", maxWidth: 500, mb: 3 }}>
//             <TextField
//               name="reservationDateTime"
//               label="Date and Time"
//               type="datetime-local"
//               value={newReservation.reservationDateTime}
//               onChange={(e) => {
//                 const date = e.target.value.split("T")[0];
//                 fetchAvailableSlots(date);
//                 handleInputChange(e);
//               }}
//               fullWidth
//               sx={{ mb: 2 }}
//             />
//             <Select
//               name="numberOfGuests"
//               value={newReservation.numberOfGuests}
//               onChange={handleInputChange}
//               fullWidth
//               sx={{ mb: 2 }}
//             >
//               {[...Array(10).keys()].map((num) => (
//                 <MenuItem key={num + 1} value={num + 1}>
//                   {num + 1}
//                 </MenuItem>
//               ))}
//             </Select>
//             <TextField
//               name="name"
//               label="Name"
//               value={newReservation.name}
//               onChange={handleInputChange}
//               fullWidth
//               sx={{ mb: 2 }}
//             />
//             <TextField
//               name="contactDetails"
//               label="Contact Details"
//               value={newReservation.contactDetails}
//               onChange={handleInputChange}
//               fullWidth
//               sx={{ mb: 2 }}
//             />
//             <Button variant="contained" onClick={handleCreateReservation} fullWidth>
//               Save Reservation
//             </Button>
//           </Box>
//         )}

//         <Box sx={{ width: "100%", maxWidth: 500, flexGrow: 1, overflowY: "auto" }}>
//           <Typography variant="h6" gutterBottom>
//             Reservations
//           </Typography>
//           <Grid container spacing={2}>
//             {reservations.map((res) => (
//               <Grid item xs={12} key={res._id}>
//                 <Card sx={{ p: 1.5 }}>
//                   <Box
//                     onClick={() => toggleExpand(res._id)}
//                     sx={{
//                       cursor: "pointer",
//                       display: "flex",
//                       justifyContent: "space-between",
//                     }}
//                   >
//                     <Box>
//                       <Typography variant="subtitle1" fontWeight="bold">
//                         {res.name} - {res.reservationDateTime}
//                       </Typography>
//                       <Typography variant="body2">
//                         Guests: {res.numberOfGuests}
//                       </Typography>
//                     </Box>
//                     <IconButton>
//                       {expandedReservation === res._id ? <ExpandLess /> : <ExpandMore />}
//                     </IconButton>
//                   </Box>
//                   {expandedReservation === res._id && (
//                     <Box sx={{ mt: 2 }}>
//                       {editingReservation?._id === res._id ? (
//                         <Box>
//                           <TextField
//                             name="name"
//                             label="Name"
//                             value={editingReservation.name}
//                             onChange={handleInputChange}
//                             fullWidth
//                             sx={{ mb: 2 }}
//                           />
//                           <TextField
//                             name="contactDetails"
//                             label="Contact Details"
//                             value={editingReservation.contactDetails}
//                             onChange={handleInputChange}
//                             fullWidth
//                             sx={{ mb: 2 }}
//                           />
//                           <Box sx={{ display: "flex", justifyContent: "space-between" }}>
//                             <Button variant="outlined" onClick={handleEditCancel}>
//                               Cancel
//                             </Button>
//                             <Button variant="contained" onClick={handleEditSave}>
//                               Save
//                             </Button>
//                           </Box>
//                         </Box>
//                       ) : (
//                         <Box sx={{ display: "flex", justifyContent: "space-between" }}>
//                           <IconButton onClick={() => handleEditStart(res)}>
//                             <Edit />
//                           </IconButton>
//                           <IconButton onClick={() => handleDeleteReservation(res._id)}>
//                             <Delete />
//                           </IconButton>
//                           <Button
//                             variant="text"
//                             onClick={() => fetchBookingSummary(res._id)}
//                           >
//                             View Summary
//                           </Button>
//                         </Box>
//                       )}
//                     </Box>
//                   )}
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>
//         </Box>

//         <Modal open={showSummary} onClose={() => setShowSummary(false)}>
//           <Box sx={{ p: 4, backgroundColor: "white", borderRadius: "8px" }}>
//             <Typography variant="h6" gutterBottom>
//               Booking Summary
//             </Typography>
//             <Typography variant="body2">
//               {summaryData ? JSON.stringify(summaryData, null, 2) : "Loading..."}
//             </Typography>
//           </Box>
//         </Modal>
//       </Box>
//     </Box>
//   );
// };

// export default Dashboard;


import { useEffect, useState } from "react";
import {Button,Box,Typography,Grid,Card,CardContent,IconButton,TextField,MenuItem,Select,Modal,} from "@mui/material";
import {Delete,Edit,Save,Cancel,ExpandMore,ExpandLess,Add,} from "@mui/icons-material";
import { jwtDecode } from "jwt-decode";
import api from "../services/api";
import { useRouter } from "next/router";
import Image from 'next/image';
import { format } from 'date-fns';

const Dashboard = () => {
  const [reservations, setReservations] = useState([]);
  const [expandedReservation, setExpandedReservation] = useState(null);
  const [editingReservation, setEditingReservation] = useState(null);
  const [newReservation, setNewReservation] = useState({reservationDateTime: "",numberOfGuests: "",name: "",phoneNumber: "",
    email: "",
    restaurantName: "",
  });
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [user, setUser] = useState(null);
  const [showSummary, setShowSummary] = useState(false);
  const [summaryData, setSummaryData] = useState(null);
  const router = useRouter();

  const restaurantOptions = ["Pasta Palace","Grill House","Sushi Central","Pizza Haven","Vegan Delight","Steak Corner"];

  const fetchReservations = async () => {
    if (!user?.email) return;
    try {
      const response = await api.get(`/notes/email/${user.email}`);
      setReservations(response.data.bookings);
    } catch (error) {
      console.error("Error fetching reservations:", error);
    }
  };

  const handleDeleteReservation = async (id) => {
    try {
      await api.delete(`/notes/${id}`);
      setReservations(reservations.filter((res) => res._id !== id));
    } catch (error) {
      console.error("Error deleting reservation:", error);
    }
  };

  const handleEditStart = (reservation) => {
    setEditingReservation({ ...reservation });
  };

  const handleEditCancel = () => {
    setEditingReservation(null);
  };

  const handleEditSave = async () => {
    if (editingReservation) {
      try {
        const response = await api.put(`/notes/${editingReservation._id}`, editingReservation);
        setReservations((prev) =>
          prev.map((res) =>
            res._id === editingReservation._id ? response.data.reservation : res
          )
        );
        setEditingReservation(null);
      } catch (error) {
        console.error("Error updating reservation:", error);
      }
    }
  };

  const fetchAvailableSlots = async (date) => {
    try {
      const response = await api.get(`/notes/available-slots/${date}`);
      setAvailableSlots(response.data.availableTimeSlots);
    } catch (error) {
      console.error("Error fetching available slots:", error);
    }
  };

  const fetchBookingSummary = async (id) => {
    try {
      const response = await api.get(`/notes/summary/${id}`);
      setSummaryData(response.data.reservation);
      setShowSummary(true);
    } catch (error) {
      console.error("Error fetching booking summary:", error);
    }
  };

  const handleCreateReservation = async () => {
    const { reservationDateTime, numberOfGuests, name, phoneNumber, restaurantName } = newReservation;
  
    // Validate required fields
    if (!reservationDateTime || !numberOfGuests || !name || !phoneNumber || !restaurantName) {
      alert("Please fill out all required fields.");
      return;
    }
  
    try {
      const formattedDateTime = new Date(reservationDateTime).toISOString();
  
      // Make the API call with the user's email autofilled
      const response = await api.post(`/notes`, {
        ...newReservation,
        reservationDateTime: formattedDateTime,
        email: user.email, // Use logged-in user's email
      });
  
      if (response.data.message === "Time slot already booked") {
        alert("Time slot already booked. Please select a different time or restaurant.");
        return;
      }
  
      alert("Booking created successfully!");
      setReservations((prev) => [response.data.reservation, ...prev]);
      setNewReservation({
        reservationDateTime: "",
        numberOfGuests: "",
        name: "",
        phoneNumber: "",
        email: user.email, // Keep email autofilled for new forms
        restaurantName: "",
      });
      setShowCreateForm(false);
    } catch (error) {
      console.error("Error creating reservation:", error);
      alert("Error creating reservation. Please try again.");
    }
  };
  
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editingReservation) {
      setEditingReservation((prev) => ({ ...prev, [name]: value }));
    } else {
      setNewReservation((prev) => ({ ...prev, [name]: value }));
    }
  };

  const toggleExpand = (id) => {
    setExpandedReservation((prev) => (prev === id ? null : id));
    setEditingReservation(null);
  };

  const handleSignOut = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUser({
          name: decodedToken.name,
          email: decodedToken.email,
        });
      } catch (error) {
        console.error("Invalid token:", error);
      }
    } else {
      router.push("/login");
    }
  }, []);

  useEffect(() => {
    fetchReservations();
  }, [user]);

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: "url(/assets/images/bg-img.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.9,
          zIndex: -5,
        }}
      />
  
      <Box
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "100%",
          backgroundColor: "rgba(255, 255, 255, 0.5)",
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Image
              src="/assets/images/hd-icon.png"
              alt="HD Icon"
              width={32}
              height={32}
              style={{ marginRight: 8 }}
            />
            <Typography variant="h6" sx={{ color: "#232323" }}>
              Dashboard
            </Typography>
          </Box>
          <Button variant="text" onClick={handleSignOut} sx={{ color: "#367AFF" }}>
            Sign Out
          </Button>
        </Box>
  
        <Card sx={{ width: "90%", maxWidth: 500, mb: 3, p: 2, textAlign: "center" }}>
          <CardContent>
            <Typography variant="h6" fontWeight="bold">
              Welcome, {user?.name || "User"}!
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Email: {user?.email || "N/A"}
            </Typography>
          </CardContent>
        </Card>
  
        <Button
          startIcon={<Add />}
          variant="contained"
          sx={{ width: "100%", maxWidth: 300, mb: 3 }}
          onClick={() => setShowCreateForm(!showCreateForm)}
        >
          {showCreateForm ? "Cancel" : "Create Reservation"}
        </Button>
  
        {showCreateForm && (
          <Box sx={{ width: "100%", maxWidth: 500, mb: 3 }}>
            <TextField
  name="reservationDateTime"
  label="Date and Time"
  type="datetime-local"
  value={newReservation.reservationDateTime}
  onChange={(e) => {
    const date = e.target.value.split("T")[0];
    fetchAvailableSlots(date);
    handleInputChange(e);
  }}
  fullWidth
  sx={{ mb: 2 }}
  InputLabelProps={{
    shrink: true, // Always show the label
  }}
  placeholder="YYYY-MM-DDTHH:MM" // Placeholder to show the format
/>
<Select
  name="numberOfGuests"
  value={newReservation.numberOfGuests}
  onChange={handleInputChange}
  fullWidth
  displayEmpty
  sx={{ mb: 2 }}
>
  <MenuItem value="" disabled>
    Guests
  </MenuItem>
  {[...Array(10).keys()].map((num) => (
    <MenuItem key={num + 1} value={num + 1}>
      {num + 1}
    </MenuItem>
  ))}
</Select>
            <Select
              name="restaurantName"
              value={newReservation.restaurantName}
              onChange={handleInputChange}
              fullWidth
              sx={{ mb: 2 }}
              displayEmpty
            >
              <MenuItem value="" disabled>
                Select Restaurant
              </MenuItem>
              {restaurantOptions.map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
            <TextField
              name="name"
              label="Name"
              value={newReservation.name}
              onChange={handleInputChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              name="phoneNumber"
              label="Phone Number"
              value={newReservation.phoneNumber}
              onChange={handleInputChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Email"
              value={user.email} // Display the logged-in user's email
              fullWidth
              sx={{ mb: 2 }}
              InputProps={{
                readOnly: true, // Make it non-editable
              }}
            />
            <Button variant="contained" onClick={handleCreateReservation} fullWidth>
              Save Reservation
            </Button>
          </Box>
        )}
  
        <Box sx={{ width: "100%", maxWidth: 500, flexGrow: 1, overflowY: "auto" }}>
          <Typography variant="h6" gutterBottom>
            Reservations
          </Typography>
          <Grid container spacing={2}>
            {reservations.map((res) => (
              <Grid item xs={12} key={res._id}>
                <Card sx={{ p: 1.5 }}>
                  <Box
                    onClick={() => toggleExpand(res._id)}
                    sx={{
                      cursor: "pointer",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box>
                      <Typography variant="subtitle1" fontWeight="bold">
                        {res.name} -{" "}
                        {new Intl.DateTimeFormat("en-US", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                          hour: "numeric",
                          minute: "numeric",
                          hour12: true,
                        }).format(new Date(res.reservationDateTime))}
                      </Typography>
                      <Typography variant="body2">Guests: {res.numberOfGuests}</Typography>
                      <Typography variant="body2">
                        Restaurant: {res.restaurantName}
                      </Typography>
                    </Box>
                    <IconButton>
                      {expandedReservation === res._id ? <ExpandLess /> : <ExpandMore />}
                    </IconButton>
                  </Box>
                  {expandedReservation === res._id && (
                    <Box sx={{ mt: 2 }}>
                      {editingReservation?._id === res._id ? (
                        <Box>
                          <TextField
                            name="name"
                            label="Name"
                            value={editingReservation.name}
                            onChange={handleInputChange}
                            fullWidth
                            sx={{ mb: 2 }}
                          />
                          <TextField
                            name="phoneNumber"
                            label="Phone Number"
                            value={editingReservation.phoneNumber}
                            onChange={handleInputChange}
                            fullWidth
                            sx={{ mb: 2 }}
                          />
                          <TextField
                            name="email"
                            label="Email"
                            value={user.email}
                            fullWidth
                            sx={{ mb: 2 }}
                            InputProps={{
                              readOnly: true,
                            }}
                          />
                          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
  <Button variant="outlined" onClick={handleEditCancel}>
    Cancel
  </Button>
  <Button variant="contained" onClick={handleEditSave}>
    Save
  </Button>
</Box>
</Box>
) : (
<Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
  <Box sx={{ display: "flex", alignItems: "center" }}>
    <IconButton onClick={() => handleEditStart(res)}>
      <Edit />
    </IconButton>
    <IconButton onClick={() => handleDeleteReservation(res._id)}>
      <Delete />
    </IconButton>
  </Box>
  <Button
    variant="text"
    onClick={() => fetchBookingSummary(res._id)}
    sx={{ ml: 2 }} // Add margin-left to create space between the icons and the button
  >
    View Summary
  </Button>
</Box>
)}
</Box>
)}
</Card>
</Grid>
))}
</Grid>
</Box>

<Modal open={showSummary} onClose={() => setShowSummary(false)}>
  <Box sx={{ p: 4, backgroundColor: "white", borderRadius: "8px", maxWidth: 400, mx: "auto", mt: 4 }}>
    <Typography variant="h6" gutterBottom>
      Booking Summary
    </Typography>
    {summaryData ? (
      <Box>
        <TextField
          label="Name"
          value={summaryData.name}
          fullWidth
          margin="normal"
          InputProps={{ readOnly: true }}
        />
        <TextField
          label="Phone Number"
          value={summaryData.phoneNumber}
          fullWidth
          margin="normal"
          InputProps={{ readOnly: true }}
        />
        <TextField
          label="Number of Guests"
          value={summaryData.numberOfGuests}
          fullWidth
          margin="normal"
          InputProps={{ readOnly: true }}
        />
        <TextField
          label="Reservation DateTime"
          value={format(new Date(summaryData.reservationDateTime), "do MMM yyyy, h:mm a")}
          fullWidth
          margin="normal"
          InputProps={{ readOnly: true }}
        />
        <TextField
          label="Restaurant Name"
          value={summaryData.restaurantName}
          fullWidth
          margin="normal"
          InputProps={{ readOnly: true }}
        />
        <Button variant="contained" onClick={() => setShowSummary(false)} sx={{ mt: 2 }}>
          Close
        </Button>
      </Box>
    ) : (
      <Typography variant="body2">Loading...</Typography>
    )}
  </Box>
</Modal>
</Box>
</Box>
  );
  
};

export default Dashboard;


