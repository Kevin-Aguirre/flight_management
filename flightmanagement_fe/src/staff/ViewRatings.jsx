import { useEffect, useState } from "react"

export default function ViewRatings({ flight }) {
    const [ratings, setRatings] = useState([])

    useEffect(() => {
        if (!flight) return 

        const searchParams = new URLSearchParams({
            airline_name: flight.airline_name,
            departure_time: flight.departure_time,
            flight_number: flight.flight_number,
        })        

        fetch(`http://127.0.0.1:5002/api/get-ratings?${searchParams.toString()}`)
            .then(res => res.json())
            .then(data => {
                setRatings(data)
            })

    }, [flight])
    
    const ratingElems = ratings.map((rating) => (
        <div className="rounded-md my-2 py-2 px-4 bg-gray-200">
            <div className="flex justify-between">
                <p><strong>Email:</strong> {rating.email}</p>
                <p><strong>Rating:</strong> {rating.customer_rating}/10</p>
            </div>
            <p><strong>Comment:</strong></p>
            <p>{rating.customer_comment}</p>
        </div>
    ))

    return (
        <div>
            <h1 className="text-center font-bold text-2xl">
                Ratings ({ratingElems.length})
            </h1>
            <hr/>
            <h2><strong>Average Rating: </strong>{ratings.length !== 0 ? Number(ratings[0].average_rating) : "None"}</h2>
            {ratingElems}
        </div>
    )
}