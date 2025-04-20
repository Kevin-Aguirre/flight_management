import { useState } from "react"

export default function AddPlane({ user, setUser }) {
    const [form, setForm] = useState({
        airline_name: user.user.airline_name,
        num_seats: '',
        manufacturer: '',
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

        fetch("http://127.0.0.1:5002/api/add-plane", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: 'include',
            body: JSON.stringify(form)
        })
        .then(res => res.json())
        .then(data => {
            alert('Successfully created airplane.')
            setForm({
                airline_name: user.user.airline_name,
                num_seats: '',
                manufacturer: '',
            })
        })
    
    }


    return (
        <div className="rounded-md bg-gray-100 mx-20 my-10 px-10">
            <h1 className="font-bold text-3xl text-center py-4">
                Add {" "}
                <p className="text-blue-600 inline">{user.user.airline_name} </p>
                Airplane
            </h1>
            <hr/>
            <form className="mt-4" onSubmit={handleSubmit}>
                <div className="flex mb-1 rounded-md py-4 px-4 text-xl font-bold bg-gray-300 items-center">
                    <label className="mr-5">Number of Seats:</label>
                    <input
                        className="p-2 rounded-md w-full"
                        type="number"
                        min={1}
                        max={1000}
                        name="num_seats"
                        value={form.num_seats}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex mb-1 rounded-md py-4 px-4 text-xl font-bold bg-gray-300 items-center">
                    <label className="mr-5">Manufacturer:</label>
                    <input
                        className="p-2 rounded-md w-full"
                        type="text"
                        name="manufacturer"
                        value={form.manufacturer}
                        onChange={handleChange}
                    />
                </div>
                <button className="font-bold text-xl bg-green-200 py-3 rounded-md text-center w-full mb-4">Submit</button>
            </form>
        </div>
    )
}