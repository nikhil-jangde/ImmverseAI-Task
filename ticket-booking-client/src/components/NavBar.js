import React from "react";
import profile from "../assets/2606572_5907.svg";
import {useNavigate} from 'react-router-dom';

function NavBar({ user }) {

  const navigate = useNavigate()

  const handleSignOut = () => {
    localStorage.removeItem("token");
    window.location.reload()
  };

  return (
    <div className="flex justify-between items-center h-[10vh] w-full py-1 z-50 px-5 bg-gray-800">
    <div className="flex items-center gap-5">
      <div className="text-xl font bold text-white rounded-tl rounded-br rounded-xl bg-emerald-700 p-2 cursor-pointer" onClick={()=>navigate('/')}> Book-Ticket.in </div>
      <div className=" border-l-[3px] border-red-600 p-1 text-white font-semibold cursor-pointer hover:bg-emerald-700 " 
      onClick={()=>navigate('/MyTickets')}>MyTickets</div>
      </div>
      {user &&  (
        <div className="flex items-center justify-center gap-5">
          <div>
            <img
              className="h-10 w-10 mx-auto rounded-full border-2 border-emerald-500"
              src={profile}
              alt=""
              width={0}
              height={0}
            />
            <div className="text-white text-center w-fit mx-auto">
              {user.username}
            </div>
          </div>

          <button className="bg-red-400 rounded-xl text-white font-semibold py-1 px-2  border border-white"
          onClick={handleSignOut}>
            Log Out
          </button>
        </div>
      )}
    </div>
  );
}

export default NavBar;
