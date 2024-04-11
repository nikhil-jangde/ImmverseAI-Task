import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../components/NavBar";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useNavigate } from "react-router-dom";
import BookTickets from "./BookTickets";

function AvailableTickets({ user }) {
  const [selectedTicket,setSelectedTicket] = useState()
  const [isBook,setIsBook] = useState(false)
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState(tickets);
  const [currentPage, setCurrentPage] = useState(1);
  const [priceRange, setPriceRange] = useState([0, 50]);
  const [ticketsPerPage] = useState(5);
  const navigate = useNavigate();
  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/tickets`);
      setTickets(response.data);
      setFilteredTickets(response.data); // Initially, set filtered tickets to all tickets
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    const startIndex = (page - 1) * ticketsPerPage;
    const endIndex = startIndex + ticketsPerPage;
    setFilteredTickets(tickets.slice(startIndex, endIndex));
  };

  const handleSortByPrice = (value) => {
    setPriceRange(value);
    const filteredprice = tickets.filter(
      (data) => data.price >= value[0] && data.price <= value[1]
    );
    setFilteredTickets(filteredprice);
  };



  const handleSortByAvaibality = (param) => {
    const filteredData = tickets.filter((data) => data.availability === param);
    setFilteredTickets(filteredData);
  };

  const handleCheckboxChange = (param) => {
    // Uncheck the opposite checkbox when one is checked
    if (param  === true) {
      document.getElementById("booked").checked = false;
    } else {
      document.getElementById("available").checked = false;
    }
    handleSortByAvaibality(param);
  };

const handleSelectTicket=(ticket)=>{
 setSelectedTicket(ticket)
 setIsBook(true)
}

const handlepopup = () => {
  setIsBook(false); 
};

  return (
    <>
      <div className="w-full h-[90vh]">
        <div className="w-full flex h-[90vh] p-1 gap-1">
          <div className="w-[20%] relative border py-8 px-4 border-gray-800">
            <div className=" absolute top-0 right-0 border-b border-gray-800 left-0 p-1 font-bold text-center text-lg bg-blue-500">
              Filter
            </div>

            <div className="w-full  my-4">
              <div className="bg-gray-800 px-4 py-2 space-y-2 rounded-xl">
                <h2 className="font-semibold text-center text-white">
                  Sort by price
                </h2>
                <div className="flex justify-between">
                  <h1 className="text-white">{priceRange[0]}</h1>
                  <h1 className="text-white">{priceRange[1]}</h1>
                </div>
                <Slider
                  range
                  value={priceRange}
                  onChange={handleSortByPrice}
                  min={0}
                  max={200}
                />
              </div>
            </div>

            <div className="w-full  my-4">
              <div className="bg-gray-800 px-4 py-2 space-y-2 rounded-xl">
                <h2 className="font-semibold text-center text-white">
                  Sort by Availability
                </h2>
                <div className="flex items-center justify-between ">
                  <label
                    htmlFor="available"
                    className="text-md font-bold text-white"
                  >
                    Available
                  </label>
                  <input
                    id="available"
                    type="checkbox"
                    className="h-5 w-5 cursor-pointer"
                    onChange={() => handleCheckboxChange(true)}
                  />
                </div>
                <div className="flex items-center justify-between ">
                  <label
                    htmlFor="booked"
                    className="text-md font-bold text-white"
                  >
                    Booked
                  </label>
                  <input
                    id="booked"
                    type="checkbox"
                    className="h-5 w-5 cursor-pointer"
                    onChange={() => handleCheckboxChange(false)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="w-[80%] relative border border-gray-800 p-8">
            <div className="absolute top-0 right-0 left-0 p-1 border-b border-gray-800 font-bold text-center text-lg  bg-blue-500">
              All Tickets
            </div>
            <div className="h-full overflow-auto scrollbar-hide">
              <div className="p-8">
                {filteredTickets.map((ticket) => (
                  <div
                    key={ticket.id}
                    className="bg-emerald-500 rounded-lg shadow-md p-4 mb-4"
                  >
                    <h2 className="text-lg font-bold">{ticket.title}</h2>
                    <p className="text-sm text-gray-500 mb-2">
                      {ticket.description}
                    </p>
                    <div className="flex justify-between">
                      <p className="text-lg font-bold">Rs.{ticket.price}</p>
                      {ticket.availability ? (
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={()=>handleSelectTicket(ticket)}>
                          Book Now
                        </button>
                      ) : (
                        <button className="bg-red-500 cursor-not-allowed hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                          Sold
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute bottom-0 right-0 left-0 p-1 border-b border-gray-800 font-bold text-center text-lg  bg-blue-500">
              {Array.from(
                { length: Math.ceil(tickets.length / ticketsPerPage) },
                (_, index) => (
                  <span
                    key={index}
                    className={`cursor-pointer mx-1 ${
                      currentPage === index + 1 ? "text-blue-700" : "text-white"
                    }`}
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      </div>
      {isBook && 
      <div className="absolute top-0 left-0 w-full z-50">
          <BookTickets handlepopup={handlepopup} selectedTicket={selectedTicket} user={user} />
        </div>}
    </>
  );
}

export default AvailableTickets;
