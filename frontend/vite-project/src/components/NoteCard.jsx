import { Link } from "react-router-dom";
import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { formatDate } from "../lib/utils";
import api from "../lib/axios.js"; // Importing the axios instance
import toast from "react-hot-toast";
const NoteCard = ({ note,setNotes}) => {

    const handleDelete = async (e,id) => {
    e.preventDefault(); // Prevent default form submission behavior 
    if(!window.confirm("Are you sure you want to delete this note?")) 
        return; // Exit if user cancels
    try{

await api.delete(`/notes/${id}`); // Using the axios instance to delete the note
setNotes((prev) => prev.filter((note) => note._id !== id)); // Update the state to remove the deleted note
        toast.success("Note deleted successfully");
        // Optionally, you can also trigger a state update to remove the note from the UI
    }
    catch (error) {
        console.log("Error deleting note", error);
        toast.error("Failed to delete note");
    }
};
  return (
    <Link
      to={`/note/${note._id}`}
      className="card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#00FF9D]"
    >
      <div className="card-body">
        <h3 className="card-title">{note.title}</h3>
        <p className="text-base-content/70 line-clamp-3">{note.content}</p>
        <div className="card-actions justify-between items-center mt-4">
          <span className="text-sm text-base-content/60">{formatDate(new Date(note.createdAt))}</span>
          <div className="flex items-center gap-1">
            <PenSquareIcon className="size-4" />
            <button className="btn btn-ghost btn-xs text-error" onClick={(e)=> handleDelete(e,note._id)}>
              <Trash2Icon className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NoteCard;