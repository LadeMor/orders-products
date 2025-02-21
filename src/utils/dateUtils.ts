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

export const formatItemDate = (date: string): string => {
    const dateToFormat = new Date(date);
    return `${addZero(dateToFormat.getDate())} / 
    ${selectCurrentMonthName(dateToFormat.getMonth()).slice(0, 3)} / 
    ${dateToFormat.getFullYear()}`
}

export const formatItemTime = (date: string): string => {
    const dateTimeToFormat = new Date(date);
    return `${addZero(dateTimeToFormat.getMinutes())}/${addZero(dateTimeToFormat.getHours())}`
}
