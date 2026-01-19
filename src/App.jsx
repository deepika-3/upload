import { useState } from "react";
import { supabase } from "./supabaseClient";

export default function App() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    age: ""
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = await supabase
      .from("users_info")
      .insert([
        {
          name: form.name,
          email: form.email,
          age: Number(form.age)
        }
      ]);

    if (error) {
      setStatus("❌ Error inserting data");
      console.error(error);
    } else {
      setStatus("✅ Data saved successfully");
      setForm({ name: "", email: "", age: "" });
    }
  };

  return (
    <div className="container">
      <h2>Upload User Info</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          name="age"
          type="number"
          placeholder="Age"
          value={form.age}
          onChange={handleChange}
          required
        />

        <button type="submit">Submit</button>
      </form>

      <p>{status}</p>
    </div>
  );
}
