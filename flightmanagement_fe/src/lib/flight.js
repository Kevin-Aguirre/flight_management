export function filterFlights(flights, filters) {
    return flights.filter(flight => {
        const {
            source,
            destination,
            departureDate,
            returnDate
        } = filters;

        // Match source if provided
        if (source && !(
            flight.departure_city.toLowerCase().includes(source.toLowerCase()) ||
            flight.departure_port_name.toLowerCase().includes(source.toLowerCase())
        )) {
            return false;
        }

        // Match destination if provided
        if (destination && !(
            flight.arrival_city.toLowerCase().includes(destination.toLowerCase()) || 
            flight.arrival_port_name.toLowerCase().includes(destination.toLowerCase())
        )) {
            return false;
        }

        // Match departure date range (flight.departure_time >= departureDate)
        if (departureDate) {
            const flightDeparture = new Date(flight.departure_time);
            const filterDeparture = new Date(departureDate);
            if (flightDeparture < filterDeparture) {
                return false;
            }
        }

        // Match return date range (flight.arrival_datetime <= returnDate)
        if (returnDate) {
            const flightArrival = new Date(flight.arrival_datetime);
            const filterReturn = new Date(returnDate);
            // To include the whole return date, set its time to the end of the day
            filterReturn.setHours(23, 59, 59, 999);
            if (flightArrival > filterReturn) {
                return false;
            }
        }

        return true;
    });
}


export const isFlightMoreThanDayFromNow = (departure_time) => {
    const now = new Date();
    const oneDayFromNow = new Date(now.getTime() + 24 * 60 * 60 * 1000); 
    return new Date(departure_time) > oneDayFromNow
}

export const hasFlightPassed = (arrival_datetime) => {
    console.log(new Date(arrival_datetime))
    console.log(new Date())
    return new Date() > new Date(arrival_datetime)
}