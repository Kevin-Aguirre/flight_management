import { useEffect, useState } from "react"

export default function StaffRegister() {
    const [airlines, setAirlines] = useState([])
    const [isNewAirline, setIsNewAirline] = useState(false);

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
        phone_numbers: [""],
        emails: [""]
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({...prev, [name]: value}))
    }

    const handleArrayChange = (e, field, index)  => {
        const newArr = [...form[field]]
        newArr[index] = e.target.value;
        setForm((prev) => ({
            ...prev, 
            [field]: newArr,
        }))

    }
    
    const addField = (field) => {
        setForm((prev) => ({
            ...prev,
            [field]: [...prev[field], ""]
        }))
    }

    const removeField = (field, index) => {
        setForm((prev) => {
            const newArray = [...prev[field]]
            newArray.splice(index, 1)
            return {...prev, [field]: newArray}
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(JSON.stringify(form))
        for (const p in form) {
            if (Array.isArray(form[p])) continue;
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
                        phone_numbers: [""],
                        emails: [""]
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
                    {!isNewAirline ? (
                        <>
                            <select
                                required={!isNewAirline}
                                onChange={(e) => {
                                    if (e.target.value === "__new") {
                                        setIsNewAirline(true);
                                        setForm(prev => ({ ...prev, airline_name: "" }));
                                    } else {
                                        setForm(prev => ({ ...prev, airline_name: e.target.value }));
                                    }
                                }}
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
                                <option value="__new">+ Create New Airline</option>
                            </select>
                        </>
                    ) : (
                        <>
                            <input
                                type="text"
                                name="airline_name"
                                placeholder="Enter new airline name"
                                value={form.airline_name}
                                onChange={handleChange}
                                className="p-2 rounded-md"
                            />
                            <button
                                type="button"
                                onClick={() => {
                                    setIsNewAirline(false);
                                    setForm(prev => ({ ...prev, airline_name: "" }));
                                }}
                                className="mt-2 bg-gray-200 px-3 py-1 rounded-md text-sm"
                            >
                                Back to Airline List
                            </button>
                        </>
                    )}
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
                <div className="mb-4">
                    <label className="font-bold text-xl">Phone Numbers:</label>
                    {form.phone_numbers.map((phone, idx) => (
                        <div key={idx} className="flex items-center mt-2">
                            <input
                                type="text"
                                className="p-2 rounded-md w-full"
                                value={phone}
                                onChange={(e) => handleArrayChange(e, "phone_numbers", idx)}
                            />
                            <button type="button" onClick={() => removeField("phone_numbers", idx)} className="ml-2 text-red-500 font-bold">X</button>
                        </div>
                    ))}
                    <button type="button" onClick={() => addField("phone_numbers")} className="mt-2 bg-blue-200 p-2 rounded-md">Add Phone Number</button>
                </div>
                <div className="mb-4">
                    <label className="font-bold text-xl">Emails:</label>
                    {form.emails.map((email, idx) => (
                        <div key={idx} className="flex items-center mt-2">
                            <input
                                type="email"
                                className="p-2 rounded-md w-full"
                                value={email}
                                onChange={(e) => handleArrayChange(e, "emails", idx)}
                            />
                            <button type="button" onClick={() => removeField("emails", idx)} className="ml-2 text-red-500 font-bold">X</button>
                        </div>
                    ))}
                    <button type="button" onClick={() => addField("emails")} className="mt-2 bg-blue-200 p-2 rounded-md">Add Email</button>
                </div>
                <button className="font-bold text-xl bg-green-200 py-3 rounded-md text-center w-full mb-4">Submit</button>
            </form>
        </div>
    )
}