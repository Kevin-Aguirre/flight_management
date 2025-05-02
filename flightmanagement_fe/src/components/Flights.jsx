import { useEffect, useLayoutEffect, useState } from "react"
import { UserFlightView } from "../customer/UserFlightView"
import { StaffFlightView } from "../staff/StaffFlightView"
import { AnonymousFlightView } from "../anon/AnonymousFlightView"

const renderFlightView = (user, flights, setFlights) => {
    const futureFlights = flights.filter((f) => new Date(f.departure_time) > new Date())
    switch (user?.type) {
      case "customer":
        return <UserFlightView user={user} flights={futureFlights} setFlights={setFlights}/>;
      case "staff":
        return <StaffFlightView user={user} flights={flights} setFlights={setFlights}/>;  
      default:
        return <AnonymousFlightView user={user} flights={futureFlights}/>;
    }
  };

export default function FutureFlights({user, setUser}) {
    const [allFlights, setAllFlights] = useState([])
    
    useEffect(()=> {
        fetch("http://127.0.0.1:5002/api/get-flights")
            .then(res => res.json())
            .then(data => {
                setAllFlights(data)
            })

    }, [])
    
    return (
    <>
        <div className="my-10 mx-10 ">
            <h1 className="font-bold text-center text-3xl mb-5">Flights</h1>
            <hr className=""/>
            {
                allFlights.length !== 0 
                ? renderFlightView(user, allFlights, setAllFlights)
                : <div className="py-8 px-10 bg-gray-200 mt-2 rounded-md text-center text-2xl font-bold">No Upcoming Flights</div>
            }
        </div>
    </>
    )

}
