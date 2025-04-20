import { useEffect, useState } from "react"

export default function StaffRegister() {
    const [airlines, setAirlines] = useState([])

    useEffect(() => {
        fetch("http://127.0.0.1:5002/api/get-airlines")
            .then(res => res.json())
            .then(data => {
                setAirlines(data)
            })
    }, [])

    const [form, setForm] = useState({
        username: "",
        airline_name: "",
        pwd: "",
        first_name: "",
        last_name: "",
        date_of_birth: "",
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
        alert(JSON.stringify(form))
        for (const p in form) {
            if (form[p].length === 0) {
                alert("All fields must be given a value")
                return
            }
        }

        fetch("http://127.0.0.1:5002/api/register-staff", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(form)
        })
            .then(async (res) => {
                const data = await res.json()
                if (res.ok) {
                    alert(data.message);
                    setForm({
                        username: "",
                        airline_name: "",
                        pwd: "",
                        first_name: "",
                        last_name: "",
                        date_of_birth: "",
                    })
                } else {
                    alert(data.error)
                }
            })
            .catch(e => {
                console.log("error, ", e)
                alert("Network error, check your backend")
            })


    }

    return ( 
        <div className="rounded-md bg-gray-100 mx-20 my-10 px-10">
            <h1 className="font-bold text-3xl text-center py-4">
                Staff Registration 
            </h1>
            <hr/>
            <form className="mt-4" onSubmit={handleSubmit}>
                <div className="flex mb-1 rounded-md py-4 px-4 text-xl font-bold bg-gray-300 items-center">
                    <label className="mr-5">Username:</label>
                    <input
                        className="p-2 rounded-md w-full"
                        type="text"
                        name="username"
                        value={form.username}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex mb-1 rounded-md py-4 px-4 text-xl font-bold bg-gray-300 items-center">
                    <label className="mr-5">Airline Name:</label>
                    <select
                        required
                        onChange={handleChange}
                        name="airline_name"
                        value={form.airline_name}
                        className="p-2 rounded-md bg-white"
                    >
                        <option value="">Select an Airline:</option>
                        {airlines.map((airline) => (
                            <option key={airline.airline_name} value={airline.airline_name}>
                                {airline.airline_name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex mb-1 rounded-md py-4 px-4 text-xl font-bold bg-gray-300 items-center">
                    <label className="mr-5">Password:</label>
                    <input
                        className="p-2 rounded-md w-full"
                        type="password"
                        name="pwd"
                        value={form.pwd}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex mb-1 rounded-md py-4 px-4 text-xl font-bold bg-gray-300 items-center">
                    <label className="mr-5">First Name:</label>
                    <input
                        className="p-2 rounded-md w-full"
                        type="text"
                        name="first_name"
                        value={form.first_name}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex mb-1 rounded-md py-4 px-4 text-xl font-bold bg-gray-300 items-center">
                    <label className="mr-5">Last Name:</label>
                    <input
                        className="p-2 rounded-md w-full"
                        type="text"
                        name="last_name"
                        value={form.last_name}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex mb-1 rounded-md py-4 px-4 text-xl font-bold bg-gray-300 items-center">
                    <label className="mr-5">Date of Birth:</label>
                    <input
                        className="p-2 rounded-md w-full"
                        type="date"
                        name="date_of_birth"
                        value={form.date_of_birth}
                        onChange={handleChange}
                    />
                </div>
                <button className="font-bold text-xl bg-green-200 py-3 rounded-md text-center w-full mb-4">Submit</button>
            </form>
        </div>
    )
}