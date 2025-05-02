import { Link } from "react-router-dom"

export default function Home ({ user, setUser }) {
    if (!user) {
        return (
            <div className="rounded-md bg-gray-200 p-8 my-10 mx-10">
                <h1 className="text-center font-bold text-2xl">
                    Please select one of the following options to continue 
                </h1>
                <h2 className="text-gray-600 mb-2 mt-6 text-center font-bold">
                    New User?
                </h2>
                <div className="flex flex-col items-center text-center  ">
                    <Link to={'/customer-register'} className="block font-bold bg-gray-100 w-4/5 p-3 rounded-md my-2">Customer Registration</Link>
                    <Link to={'/staff-register'} className="block font-bold bg-gray-100 w-4/5 p-3 rounded-md my-2">Staff Registration</Link>
                </div>
                <hr/>
                <h2 className="text-gray-600 mb-2 mt-6 text-center font-bold">
                    Already have an account?
                </h2>
                <div className="flex flex-col items-center text-center  ">
                    <Link to={'/customer-login'} className="block font-bold bg-gray-100 w-4/5 p-3 rounded-md my-2">Customer Login</Link>
                    <Link to={'/staff-login'} className="block font-bold bg-gray-100 w-4/5 p-3 rounded-md my-2">Staff Login</Link>
                </div>
            </div> 
        ) 
    }


    return (
        user.type === "customer" 
        ? 
        <div className="rounded-md bg-gray-200 p-8 my-10 mx-10">
            <h1 className="text-center font-bold text-2xl">
                Welcome, {user.user.first_name} {user.user.last_name}
            </h1>
            <h2 className="text-gray-600 mb-6 text-center font-bold">
                What would you like to do today?
            </h2>
            <div className="flex flex-col items-center text-center  ">
                <Link to={'/my-flights'} className="block font-bold bg-gray-100 w-4/5 p-3 rounded-md my-2">View My Flights</Link>
                <Link to={'flights'} className="block font-bold bg-gray-100 w-4/5 p-3 rounded-md my-2">View Flights</Link>
            </div>
        </div>  
        :
        <div className="rounded-md bg-gray-200 p-8 my-10 mx-10">
            <h1 className="text-center font-bold text-2xl">
                Welcome, {user.user.first_name} {user.user.last_name}
            </h1>
            <h2 className="text-gray-600 mb-6 text-center font-bold">
                What would you like to do today?
            </h2>
            <div className="flex flex-col items-center text-center  ">
                <Link to={'/view-reports'} className="block font-bold bg-gray-100 w-4/5 p-3 rounded-md my-2">View Reports</Link>
                <Link to={'/create-flight'} className="block font-bold bg-gray-100 w-4/5 p-3 rounded-md my-2">Create Flight</Link>
                <Link to={'/add-plane'} className="block font-bold bg-gray-100 w-4/5 p-3 rounded-md my-2">Add Airplane</Link>
                <Link to={'/add-airport'} className="block font-bold bg-gray-100 w-4/5 p-3 rounded-md my-2">Add Airport</Link>
                <Link to={'flights'} className="block font-bold bg-gray-100 w-4/5 p-3 rounded-md my-2">View Flights</Link>
            </div>
        </div>  
    )
}