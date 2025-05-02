import { useState, useEffect } from "react"
import Modal from "../components/Modal"
import { useNavigate } from "react-router-dom"

export default function AddPlane({ user, setUser }) {
    const navigate = useNavigate()
    
    useEffect(() => {
        if (user?.type !== "staff") {
            navigate('/')
        }
        
    })
    
    const [showPlanesModal, setShowPlanesModal] = useState(false)
    const [allPlanes, setAllPlanes] = useState([])

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
            alert(data.messsage)
            setAllPlanes(data.data)
            setShowPlanesModal(true)
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
            <Modal
                isOpen={showPlanesModal}
                onClose={() => {setShowPlanesModal(false)}}
            >   
                <h1 className="text-center font-bold text-3xl text-center py-2">
                    All {user.user.airline_name} Planes
                </h1>
                <hr/>
                {allPlanes.map((plane) => (
                    <div className="rounded-md flex justify-around bg-gray-100 my-1 p-2 ">
                        <div><strong>Manufacturer:</strong> {plane.manufacturer}</div>
                        <div><strong>Seats:</strong> {plane.num_seats}</div>
                        <div><strong>ID:</strong> {plane.plane_ID}</div>
                    </div>
                ))}
            </Modal>
        </div>
    )
}