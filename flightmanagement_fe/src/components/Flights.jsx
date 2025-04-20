import { useEffect, useLayoutEffect, useState } from "react"
import Flight from "./Flight"
import Modal from "./Modal"
import EditFlight from "../staff/EditFlight"
import ViewCustomers from "../staff/ViewCustomers"
import ViewRatings from "../staff/ViewRatings"
import PurchaseFlight from "../customer/PurchaseFlight"
import { flushSync } from "react-dom"


const UserFlightView = ({user, flights, }) => {
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
            {flight_elems}
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

const StaffFlightView = ({user, flights, setFlights}) => {
    const [newFlightStatus, setNewFlightStatus] = useState(null)
    
    const [selectedEditFlight, setSelectedEditFlight] = useState(null)
    const [showEditModal, setShowEditModal] = useState(false)

    const [selectedViewCustFlight, setSelectedViewCustFlight] = useState(null)
    const [showViewModal, setShowViewModal] = useState(false)

    const [selectedViewRatingFlight, setSelectedViewRatingFlight] = useState(null)
    const [showRatingModal, setShowRatingModal] = useState(false)


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
                            setFlights(data)
                        })
                } else {
                    alert(data.error)
                }
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
            {flight_elems}
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

const AnonymousFlightView = ({user, flights}) => {
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
        </div>
    ))

    return flight_elems
}

const renderFlightView = (user, flights, setFlights) => {

    switch (user?.type) {
      case "customer":
        console.log(flights)
        console.log(new Date().toISOString())
        const futureFlights = flights.filter((f) => new Date(f.departure_time) > new Date())
        return <UserFlightView user={user} flights={futureFlights} setFlights={setFlights}/>;
      case "staff":
        return <StaffFlightView user={user} flights={flights} setFlights={setFlights}/>;  
      default:
        return <AnonymousFlightView user={user} flights={flights}/>;
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
