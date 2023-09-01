import { useState, useEffect } from "react";
import "./App.css";
import { API } from "./assets/api";
import EditMessage from "./components/EditMessage";

function App() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");

  //fetches and sets messages
  async function fetchMessages() {
    const res = await fetch(`${API}/messages`);
    const info = await res.json();
    console.log(info);
    setMessages(info.messages);
  }

  //updates likes
  async function handleLikes(message) {
    const res = await fetch(`${API}/message/${message.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ likes: message.likes + 1 }),
    });
    const info = await res.json();
    if (info.success) {
      fetchMessages();
    }
  }

  //posting to the page
  async function handlePost(e) {
    e.preventDefault();
    try {
      const res = await fetch(`${API}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: inputValue,
        }),
      });

      if (!res.ok) {
        throw new Error("Request failed");
      }

      const info = await res.json();
      console.log(info);
      if (info.success) {
        console.log("hello this is a test");
        fetchMessages();
      }
    } catch (error) {
      console.error("Error during POST request:", error);
    }
  }

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  //DELETING
  async function handleDelete(message) {
    const res = await fetch(`${API}/message/${message.id}`, {
      method: "DELETE",
    });
    const info = await res.json();
    if (info.success) {
      fetchMessages();
    }
  }

   //Editing

  
  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <>
      <h1>Spammer</h1>
      <form onSubmit={handlePost}>
        <input
          type="text"
          placeholder="Whats your message?"
          value={inputValue}
          onChange={handleInputChange}
        />
        <button>Post Message</button>
      </form>
      {messages.map((message) => {
        return (
          <div key={message.id} className="message-container">
            <div>
              {message.text} 
            </div> 
             <button>🖊</button>
             <EditMessage 
              message={message}
              fetchMessages={fetchMessages}
             />  
            <div className="lower-buttons">
              <button>↩</button>
              <button onClick={() => handleLikes(message)}>
                👍{message.likes}
              </button>
              <button onClick={() => handleDelete(message)}>🚮</button>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default App;
