export default function EditFlight({ selectedEditFlight, setNewFlightStatus, handleFlightStatusChange, newFlightStatus}) {
    return (
    <div>
        <h1 className="font-bold py-2 text-center text-2xl">Edit Flight</h1>
        <hr/>
        <form onSubmit={handleFlightStatusChange}>
            <label><strong>Set Status of Flight #{selectedEditFlight.flight_number} to: </strong></label>
            <select
                required
                onChange={(e) => setNewFlightStatus(e.target.value)}
                name="newFlightStatus"
                value={newFlightStatus}
                className="my-2 p-2 rounded-md bg-white"
            >
                <option value="">Select New Flight Status</option>
                <option value="on-time">On Time</option>
                <option value="delayed">Delay</option>
                <option value="cancelled">Cancelled</option>
            </select>
            <button className="bg-green-200 rounded-md font-bold text-center w-full py-2">
                Submit
            </button>
        </form>
    </div>
    )
}