import { useEffect, useState } from "react";
import { selectCurrentDayName, selectCurrentMonthName, addZero, formatTime } from "../../utils/dateUtils";

import clock from "../../assets/icons/clock.svg";

interface CurrentDate {
    dayName: string,
    dateDay: string,
    monthName: string,
    currentYear: string,
    currentTime: string
}

const TopMenu = () => {

    const [currentDate, setCurrentDate] = useState<CurrentDate>({
        dayName: "",
        dateDay: "",
        monthName: "",
        currentYear: "",
        currentTime: ""
    });

    useEffect(() => {
        const interval = setInterval(() => {
            const date = new Date();

            setCurrentDate({
                dayName: selectCurrentDayName(date.getDay()),
                dateDay: addZero(date.getDate()),
                monthName: selectCurrentMonthName(date.getMonth()),
                currentYear: date.getFullYear().toString(),
                currentTime: formatTime(date.getHours(), date.getMinutes())
            })
        }, 1000)

        return () => clearInterval(interval);
    }, [])

    return (
        <div>
            <h3 className="h6">{currentDate.dayName}</h3>
            <span className="d-flex align-items-center gap-2">
                <p className="m-0 font-weight-bold">{currentDate.dateDay} {currentDate.monthName}, {currentDate.currentYear}</p>
                <img style={{ width: "20px" }} src={clock} alt="Clock" />
                <p className="m-0 font-weight-bold">{currentDate.currentTime}</p>
            </span>
        </div>
    );
}

export default TopMenu;