// BookTickets.js

import React, { useState } from "react";
import axios from "axios";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import { useNavigate } from "react-router-dom";

function BookTickets({ user, selectedTicket , handlepopup }) {
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState({
    username: "",
    email: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleBookTicket = async (e) => {
    alert(user.userId)
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.put(`http://localhost:5000/api/bookTicket/${selectedTicket._id}`, {
        username: details.username,
        email: details.email,
        title: selectedTicket.title,
        description: selectedTicket.description,
        price: selectedTicket.price,
        userId: user.userId,
      });
      if (response.status===200) {
        alert("Ticket added to user successfully")
        navigate("/MyTickets");
        window.location.reload()
      }
    } catch (error) {
      console.error("Error booking ticket:", error);
      // Handle specific errors or show error message to the user
    } finally {
      setLoading(false);
    }
  };
  
  const handleCancel = () => {
    handlepopup();
  };

  return (
    <>
      <div className="w-full text-white h-screen flex items-center justify-center backdrop-blur-sm ">
        <form
          onSubmit={handleBookTicket}
          className="bg-gray-800 w-[20%] p-10 rounded-lg"
        >
          <h2 className="text-lg text-emerald-500 font-bold mb-4">
            Please Confirm Booking
          </h2>
          <h2 className="text-md text-red-500 font-bold mb-4">
            Ticket : {selectedTicket.title}
          </h2>
          <label>Username</label>
          <input
            required
            type="text"
            name="username"
            value={details.username}
            onChange={handleChange}
            placeholder="Username"
            className="block w-full mb-2 p-2 border border-gray-300 rounded"
          />
          <label>Email</label>
          <input
            required
            type="email"
            name="email"
            value={details.email}
            onChange={handleChange}
            placeholder="Email"
            className="block w-full mb-2 p-2 border border-gray-300 rounded"
          />
          <button
            type="submit"
            className="bg-blue-500 mx-2 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Book {loading && <HourglassTopIcon />}
          </button>
          <button
            type="submit"
            className="bg-red-500 mx-2 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleCancel}
          >
            Cancel 
          </button>
        </form>
      </div>
    </>
  );
}

export default BookTickets;
