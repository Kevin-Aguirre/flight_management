import { useState, useEffect } from "react"
import Flight from "../components/Flight"
import Modal from "../components/Modal"
import PurchaseFlight from "./PurchaseFlight"


export const UserFlightView = ({user, flights, }) => {
    const [selectedPurchaseFlight, setSelectedPurchaseFlight] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [myFlights, setMyFlights] = useState([])
    const [purchaseInfo, setPurchaseInfo] = useState({
        card_type: '',
        card_number: '',
        card_name: '',
        card_expiration: '',
    })

    useEffect(()=> {
        if (user) {
            fetch(`http://127.0.0.1:5002/api/my-flights/${user.user.email}`)
                .then(res => res.json())
                .then(data => setMyFlights(data))
        }

    }, [])

    const hasUserPurchased = (myFlights, airline_name, departure_time, flight_number) => {
        console.log(airline_name, departure_time, flight_number)
        for (const myFlight of myFlights) {
            if (myFlight.airline_name === airline_name && myFlight.departure_time === departure_time && myFlight.flight_number === flight_number) {
                return true
            }
        }
        return false
    }

    const handlePaymentChange = (e) => {
        const { name, value } = e.target;
        setPurchaseInfo((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleFlightPurchase = (e) => {
        e.preventDefault()
        if (!selectedPurchaseFlight) return 
        const purchaseFlightData = {
            airline_name: selectedPurchaseFlight.airline_name,
            departure_time: selectedPurchaseFlight.departure_time,
            flight_number: selectedPurchaseFlight.flight_number,
            email: user.user.email,
            sold_price: selectedPurchaseFlight.curr_price,
            card_type: purchaseInfo.card_type,
            card_number: purchaseInfo.card_number,
            card_name: purchaseInfo.card_name,
            card_expiration: purchaseInfo.card_expiration,
            purchase_datetime: new Date().toISOString(),
        }
        fetch("http://127.0.0.1:5002/api/purchase-flight", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(purchaseFlightData)  
        })
            .then(res => res.json())
            .then(data => {
                alert(JSON.stringify(data.message))
                setSelectedPurchaseFlight(null)
                setShowModal(false)
                fetch(`http://127.0.0.1:5002/api/my-flights/${user.user.email}`)
                    .then(res => res.json())
                    .then(data => setMyFlights(data))
            })
            .catch(e => {
                console.log("error, ", e)
            })
    }

    const flight_elems = flights.map((flight) => (
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
            <button 
                onClick={() => {
                    setSelectedPurchaseFlight(flight)
                    setShowModal(true)
                }}
                className="w-full rounded-md text-center text-xl font-bold py-4 mt-2  bg-green-200"
            >Purchase</button>
        </div>
    ))

    return (
        <div>
            {
                flight_elems.length !== 0 ? flight_elems : <div className="text-xl rounded-md font-bold text-center bg-gray-200 py-3  mt-1">No Future Flights Found</div>
            }
            {showModal && selectedPurchaseFlight && (
             <Modal isOpen={showModal} onClose={() => {setShowModal(false)}}>
                {selectedPurchaseFlight !== null &&
                    <>{
                    hasUserPurchased(myFlights, selectedPurchaseFlight.airline_name, selectedPurchaseFlight.departure_time, selectedPurchaseFlight.flight_number)
                    ? <div>You've already purchased this flight. Go to <strong>My Flights</strong> if you'd like to cancel it.</div> 
                    : <PurchaseFlight selectedPurchaseFlight={selectedPurchaseFlight} handleFlightPurchase={handleFlightPurchase} handlePaymentChange={handlePaymentChange} purchaseInfo={purchaseInfo}/>
                    }</>
                }
            </Modal>   
            )}
        </div>
    )
}