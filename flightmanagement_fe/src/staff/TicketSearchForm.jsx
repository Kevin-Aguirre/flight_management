import { useState } from "react";

export const TicketSearchForm = ({ onApply, onClear, defaultValues }) => {
    const [localParams, setLocalParams] = useState(defaultValues || {
        lowerBound: '',
        upperBound: '',
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
            lowerBound: '',
            upperBound: '',
        });
        onClear();
    };

    return (
        <div className="bg-gray-100 p-4 rounded-md">
            <h2 className="text-2xl font-bold mb-3">Filter Tickets</h2>
            <div className="flex flex-wrap gap-4">
                <div className="text-center font-bold text-xl">Select Range</div>
                <div className="w-full flex flex-row">
                    <div className="w-full flex flex-col">
                        <label className="w-full">Lower Bound</label>
                        <input
                            type="date"
                            name="lowerBound"
                            value={localParams.lowerBound}
                            onChange={handleChange}
                            className="p-2 border rounded-md w-full md:w-1/2"
                        />
                    </div>
                    <div className="w-full flex flex-col">
                        <label className="w-full">Upper Bound</label>
                        <input
                            type="date"
                            name="upperBound"
                            value={localParams.upperBound}
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
