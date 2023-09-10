import { useState } from "react";
import { API } from "../assets/api";

export default function EditMessage({ message, fetchMessages }) {
  const [editedMessage, setEditedMessage] = useState("");

  async function handleEdit(e) {
    e.preventDefault();
    console.log(message.id)
    try {
      const res = await fetch(`${API}/messages/${message.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: editedMessage }),
      });
      const info = await res.json();
     
      if (info.success) {
        console.log("helloooo");
        fetchMessages();
      }
    } catch (error) {
      console.error("Error during PUT request:", error);
    }
  }

  return (
    <div>
      <form onSubmit={handleEdit}>
        <input
          value={editedMessage}
          onChange={(e) => setEditedMessage(e.target.value)}
          placeholder="Please Edit..."
        />
        <button>Edit User</button>
        {/* <button
          onClick={(e) => {
            e.preventDefault();
            // setIsEditingUser(false);
          }}
        >
          Cancel
        </button> */}
      </form>
    </div>
  );
}
