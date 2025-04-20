import { useState } from "react"

export default function AddAirport() {
    const [form, setForm] = useState({
        port_name: "",
        city: "",
        country: ""
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
        alert("submitting: " + JSON.stringify(form))
        fetch("http://127.0.0.1:5002/api/add-airport", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: 'include',
            body: JSON.stringify(form)
        })
        .then(res => res.json())
        .then(data => {
            alert('Successfully created airport.')
            setForm({
                port_name: "",
                city: "",
                country: ""
            })
        })
    
    }


    return (
        <div className="rounded-md bg-gray-100 mx-20 my-10 px-10">
            <h1 className="font-bold text-3xl text-center py-4">
                Add Airport
            </h1>
            <hr/>
            <form className="mt-4" onSubmit={handleSubmit}>
                <div className="flex mb-1 rounded-md py-4 px-4 text-xl font-bold bg-gray-300 items-center">
                    <label className="mr-5">Airport Name:</label>
                    <input
                        className="p-2 rounded-md w-full"
                        type="text"
                        name="port_name"
                        value={form.port_name}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex mb-1 rounded-md py-4 px-4 text-xl font-bold bg-gray-300 items-center">
                    <label className="mr-5">City:</label>
                    <input
                        className="p-2 rounded-md w-full"
                        type="text"
                        name="city"
                        value={form.city}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex mb-1 rounded-md py-4 px-4 text-xl font-bold bg-gray-300 items-center">
                    <label className="mr-5">Country:</label>
                    <input
                        className="p-2 rounded-md w-full"
                        type="text"
                        name="country"
                        value={form.country}
                        onChange={handleChange}
                    />
                </div>
                <button className="font-bold text-xl bg-green-200 py-3 rounded-md text-center w-full mb-4">Submit</button>
            </form>
        </div>
    )
}