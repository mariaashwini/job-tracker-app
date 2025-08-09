import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext.js";
import React,{ useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export default React.memo(function Navbar() {
  const { logout } = useContext(UserContext);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <div className="bg-black text-white flex justify-between items-center px-6 py-4">
      <div className="flex items-center gap-2">
        <div className="text-3xl font-bold text-red-600">M</div>
      </div>
      <div className="flex-1 flex justify-center">
        <h1 className="text-center text-2xl font-bold">Job Tracker</h1>
      </div>
      <div className="flex items-start justify-start min-w-[200px] text-white text-xl gap-6 ml-[-20px] py-4">
        <NavLink className="" to="/dashboard/jobs">
          Jobs
        </NavLink>
        <NavLink className="" to="/dashboard/charts">
          Metrics
        </NavLink>
      </div>

      {user && (
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded-full flex justify-center items-center text-black font-bold">
              <FontAwesomeIcon icon={faUser} />
            </div>
            <span>
              Hi {user.name.charAt(0).toUpperCase() + user.name.slice(1)}
            </span>
          </div>
          <div>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
    // <div className="bg-black flex items-center justify-center text-white h-16">
    //   <h1 className="text-center text-2xl font-bold">Job Tracker</h1>

    // <div className="menu-bar">
    //   {!user ? (
    //    <>
    //       <NavLink className="nav-link" to="/register">
    //         Register
    //       </NavLink>
    //       <NavLink className="nav-link" to="/login">
    //         Login
    //       </NavLink>
    //     </>
    //   ) : (
    //      <>
    //       <NavLink className="nav-link" to="/dashboard/add-job">
    //         Add Job
    //       </NavLink>
    //         <NavLink className="nav-link" to="/dashboard/jobs">
    //        Job List
    //       </NavLink>
    //         <NavLink className="nav-link" to="/dashboard/charts">
    //        Charts
    //       </NavLink>
    //        <NavLink to="/logout" className="nav-link" onClick={handleLogout}>
    //           Logout
    //         </NavLink>
    //     </>
    //   )}
    // </div> */}
    // </div>
  );
});
