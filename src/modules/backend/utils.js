import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import weekday from "dayjs/plugin/weekday";


dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(weekday);
dayjs.tz.setDefault("Asia/Taipei");
// dayjs.tz.setDefault("America/New_York");

const ORDER_CLOSE_DAY_OF_WEEK = 5; //friday
const ORDER_CLOSE_HOUR = 16; // 16:00

export const getStartOfOrderCycle = () => {
    const now = dayjs().tz();
    // Current Friday
    let t = now.weekday(ORDER_CLOSE_DAY_OF_WEEK).hour(ORDER_CLOSE_HOUR).minute(0).second(0);
    if(t.isAfter(now)) {
        // Previous Friday
        t = now.weekday(ORDER_CLOSE_DAY_OF_WEEK).hour(ORDER_CLOSE_DAY_OF_WEEK-7).minute(0).second(0);
    }
    // console.log(now.format());
    // console.log(d.format());
    // console.log(t.format());
    return t.unix();
}