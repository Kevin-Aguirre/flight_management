export default function PurchaseFlight({selectedPurchaseFlight, handleFlightPurchase, handlePaymentChange, purchaseInfo}) {
    return (
        <div>
            <h1 className="font-bold py-2 text-center text-2xl">
                Purchase Flight
            </h1>
            <hr/>
            <form onSubmit={handleFlightPurchase}>
                {
                    selectedPurchaseFlight !== null 
                    && 
                    <>
                        <div className="text-center">Flight Information</div>
                        <div><strong>Airline Name: </strong>{selectedPurchaseFlight.airline_name}</div>
                        <div><strong>Departure Time: </strong>{selectedPurchaseFlight.departure_time}</div>
                        <div><strong>Arrival Time: </strong>{selectedPurchaseFlight.arrival_datetime}</div>
                        <div><strong>Departure Location: </strong>{selectedPurchaseFlight.departure_port_name} ({selectedPurchaseFlight.departure_city}, {selectedPurchaseFlight.departure_country})</div>
                        <div><strong>Departure Location: </strong>{selectedPurchaseFlight.arrival_port_name} ({selectedPurchaseFlight.arrival_city}, {selectedPurchaseFlight.arrival_country})</div>
                        <div><strong>Price: </strong> 
                        {
                            selectedPurchaseFlight.base_price == selectedPurchaseFlight.curr_price
                            ?
                            <p className="inline">{selectedPurchaseFlight.base_price}</p>
                            : 
                            <div className="inline">
                                <p className="inline line-through">{selectedPurchaseFlight.base_price}</p>
                                {"       "}    
                                <p className="inline ">{selectedPurchaseFlight.curr_price}</p>
                                <p className="text-center text-red-600">A 20% surchage is added to flights that are currently over 60% capacity.</p>
                            </div>
                            
                        }
                        </div>
                        <div><strong>Flight Number: </strong>{selectedPurchaseFlight.flight_number}</div>
                        <div className="mb-2"><strong>Flight Status: </strong>{selectedPurchaseFlight.flight_status}</div>
                        
                        <div className="bg-gray-200 my-2 p-4 rounded-md">
                            <label className="font-bold mr-4">Card Type:</label>
                            <select
                                required 
                                onChange={handlePaymentChange}
                                name="card_type"
                                value={purchaseInfo.card_type}
                                className="p-2 rounded-md bg-white"
                            >
                                <option value="">Select Payment Type</option>
                                <option key="credit" value="credit">Credit Card</option>
                                <option key="debit" value="debit">Debit Card</option>
                            </select>
                        </div>
                        <div className="bg-gray-200 my-2 p-4 rounded-md">
                            <label className="font-bold mr-4">Enter Card Number:</label>
                            <input
                                required
                                onChange={handlePaymentChange}
                                name="card_number"
                                value={purchaseInfo.card_number}
                                style={{ MozAppearance: "textfield" }}
                                type="number"
                                className="p-2 rounded-md"
                            />
                        </div>
                        <div className="bg-gray-200 my-2 p-4 rounded-md">
                            <label className="font-bold mr-4">Card Name:</label>
                            <input  
                                required
                                onChange={handlePaymentChange}
                                name="card_name"
                                value={purchaseInfo.card_name}
                                type="text"
                                className="p-2 rounded-md"
                            />
                        </div>
                        <div className="bg-gray-200 my-2 p-4 rounded-md">
                            <label className="font-bold mr-4">Card Expiration:</label>
                            <input
                                required 
                                onChange={handlePaymentChange}
                                name="card_expiration"
                                type="date"
                                value={purchaseInfo.card_expiration}
                                className="p-2 rounded-md bg-white"
                            />
                        </div>
                    </>
                }

                <button className="font-bold mt-2 rounded-md text-center pflex w-full text-center bg-green-500 text-white px-4 py-2 text-center">
                    Purchase
                </button>
            </form>
        </div>
    )
} 