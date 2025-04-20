import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar({user, setUser}) {
    const navigate = useNavigate();

    const handleLogout = async () => {
        const res = await fetch('http://127.0.0.1:5002/api/logout')
        const data = await res.json()
        alert(data.message)
        setUser(null)
        navigate('/')
        localStorage.removeItem('data')
    }

    return (
        <nav className="py-4 px-8 font-bold text-white bg-blue-500 flex justify-between items-center">
            <p className="text-2xl">
                Flight Reservation System
            </p>

            <div className="text-xl">
                {
                    user?.type === "customer"
                    &&
                    <Link to="/my-flights" className="bg-green-600 rounded-md px-3 py-2 ml-5">
                        My Flights
                    </Link>    
                }
                {
                    user?.type === "staff"
                    &&
                    <>
                        <Link to="/view-reports" className="bg-purple-600 rounded-md px-3 py-2 ml-5">
                            View Reports
                        </Link>    
                        <Link to="/create-flight" className="bg-purple-600 rounded-md px-3 py-2 ml-5">
                            Create Flight
                        </Link>
                        <Link to="/add-plane" className="bg-purple-600 rounded-md px-3 py-2 ml-5">
                            Add Airplane
                        </Link>    
                        <Link to="/add-airport" className="bg-purple-600 rounded-md px-3 py-2 ml-5">
                            Add Airport
                        </Link>    
                    </>
                }
                <Link to="/future-flights" className="bg-blue-600 rounded-md px-3 py-2 ml-5">
                    View Future Flights
                </Link>
                {
                    !user
                    && 
                    <>
                        <Link to="/customer-login" className="bg-blue-600 rounded-md px-3 py-2 ml-5">
                            Customer Login
                        </Link>
                        <Link to="/staff-login" className="bg-blue-600 rounded-md px-3 py-2 ml-5">
                            Staff Login
                        </Link>
                        <Link to="/customer-register" className="bg-blue-600 rounded-md px-3 py-2 ml-5">
                            Customer Registration
                        </Link>
                        <Link to="/staff-register" className="bg-blue-600 rounded-md px-3 py-2 ml-5">
                            Staff Registration 
                        </Link>
                    </>
                }
                {
                    user 
                    &&
                    <button onClick={handleLogout} className="bg-red-600 rounded-md px-3 py-2 ml-5">
                        Logout
                    </button>

                }
            </div>
        </nav>
    )
}
