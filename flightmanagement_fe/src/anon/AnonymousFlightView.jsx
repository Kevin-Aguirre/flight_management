import { useState } from "react";
import Flight from "../components/Flight";
import { FlightSearchForm } from "../components/FlightSearchForm";
import { filterFlights } from "../lib/flight";

export const AnonymousFlightView = ({ user, flights }) => {
    const [appliedFilters, setAppliedFilters] = useState({
        source: "",
        destination: "",
        departureDate: "",
        returnDate: "",
    });

    const handleApplyFilters = (filters) => {
        setAppliedFilters(filters);
    };

    const handleClearFilters = () => {
        setAppliedFilters({
            source: "",
            destination: "",
            departureDate: "",
            returnDate: "",
        });
    };

    const filteredFlights = filterFlights(flights, appliedFilters)

    const flightElems = filteredFlights.map((flight) => (
        <div key={flight.flight_number} className="mt-5 bg-gray-200 rounded-lg my-1 py-4 px-5 flex flex-col">
            <Flight
                airline_name={flight.airline_name}
                departure_time={flight.departure_time}
                arrival_datetime={flight.arrival_datetime}
                departure_port_name={flight.departure_port_name}
                departure_city={flight.departure_city}
                departure_country={flight.departure_country}
                arrival_port_name={flight.arrival_port_name}
                arrival_city={flight.arrival_city}
                arrival_country={flight.arrival_country}
                base_price={flight.base_price}
                flight_number={flight.flight_number}
                flight_status={flight.flight_status}
            />
        </div>
    ));

    return (
        <div className="flex flex-col">
            <FlightSearchForm
                onApply={handleApplyFilters}
                onClear={handleClearFilters}
            />
            {flightElems.length !== 0 ? (
                flightElems
            ) : (
                <div className="text-xl rounded-md font-bold text-center bg-gray-200 py-3 mt-1">
                    No Future Flights Found
                </div>
            )}
        </div>
    );
};
