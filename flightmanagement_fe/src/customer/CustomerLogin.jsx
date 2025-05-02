import { useState } from "react"
import { useNavigate } from "react-router-dom";

export default function CustomerLogin({ user, setUser}) {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        email: "",
        pwd: "",
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

        fetch("http://127.0.0.1:5002/api/login-customer", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: 'include',
            body: JSON.stringify(form)
        })
            .then(async (res) => {
                const data = await res.json()
                if (res.ok) {
                    alert('Successfully logged in as customer.')
                    localStorage.setItem('data', JSON.stringify(data))
                    setUser(data)
                    navigate('/') 

                } else {
                    alert(data.error)
                }
            })
            .catch(e => {
                alert('network error, check backend')
            })
        
    }

    return ( 
        <div className="rounded-md bg-gray-100 mx-20 my-10 px-10">
            <h1 className="font-bold text-3xl text-center py-4">
                Customer Login
            </h1>
            <hr/>
            <form className="mt-4" onSubmit={handleSubmit}>
                <div className="flex mb-1 rounded-md py-4 px-4 text-xl font-bold bg-gray-300 items-center">
                    <label className="mr-5">Email:</label>
                    <input
                        className="p-2 rounded-md w-full"
                        type="email"
                        name="email"
                        value={form.email}
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
                <button className="font-bold text-xl bg-green-200 py-3 rounded-md text-center w-full mb-4">Submit</button>
            </form>
        </div>
    )
}

