// todo: convert date type of excel to date
export function transform(serial: any): any {
    try {
        // const isDates = isDate(serial);
        // if (isDates) {
        //     return serial;
        // }
        const utc_days = Math.floor(serial - 25569);
        const utc_value = utc_days * 86400;
        const date_info = new Date(utc_value * 1000);

        const fractional_day = serial - Math.floor(serial) + 0.0000001;

        let total_seconds = Math.floor(86400 * fractional_day);

        const seconds = total_seconds % 60;

        total_seconds -= seconds;

        const hours = Math.floor(total_seconds / (60 * 60));
        const minutes = Math.floor(total_seconds / 60) % 60;

        return new Date(
            date_info.getFullYear(),
            date_info.getMonth(),
            date_info.getDate(),
            hours,
            minutes,
            seconds
        );
    } catch (error) {
        return new Date(serial);
    }
}

function isDate(value: any) {
    switch (typeof value) {
        case "number":
            return true;
        case "string":
            return !isNaN(Date.parse(value));
        case "object":
            if (value instanceof Date) {
                return !isNaN(value.getTime());
            }
        default:
            return false;
    }
}
