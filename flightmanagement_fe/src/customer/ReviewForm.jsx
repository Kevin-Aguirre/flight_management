import { useState } from "react"
export default function ReviewForm({ selectedFlight, user, onClose }) {    
    const [rating, setRating] = useState("1")
    const [reviewText, setReviewText] = useState("")
    
    
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
                } else {
                    alert(data.error)
                }
                onClose()
            })
            .catch(e => {
                console.log("error, ", e)
                onClose()
            })
    
    }

    return ( 
        <div>
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
        </div>
    )
}