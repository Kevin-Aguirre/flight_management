export default function Flight(props) {
    return (
        <>
            <div className="flex flex-row text-center">
                <div className="text-xl bg-blue-300 w-full py-1 rounded-md mr-1"><strong>Airline:</strong> {props.airline_name}</div>
                <div className="text-xl bg-blue-300 w-full py-1 rounded-md mr-1"><strong>Departure Time:</strong> {props.departure_time}</div>
                <div className="text-xl bg-blue-300 w-full py-1 rounded-md "><strong>Arrival Time:</strong> {props.arrival_datetime}</div>
            </div>
            <div className="text-xl font-bold my-2 w-full justify-around flex flex-row items-center">
                <div className="py-2 px-3 rounded-md flex flex-col text-center mw-50 bg-blue-200  ">
                    <div>{props.departure_port_name}</div>
                    <div>{props.departure_city}, {props.departure_country}</div>
                </div>
                <svg className="" width="600" height="50">
                    <defs>
                        <marker 
                        id="head" 
                        orient="auto" 
                        markerWidth="3" 
                        markerHeight="4" 
                        refX="0.1" 
                        refY="2"
                        >
                        <path d="M0,0 V4 L2,2 Z" fill="gray" />
                        </marker>
                    </defs>

                    <path
                        id="arrow-line"
                        marker-end="url(#head)"
                        stroke-width="10"
                        fill="none" stroke="gray"
                        d="M0,25 L550,25"
                    />
                </svg>
                <div className="text-xl font-bold py-2 px-3 rounded-md flex flex-col text-center mw-50 bg-blue-200 ">
                    <div>{props.arrival_port_name}</div>
                    <div>{props.arrival_city}, {props.arrival_country}</div>
                </div>
            </div>
            <div className="text-xl flex flex-row text-center">
                <div className="bg-blue-300 w-full py-1 rounded-md mr-1"><strong>Base Price:</strong> {props.base_price}</div>
                <div className="bg-blue-300 w-full py-1 rounded-md mr-1"><strong>Flight #: </strong>{props.flight_number}</div>
                <div className="bg-blue-300 w-full py-1 rounded-md mr-1"><strong>Status: </strong>{props.flight_status}</div>
            </div>
        </>
    )
}