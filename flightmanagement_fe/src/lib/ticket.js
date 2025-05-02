export function filterTickets(tickets, filters) {
    return tickets.filter(ticket => {
        const {
            lowerBound,
            upperBound,
        } = filters;

        const purchaseDate = new Date(ticket.purchase_datetime)

        if (lowerBound) {
            const filterLower = new Date(lowerBound);
            if (purchaseDate <= filterLower) {
                return false;
            }
        }

        if (upperBound) {
            const filterUpper = new Date(upperBound);
            filterUpper.setHours(23, 59, 59, 999);
            if (purchaseDate >= filterUpper) {
                return false;
            }
        }

        return true;
    });
}
