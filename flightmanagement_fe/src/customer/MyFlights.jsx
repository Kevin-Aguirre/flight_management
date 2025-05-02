import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Flight from "../components/Flight"
import Modal from "../components/Modal"
import ReviewForm from "./ReviewForm"
import {isFlightMoreThanDayFromNow, hasFlightPassed, filterFlights} from '../lib/flight'
import { FlightSearchForm } from "../components/FlightSearchForm"

export default function MyFlights({user, setUser}) {
    const navigate = useNavigate()
    
    useEffect(() => {
        if (user?.type !== "customer") navigate('/')    
    })

    const [appliedFilters, setAppliedFilters] = useState({
        source: "",
        destination: "",
        departureDate:  new Date().toISOString().split('T')[0],
        returnDate: "",
    });

    const handleApplyFilters = (filters) => {
        setAppliedFilters(filters);
    };

    const handleClearFilters = () => {
        setAppliedFilters({
            source: "",
            destination: "",
            departureDate: "",
            returnDate: "",
        });
    };

    
    
    const [selectedFlight, setSelectedFlight] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [myFlights, setMyFlights] = useState([])
    
    useEffect(() => {
        const data = localStorage.getItem('data')
        if (data) {
            const parsedUser = JSON.parse(data)
            console.log(parsedUser)
            setUser(parsedUser)
            fetch(`http://127.0.0.1:5002/api/my-flights/${parsedUser.user.email}`)
            .then(res => res.json())
            .then(data => setMyFlights(data))
        }
        
    }, [])
    
    const handleCancel = async (flight) => {
        const req = {
            airline_name: flight.airline_name,
            departure_time: flight.departure_time,
            flight_number: flight.flight_number,
            email: user.user.email
        }
        
        fetch("http://127.0.0.1:5002/api/cancel-flight", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(req)
        })
        .then(res => res.json())
        .then(data => {
            alert(data.message)
            setSelectedFlight(null)
            fetch(`http://127.0.0.1:5002/api/my-flights/${user.user.email}`)
            .then(res => res.json())
            .then(data => setMyFlights(data))
        })
        .catch(e => {
            console.log("error", e)
        })
        
    }
    
    
    const filteredFlights = filterFlights(myFlights, appliedFilters)
    const myFlightElems = filteredFlights.map((flight) => (
        <div className="mt-5 bg-gray-200 rounded-lg my-1 py-4 px-5 flex flex-col">
            <Flight
                airline_name = {flight.airline_name}
                departure_time = {flight.departure_time}
                arrival_datetime = {flight.arrival_datetime}
                departure_port_name = {flight.departure_port_name}
                departure_city = {flight.departure_city}
                departure_country = {flight.departure_country}
                arrival_port_name = {flight.arrival_port_name}
                arrival_city = {flight.arrival_city}
                arrival_country = {flight.arrival_country}
                base_price = {flight.base_price}
                flight_number = {flight.flight_number}
                flight_status = {flight.flight_status}
            />
            {
                isFlightMoreThanDayFromNow(flight.departure_time)
                &&
                <button 
                    onClick={() => {
                        setSelectedFlight(flight)
                        handleCancel(flight)
                    }} 
                    className="mt-2 w-full rounded-md text-center text-xl font-bold py-4 bg-red-200"
                >
                    Cancel
                </button>
            }
            {
                hasFlightPassed(flight.arrival_datetime)
                &&
                <button 
                    onClick={() => {
                        setSelectedFlight(flight)
                        setShowModal(true)
                    }} 
                    className="mt-2 w-full rounded-md text-center text-xl font-bold py-4 bg-yellow-200"
                >
                    Rate This Flight
                </button>
            }
            


        </div>
    ))

    return (
        <>
        <div className="my-10 mx-10 ">
            <h1 className="font-bold text-center text-3xl mb-5">
                Your Flights
            </h1>
            <hr className=""/>
            {
            myFlights.length !== 0 ? 
            <>
                <FlightSearchForm
                    onApply={handleApplyFilters}
                    onClear={handleClearFilters}
                    defaultValues={appliedFilters}
                />
                {myFlightElems.length !== 0 ? myFlightElems : <div className="bg-gray-100 w-full rounded-md mt-2 p-4 text-xl text-center font-bold">No Flights Match Your Search</div>} 
            </>
            :
            <div className="py-8 px-10 bg-gray-200 mt-2 rounded-md text-center text-2xl font-bold">You Haven't Purchased Any Flights</div>
            }
            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                {selectedFlight && (
                    <ReviewForm
                        selectedFlight={selectedFlight}
                        user={user}
                        onClose={() => {
                            setShowModal(false)
                            setSelectedFlight(null)
                        }}
                    />
                )}
            </Modal>
        </div>
    </>
    )
}
