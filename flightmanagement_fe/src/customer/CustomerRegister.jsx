import { useState } from "react"

export default function CustomerRegister() {
    const [form, setForm] = useState({
        email: "",
        cust_name: "",
        pwd: "",
        building_number: "",
        cust_street: "",
        cust_city: "",
        cust_state: "",
        phone_number: "",
        passport_expiration: "",
        passport_country: "",
        dob: ""
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

        fetch("http://127.0.0.1:5002/api/register-customer", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(form)
        })
            .then(async (res) => {
                const data = await res.json()
                if (res.ok) {
                    alert(data.message)
                    setForm({
                        email: "",
                        cust_name: "",
                        pwd: "",
                        building_number: "",
                        cust_street: "",
                        cust_city: "",
                        cust_state: "",
                        phone_number: "",
                        passport_expiration: "",
                        passport_country: "",
                        dob: ""
                    })
                } else {
                    alert(data.error)
                }
            })
            .catch(e => {
                console.log("error, ", e)
            })
    }

    return ( 
        <div className="rounded-md bg-gray-100 mx-20 my-10 px-10">
            <h1 className="font-bold text-3xl text-center py-4">
                Customer Registration 
            </h1>
            <hr/>
            <form className="mt-4" onSubmit={handleSubmit}>
                <div className="flex mb-1 rounded-md py-4 px-4 text-xl font-bold bg-gray-300 items-center">
                    <label className="mr-5">Email:</label>
                    <input
                        className="p-2 rounded-md w-full"
                        type="text"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex mb-1 rounded-md py-4 px-4 text-xl font-bold bg-gray-300 items-center">
                    <label className="mr-5">Name:</label>
                    <input
                        className="p-2 rounded-md w-full"
                        type="text"
                        name="cust_name"
                        value={form.cust_name}
                        onChange={handleChange}
                    />
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
                    <label className="mr-5">Building Number:</label>
                    <input
                        className="p-2 rounded-md w-full"
                        type="number"
                        name="building_number"
                        value={form.building_number}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex mb-1 rounded-md py-4 px-4 text-xl font-bold bg-gray-300 items-center">
                    <label className="mr-5">Street:</label>
                    <input
                        className="p-2 rounded-md w-full"
                        type="text"
                        name="cust_street"
                        value={form.cust_street}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex mb-1 rounded-md py-4 px-4 text-xl font-bold bg-gray-300 items-center">
                    <label className="mr-5">City:</label>
                    <input
                        className="p-2 rounded-md w-full"
                        type="text"
                        name="cust_city"
                        value={form.cust_city}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex mb-1 rounded-md py-4 px-4 text-xl font-bold bg-gray-300 items-center">
                    <label className="mr-5">State:</label>
                    <input
                        className="p-2 rounded-md w-full"
                        type="text"
                        name="cust_state"
                        value={form.cust_state}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex mb-1 rounded-md py-4 px-4 text-xl font-bold bg-gray-300 items-center">
                    <label className="mr-5">Phone Number:</label>
                    <input
                        className="p-2 rounded-md w-full"
                        type="text"
                        name="phone_number"
                        value={form.phone_number}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex mb-1 rounded-md py-4 px-4 text-xl font-bold bg-gray-300 items-center">
                    <label className="mr-5">Passport Expiration:</label>
                    <input
                        className="p-2 rounded-md w-full"
                        type="date"
                        name="passport_expiration"
                        value={form.passport_expiration}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex mb-1 rounded-md py-4 px-4 text-xl font-bold bg-gray-300 items-center">
                    <label className="mr-5">Passport Country:</label>
                    <input
                        className="p-2 rounded-md w-full"
                        type="text"
                        name="passport_country"
                        value={form.passport_country}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex mb-1 rounded-md py-4 px-4 text-xl font-bold bg-gray-300 items-center">
                    <label className="mr-5">Date of Birth:</label>
                    <input
                        className="p-2 rounded-md w-full"
                        type="date"
                        name="dob"
                        value={form.dob}
                        onChange={handleChange}
                    />
                </div>
                <button className="font-bold text-xl bg-green-200 py-3 rounded-md text-center w-full mb-4">Submit</button>
            </form>
        </div>
    )
}