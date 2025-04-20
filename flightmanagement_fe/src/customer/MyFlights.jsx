import { useState, useEffect } from "react"
import Flight from "../components/Flight"
import Modal from "../components/Modal"
import { flushSync } from "react-dom"

export default function MyFlights({user, setUser}) {
    const [selectedFlight, setSelectedFlight] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [myFlights, setMyFlights] = useState([])
    const [rating, setRating] = useState("1")
    const [reviewText, setReviewText] = useState("")

    const isFlightMoreThanDayFromNow = (departure_time) => {
        const now = new Date();
        const oneDayFromNow = new Date(now.getTime() + 24 * 60 * 60 * 1000); 
        return new Date(departure_time) > oneDayFromNow
    }

    const handleReviewSubmit = (e) => {
        e.preventDefault()
        if (!selectedFlight) return
        const reviewData = {
            airline_name: selectedFlight.airline_name,
            departure_time: selectedFlight.departure_time,
            flight_number: selectedFlight.flight_number,
            email: user.user.email,
            rating: rating,
            reviewText: reviewText,
        }
        alert("Submitting, " + JSON.stringify(reviewData))

        fetch("http://127.0.0.1:5002/api/submit-review", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(reviewData)
        })
            .then(async (res) => {
                const data = await res.json()
                if (res.ok) {
                    alert(data.message)
                    setSelectedFlight(null)
                    setShowModal(false)
                    setRating("1")
                    setReviewText("")
                } else {
                    alert(data.error)
                    setSelectedFlight(null)
                    setShowModal(false)
                    setRating("1")
                    setReviewText("")
                }
            })
            .catch(e => {
                console.log("error, ", e)
            })

    }
    
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

    const hasFlightPassed = (arrival_datetime) => {
        console.log(new Date(arrival_datetime))
        console.log(new Date())
        return new Date() > new Date(arrival_datetime)
    }

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

    const myFlightElems = myFlights.map((flight) => (
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
            myFlightElems.length !== 0 
            ? 
            myFlightElems 
            :
            <div className="py-8 px-10 bg-gray-200 mt-2 rounded-md text-center text-2xl font-bold">You Haven't Purchased Any Flights</div>}
            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                <h1 className="font-bold py-2 text-center text-2xl">
                    Write a Review
                </h1>
                <hr/>
                <form onSubmit={handleReviewSubmit}>
                    <div className="mt-2 flex">
                        <label className="mr-6 text-l inline">Your Review</label>
                        <select
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                            required
                            className="w-full p-2 border rounded-md"
                            >
                            {[...Array(10)].map((_, i) => (
                                <option key={i + 1} value={i + 1}>
                                {i + 1}
                                </option>
                            ))}
                            </select>
                    </div>
                    <textarea
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        placeholder="Write your review here..."
                        className="mt-2 w-full block rounded-md resize-none p-2 h-32"
                        required
                        maxLength={100}

                    />
                    <button className="font-bold mt-2 rounded-md text-center pflex w-full text-center bg-blue-500 text-white px-4 py-2 text-center">
                        Submit Review
                    </button>
                </form>
            </Modal>
        </div>
    </>
    )
}
