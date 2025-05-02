import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateFlight({ user, setUser }) {
    const navigate = useNavigate()
    
    useEffect(() => {
        if (user?.type !== "staff") {
            navigate('/')
        }
        
    })
    
    const [planes, setPlanes] = useState([])
    const [airports, setAirports] = useState([])

    useEffect(() => {
        fetch(`http://127.0.0.1:5002/api/get-airports`)
            .then(res => res.json())
            .then(data => {
                setAirports(data)
            })
        fetch(`http://127.0.0.1:5002/api/get-planes/${encodeURIComponent(user.user.airline_name)}`)
            .then(res => res.json())
            .then(data => {
                setPlanes(data)
            })
    }, [])  

    const [form, setForm] = useState({
        source_port_code: '',
        dst_port_code: '',
        plane_ID: '',
        airline_name: user.user.airline_name,
        departure_date: '',
        departure_time_hr: '',
        departure_time_min: '',
        arrival_date: '',
        arrival_time_hr: '',
        arrival_time_min: '',
        base_price: '',
        flight_status: 'on-time'
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        for (const p in form) {
            if (form[p].length === 0) {
                alert("All fields must be given a value")
                return
            }
        }

        if (form.arrival_time_hr.length == 1) {
            form.arrival_time_hr = "0" + form.arrival_time_hr 
        }
        if (form.departure_time_hr.length == 1) {
            form.departure_time_hr = "0" + form.departure_time_hr 
        }

        const departureDateTimeString = `${form.departure_date}T${form.departure_time_hr}:${form.departure_time_min}:00Z`;
        const arrivalDateTimeString   = `${form.arrival_date}T${form.arrival_time_hr}:${form.arrival_time_min}:00Z`;
        const departureDateTime = new Date(departureDateTimeString)
        const arrivalDateTime = new Date(arrivalDateTimeString)

        console.log(departureDateTime.toISOString(), arrivalDateTime.toISOString())

        if (departureDateTime >= arrivalDateTime) {
            alert('departure time cant be after arrival time')
            return;
        }

        if (form.source_port_code === form.dst_port_code) {
            alert('Source Airport and Destination Airport cannot be the same.')
            return;
        }

        const req = {
            plane_ID: form.plane_ID,
            airline_name: form.airline_name,
            departure_datetime: departureDateTime.toISOString(),
            arrival_datetime: arrivalDateTime.toISOString(),
            base_price: form.base_price,
            flight_status: form.flight_status,
            source_port_code: form.source_port_code,
            dst_port_code: form.dst_port_code,
        }

        
        fetch("http://127.0.0.1:5002/api/create-flight", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: 'include',
            body: JSON.stringify(req)
        })
        .then(res => res.json())
        .then(data => {
            alert('Successfully created flight.')
            setForm({
                source_port_code: '',
                dst_port_code: '',
                plane_ID: '',
                airline_name: user.user.airline_name,
                departure_date: '',
                departure_time_hr: '',
                departure_time_min: '',
                arrival_date: '',
                arrival_time_hr: '',
                arrival_time_min: '',
                base_price: '',
                flight_status: 'on-time'
            })
        })
    
    }


    return (
        <div className="rounded-md bg-gray-100 mx-20 my-10 px-10">
            <h1 className="font-bold text-3xl text-center py-4">
                Create <p className="inline text-blue-600">{user.user.airline_name}</p> Flight
            </h1>
            <hr/>
            <form className="mt-4" onSubmit={handleSubmit}>
                <div className="flex mb-1 rounded-md py-4 px-4 text-xl font-bold bg-gray-300 items-center">
                    <label className="mr-5">Select Source Airport:</label>
                    <select
                        required 
                        onChange={handleChange}
                        name="source_port_code"
                        value={form.source_port_code}
                        className="p-2 rounded-md bg-white"
                    >
                        <option value="">Select an airport</option>
                        {airports.map(airport => (
                        <option key={airport.code} value={airport.code}>
                            {airport.port_name} ({airport.city}, {airport.country}), Code: {airport.code}
                        </option>
                        ))}
                    </select>
                </div>
                <div className="flex mb-1 rounded-md py-4 px-4 text-xl font-bold bg-gray-300 items-center">
                    <label className="mr-5">Select Destination Airport:</label>
                    <select
                        required 
                        onChange={handleChange}
                        name="dst_port_code"
                        value={form.dst_port_code}
                        className="p-2 rounded-md bg-white"
                    >
                        <option value="">Select an airport</option>
                        {airports.map(airport => (
                        <option key={airport.code} value={airport.code}>
                            {airport.port_name} ({airport.city}, {airport.country}), Code: {airport.code}
                        </option>
                        ))}
                    </select>
                </div>
                <div className="flex mb-1 rounded-md py-4 px-4 text-xl font-bold bg-gray-300 items-center">
                    <label className="mr-5">Select Plane:</label>
                    <select 
                        required 
                        onChange={handleChange}
                        name="plane_ID"
                        value={form.plane_ID}
                        className="p-2 rounded-md bg-white"
                    >
                        <option value="">Select a plane</option>
                        {planes.map(plane => (
                        <option key={plane.plane_ID} value={plane.plane_ID}>
                            {plane.manufacturer}, {plane.num_seats} seats, ID: {plane.plane_ID}
                        </option>
                        ))}
                    </select>
                </div>
                <div className="flex mb-1 rounded-md py-4 px-4 text-xl font-bold bg-gray-300 items-center">
                    <label className="mr-5">Departure Date:</label>
                    <input
                        className="p-2 rounded-md w-full"
                        type="date"
                        name="departure_date"
                        value={form.departure_date}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex mb-1 rounded-md py-4 px-4 text-xl font-bold bg-gray-300 items-center no-spinner">
                    <label className="mr-5">Departure Time:</label>
                    <input
                        style={{ MozAppearance: "textfield" }}
                        className="p-2 rounded-md w-12"
                        type="number"
                        min={0}
                        max={23}
                        name="departure_time_hr"
                        value={form.departure_time_hr}
                        onChange={handleChange}
                    />
                    <p className="mx-2">:</p>
                     
                    <input
                        className="p-2 rounded-md w-12"
                        style={{ MozAppearance: "textfield" }}
                        type="number"
                        min={0}
                        max={59}
                        name="departure_time_min"
                        value={form.departure_time_min}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex mb-1 rounded-md py-4 px-4 text-xl font-bold bg-gray-300 items-center">
                    <label className="mr-5">Arrival Date:</label>
                    <input
                        className="p-2 rounded-md w-full"
                        type="date"
                        name="arrival_date"
                        value={form.arrival_date}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex mb-1 rounded-md py-4 px-4 text-xl font-bold bg-gray-300 items-center no-spinner">
                    <label className="mr-5">Arrival Time:</label>
                    <input
                        style={{ MozAppearance: "textfield" }}
                        className="p-2 rounded-md w-12"
                        type="number"
                        min={0}
                        max={23}
                        name="arrival_time_hr"
                        value={form.arrival_time_hr}
                        onChange={handleChange}
                    />
                    <p className="mx-2">:</p>
                     
                    <input
                        className="p-2 rounded-md w-12"
                        style={{ MozAppearance: "textfield" }}
                        type="number"
                        min={0}
                        max={59}
                        name="arrival_time_min"
                        value={form.arrival_time_min}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex mb-1 rounded-md py-4 px-4 text-xl font-bold bg-gray-300 items-center">
                    <label className="mr-5">Base Price:</label>
                    <input
                        min={0}
                        max={100000}
                        style={{ MozAppearance: "textfield" }}
                        className="p-2 rounded-md w-24"
                        type="number"
                        name="base_price"
                        value={form.base_price}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex mb-1 rounded-md py-4 px-4 text-xl font-bold bg-gray-300 items-center">
                    <label className="mr-5">Flight Status: </label>
                    <select
                        name="flight_status"
                        value={form.flight_status}
                        onChange={handleChange}
                        className="p-2 rounded-md bg-white"
                    >
                        <option value="on-time">On Time</option>
                        <option value="delayed">Delayed</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div>
                <button className="font-bold text-xl bg-green-200 py-3 rounded-md text-center w-full mb-4">Submit</button>
            </form>
        </div>
    )
}