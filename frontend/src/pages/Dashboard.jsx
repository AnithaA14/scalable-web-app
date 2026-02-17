import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [search, setSearch] = useState("");

  const token = localStorage.getItem("token"); // JWT token from login

  // ✅ Fetch all dashboard data
  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:5001/api/dashboard", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setData(res.data.data); // backend should return { success: true, data: [...] }
    } catch (error) {
      console.error(error);
      alert("Failed to fetch dashboard data");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ✅ Add new dashboard item
  const addData = async () => {
    if (!title.trim()) return alert("Title is required");

    try {
      await axios.post(
        "http://localhost:5001/api/dashboard/add",
        { title, description },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setTitle("");
      setDescription("");
      fetchData(); // refresh the list
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Add Failed");
    }
  };

  // ✅ Delete dashboard item
  const deleteData = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/dashboard/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      fetchData(); // refresh the list
    } catch (error) {
      console.error(error);
      alert("Delete Failed");
    }
  };

  // ✅ Filter data based on search input
  const filteredData = data.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-5">
      <h2 className="text-3xl font-bold mb-6 text-center">Dashboard</h2>

      {/* Add Section */}
      <div className="flex flex-col gap-3 mb-6 bg-white p-4 rounded shadow">
        <input
          type="text"
          placeholder="Enter Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded"
        />

        <textarea
          placeholder="Enter Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 rounded"
        />

        <button
          onClick={addData}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add
        </button>
      </div>

      {/* Search Section */}
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 rounded w-full mb-5"
      />

      {/* List Section */}
      <ul className="space-y-3">
        {filteredData.map((item) => (
          <li
            key={item._id}
            className="bg-white p-4 rounded shadow flex justify-between items-center"
          >
            <div>
              <h3 className="font-bold text-lg">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>

            <button
              onClick={() => deleteData(item._id)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
