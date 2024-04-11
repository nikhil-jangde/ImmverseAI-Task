import React, { useState, useEffect } from "react";
import axios from "axios";

function MyTickets({ user }) {
  const [tickets, setTickets] = useState([]);
  const [param, setParam] = useState();
  const [isConfirm, setIsConfirm] = useState(false);
  console.log(tickets);

  useEffect(() => {
    setTickets(user.bookingData);
    console.log(user);
  }, [user]);

  const onCancelTicket = async () => {
    setIsConfirm(false)
    try {
      const response =  await axios.put(
        `http://localhost:5000/api/cancelTicket/${param}`,
        {userId: user.userId }
      );
      if (response.status === 200 ) {
        alert("successfully cancelled'");
        window.location.reload()
      }
    } catch (error) {
      console.error("Error cancel ticket:", error);
    }
  };

  return (
    <>
      <div className="w-full h-[90vh] flex justify-center bg-gray-200">
        <div className="relative w-[50%] min-h-[80vh] bg-white p-4 overflow-y-auto">
          <div className="border-b border-gray-800 p-1 font-bold text-center text-lg bg-blue-500 mb-4">
            My Tickets
          </div>
          {tickets.map((ticket) => (
            <div className="bg-white shadow-md p-4 border border-blue-700 rounded-lg mb-4">
              <div className="w-full flex justify-between">
                <h2 className="text-xl font-bold mb-2">{ticket.title}</h2>
                <h2 className="text-green-500 font-semibold mb-2">{ticket.status === "booked"?'Confirmed':''}</h2>
              </div>
              <p className="text-gray-600 mb-2">{ticket.description}</p>
              <div className="flex items-center justify-between">
                <p className="text-lg font-bold">Price: Rs.{ticket.price}</p>
                {ticket.status === "booked"? (
                  <button
                    className="bg-red-500 text-white font-bold py-2 px-4 rounded"
                    onClick={() => {
                      setParam(ticket.ticketId);
                      setIsConfirm(true);
                    }}
                  >
                    Cancel Ticket
                  </button>
                ) : (
                  <p className="text-red-500 font-bold">Cancelled</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {isConfirm && (
        <div className="w-full fixed top-0 left-0 h-screen flex justify-center items-center backdrop-blur-sm">
          <div className="w-fit h-fit p-4 bg-gray-800 rounded-2xl space-y-5 text-white font-semibold">
            <h1>Confirm you want to cancel Booking</h1>
            <div className="flex justify-end gap-5">
              <button
                className="bg-green-500 text-white font-bold p-1 border border-white rounded-lg hover:bg-blue-500"
                onClick={() => onCancelTicket(param)}
              >
                Confirm
              </button>
              <button
                className="bg-red-500 text-white font-bold p-1 border border-white rounded-lg hover:bg-blue-500"
                onClick={() => setIsConfirm(false)}
              >
                cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default MyTickets;
