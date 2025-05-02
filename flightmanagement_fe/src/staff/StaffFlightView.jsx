import { useState, useEffect } from "react"
import Flight from "../components/Flight"
import ViewRatings from "./ViewRatings"
import ViewCustomers from "./ViewCustomers"
import Modal from "../components/Modal"
import EditFlight from "./EditFlight"
import { filterFlights } from "../lib/flight"
import { FlightSearchForm } from "../components/FlightSearchForm"


export const StaffFlightView = ({user, flights, setFlights}) => {
    const [newFlightStatus, setNewFlightStatus] = useState(null)
    
    const [selectedEditFlight, setSelectedEditFlight] = useState(null)
    const [showEditModal, setShowEditModal] = useState(false)

    const [selectedViewCustFlight, setSelectedViewCustFlight] = useState(null)
    const [showViewModal, setShowViewModal] = useState(false)

    const [selectedViewRatingFlight, setSelectedViewRatingFlight] = useState(null)
    const [showRatingModal, setShowRatingModal] = useState(false)

    const today = new Date();
    const thirtyDaysLater = new Date();
    thirtyDaysLater.setDate(today.getDate() + 30);

    const [appliedFilters, setAppliedFilters] = useState({
        source: "",
        destination: "",
        departureDate: today.toISOString().split('T')[0],
        returnDate: thirtyDaysLater.toISOString().split('T')[0],
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

    const filteredFlights = filterFlights(flights, appliedFilters)


    const handleFlightStatusChange = (e) => {
        e.preventDefault()
        
        const req = {
            airline_name: selectedEditFlight.airline_name,
            flight_number: selectedEditFlight.flight_number,
            departure_time: selectedEditFlight.departure_time,
            flight_status: newFlightStatus,
        }

        fetch("http://127.0.0.1:5002/api/edit-flight-status", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(req)  
        })
            .then(async (res) => {
                const data = await res.json()
                if (res.ok) {
                    alert('Successfully changed status of flight.')
                    setSelectedEditFlight(null)
                    setShowEditModal(false)
                    fetch("http://127.0.0.1:5002/api/future-flights")
                        .then(res => res.json())
                        .then(data => {
                            setFlights(data.filter(flight => flight.airline_name === user.user.airline_name))
                        })
                } else {
                    alert(data.error)
                }
            })

    }

    const flight_elems = filteredFlights.map((flight) => (
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
            
            {user.user.airline_name == flight.airline_name
                &&
                <>
                    <button 
                        onClick={() => {
                            setSelectedEditFlight(flight)
                            setShowEditModal(true)
                        }}
                        className="w-full rounded-md text-center text-xl font-bold py-4 mt-2 bg-purple-300"
                    >Edit</button>
                    <button
                        onClick={() => {
                            setSelectedViewCustFlight(flight)
                            setShowViewModal(true)
                        }}
                        className="w-full rounded-md text-center text-xl font-bold py-4 mt-2 bg-purple-300"
                    >
                        View Passengers
                    </button>
                    <button
                        onClick={() => {
                            setSelectedViewRatingFlight(flight)
                            setShowRatingModal(true)
                        }}
                        className="w-full rounded-md text-center text-xl font-bold py-4 mt-2 bg-purple-300"
                    >
                        View Ratings 
                    </button>
                </>
            }
        </div>
    ))

    return (
        <div>
            <FlightSearchForm
                onApply={handleApplyFilters}
                onClear={handleClearFilters}
                defaultValues={appliedFilters}
            />
            {flight_elems.length !== 0 ? flight_elems : (
                <div className="text-xl rounded-md font-bold text-center bg-gray-200 py-3 mt-1">
                    No Future Flights Found
                </div>
            )}
            <Modal 
                isOpen={showEditModal} 
                onClose={() => setShowEditModal(false)}
            >
                {
                    selectedEditFlight !== null && 
                    <EditFlight 
                        selectedEditFlight={selectedEditFlight} 
                        setNewFlightStatus={setNewFlightStatus} 
                        handleFlightStatusChange={handleFlightStatusChange} 
                        newFlightStatus={newFlightStatus}
                    /> 
                }
            </Modal>
            <Modal
                isOpen={showViewModal}
                onClose={() => {setShowViewModal(false)}}
            >
                {
                    selectedViewCustFlight !== null && 
                    <ViewCustomers
                        flight={selectedViewCustFlight}
                    />
                }
            </Modal>
            <Modal
                isOpen={showRatingModal}
                onClose={() => {setShowRatingModal(false)}}
            >   
                {
                    selectedViewRatingFlight !== null && 
                    <ViewRatings
                        flight={selectedViewRatingFlight}
                    />
                }
            </Modal>
        </div>
    )
}