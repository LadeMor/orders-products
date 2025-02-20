export const selectCurrentDayName = (dayIndex: number): string => {
    const dayNamesArr = ["Sunday", 
    "Monday", "Tuesday", "Wednesday", 
    "Thursday", "Friday", "Saturday"]

    return dayNamesArr[dayIndex] ?? "Invalid day";
}

export const selectCurrentMonthName = (monthIndex: number): string => {
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    return months[monthIndex] ?? "Invalid month";
}

export const addZero = (number: number): string => {
    return number < 10 ? `0${number}` : `${number}`;
}

export const formatTime = (hours: number, minutes: number): string => {
    return `${hours}:${addZero(minutes)}`;
}