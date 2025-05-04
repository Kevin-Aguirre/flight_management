import { useState, useEffect } from "react"
import { filterTickets } from "../lib/ticket";
import { TicketSearchForm } from "./TicketSearchForm";
import { useNavigate } from "react-router-dom";


export default function ViewReports({user, setUser}) {
    const navigate = useNavigate()
    
    useEffect(() => {
        if (user?.type !== "staff") {
            navigate('/')
        }
        
    })
    const [tickets, setTickets] = useState([])
    const [appliedFilters, setAppliedFilters] = useState({
        lowerBound: '',
        upperBound: ''
    });

    const handleApplyFilters = (filters) => {
        setAppliedFilters(filters);
    };

    const handleClearFilters = () => {
        setAppliedFilters({
            lowerBound: '',
            upperBound: ''
        });
    };

    const filteredTickets = filterTickets(tickets, appliedFilters)
    
    useEffect(() => {
        fetch(`http://127.0.0.1:5002/api/get-reports?airline_name=${encodeURIComponent(user.user.airline_name)}`)
            .then(res => res.json())
            .then(data => {
                setTickets(data)
            })

    }, [])

    const table = (
        <table className="my-2 min-w-full border border-gray-300 rounded-lg text-sm">
            <thead className="bg-gray-200 text-left">
                <tr>
                    <th className="px-4 py-2 border-b">Flight Number</th>
                    <th className="px-4 py-2 border-b">Departure Time</th>
                    <th className="px-4 py-2 border-b">Email</th>
                    <th className="px-4 py-2 border-b">Ticket ID</th>
                    <th className="px-4 py-2 border-b">Sold Price</th>
                    <th className="px-4 py-2 border-b">Purchase Time</th>
                </tr>            
            </thead>
            <tbody>
                {filteredTickets.map((ticket, i) => (
                    <tr key={i} className={i%2==0 ? "bg-white" : "bg-gray-50"}>
                        <td className="px-4 py-2 border-b">{ticket.flight_number}</td>
                        <td className="px-4 py-2 border-b">{ticket.departure_time}</td>
                        <td className="px-4 py-2 border-b">{ticket.email}</td>
                        <td className="px-4 py-2 border-b">{ticket.ticket_ID}</td>
                        <td className="px-4 py-2 border-b">{ticket.sold_price}</td>
                        <td className="px-4 py-2 border-b">{ticket.purchase_datetime}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )

    return (
        <div className="mx-10 my-5 rounded-md bg-blue-100 p-4">
            <TicketSearchForm
                onApply={handleApplyFilters}
                onClear={handleClearFilters}
                defaultValues={appliedFilters}
            />
            <h1 className="text-center font-bold text-3xl my-2">{user.user.airline_name} Tickets</h1>
            <hr/>
            {table}
        </div>
    )
}