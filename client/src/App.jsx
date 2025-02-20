import  { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/items")
      .then((res) => setItems(res.data))
      .catch((err) => console.log(err));
  }, []);

  const addItem = () => {
    axios.post("http://localhost:5000/items", { name: input })
      .then((res) => setItems([...items, res.data]));
    setInput("");
  };

  const deleteItem = (id) => {
    axios.delete(`http://localhost:5000/items/${id}`)
      .then(() => setItems(items.filter((item) => item._id !== id)));
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>MERN Stack CRUD</h1>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={addItem}>Add Product</button>
      <ul>
        {items.map((item) => (
          <li key={item._id}>
            {item.name} <button onClick={() => deleteItem(item._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
