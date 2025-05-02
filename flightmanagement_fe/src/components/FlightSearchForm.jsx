import { useState } from "react";

export const FlightSearchForm = ({ onApply, onClear, defaultValues }) => {
    const [localParams, setLocalParams] = useState(defaultValues || {
        source: "",
        destination: "",
        departureDate: "",
        returnDate: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLocalParams((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleApply = () => {
        onApply(localParams);
    };

    const handleClear = () => {
        setLocalParams({
            source: "",
            destination: "",
            departureDate: "",
            returnDate: "",
        });
        onClear();
    };

    return (
        <div className="bg-gray-100 p-4 rounded-md">
            <h2 className="text-2xl font-bold mb-3">Search Flights</h2>
            <div className="flex flex-wrap gap-4">
                <div className="w-full flex flex-row">
                    <div className="w-full flex flex-col">
                        <label className="w-full">Source City/Airport</label>
                        <input
                            type="text"
                            name="source"
                            placeholder="Source city or airport"
                            value={localParams.source}
                            onChange={handleChange}
                            className="p-2 border rounded-md w-full md:w-1/2"
                        />
                    </div>
                    <div className="w-full flex flex-col">
                        <label className="w-full">Destination City/Airport</label>
                        <input
                            type="text"
                            name="destination"
                            placeholder="Destination city or airport"
                            value={localParams.destination}
                            onChange={handleChange}
                            className="p-2 border rounded-md w-full md:w-1/2"
                        />
                    </div>
                </div>

                <div className="w-full flex flex-row">
                    <div className="w-full flex flex-col">
                        <label className="w-full">Departure Time</label>
                        <input
                            type="date"
                            name="departureDate"
                            value={localParams.departureDate}
                            onChange={handleChange}
                            className="p-2 border rounded-md w-full md:w-1/2"
                        />
                    </div>
                    <div className="w-full flex flex-col">
                        <label className="w-full">Arrival Time</label>
                        <input
                            type="date"
                            name="returnDate"
                            value={localParams.returnDate}
                            onChange={handleChange}
                            className="p-2 border rounded-md w-full md:w-1/2"
                        />
                    </div>

                </div>
            </div>

            <div className="flex gap-4 mt-4">
                <button
                    onClick={handleApply}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                >
                    Apply Filters
                </button>
                <button
                    onClick={handleClear}
                    className="w-full bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded"
                >
                    Clear Filters
                </button>
            </div>
        </div>
    );
};
