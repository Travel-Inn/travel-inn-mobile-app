import { convertDate } from "./timestampToDate";

export function getNumberOfNights(start, end) {

    if (start && end) {
    var start = new Date(start);
    var end = new Date(end);

    // Function to calculate the number of nights between two dates.

    // One day in milliseconds
    const oneDay = 1000 * 60 * 60 * 24;

    // Calculating the time difference between two dates
    const diffInTime = end.getTime() - start.getTime();

    // Calculating the no. of days between two dates
    const diffInDays = Math.round(diffInTime / oneDay);

    return diffInDays;
    } else return 0;
}