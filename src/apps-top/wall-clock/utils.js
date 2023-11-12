/**
 * Get time now in seconds, time starts from 00:00 am with 12 hours format
 */
export const getTimeNowInSeconds = () => {
    const date = new Date();
    const hours = (date.getHours() % 12) * 60 * 60;
    const minutes = date.getMinutes() * 60;
    const seconds = date.getSeconds();

    return hours + minutes + seconds;
}