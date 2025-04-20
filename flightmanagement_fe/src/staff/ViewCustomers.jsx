import { useEffect, useState } from "react"

export default function ViewCustomers({ flight }) {
    const [customers, setCustomers] = useState([])
    useEffect(() => {
        if (!flight) return;

        const searchParams = new URLSearchParams({
            airline_name: flight.airline_name,
            departure_time: flight.departure_time,
            flight_number: flight.flight_number,
        })

        fetch(`http://127.0.0.1:5002/api/get-customers?${searchParams.toString()}`)
            .then(res => res.json())
            .then(data => {
                setCustomers(data)
            })


    }, [flight])

    const customerElems = customers.map((cust) => (
        <div className="rounded-md my-2 p-2 bg-gray-200">
            <p><strong>Name:</strong>          {cust.cust_name}</p>
            <p><strong>Email:</strong>         {cust.email}</p>
            <p><strong>Phone Number:</strong>  {cust.phone_number}</p>
            <p><strong>Date of Birth:</strong> {cust.dob}</p>
        </div>
    ))

    return (
        <div>
            <h1 className="text-center font-bold text-2xl">
                Customers ({customerElems.length})
            </h1>
            <hr/>
            {customerElems}
        </div>
    )
}