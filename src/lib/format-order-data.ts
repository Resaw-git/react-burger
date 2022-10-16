export const formatOrderData = (time: string | undefined): string => {
    if (time === undefined) {
        return ''
    } else {
        const nowDate = new Date(Date.now());
        const orderDate = new Date(time);
        const oneDayMs: number =
            86400000 +
            nowDate.getHours() * 3600000 +
            nowDate.getMinutes() * 60000 +
            nowDate.getSeconds() * 1000;
        const toLocaleTime = new Date(time).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        });
        const toLocaleDate = new Date(time).toLocaleDateString("ru-RU", {
            month: "2-digit",
            day: "2-digit",
        });
        const timezone = orderDate.getTimezoneOffset() / -60;
        const getGMT = (): string =>
            `i-GMT${timezone > 0 ? "+" + timezone : timezone}`;

        return nowDate.getDate() === orderDate.getDate()
            ? `Сегодня, ${toLocaleTime} ${getGMT()}`
            : nowDate.getTime() - orderDate.getTime() <= oneDayMs
                ? `Вчера,  ${toLocaleTime} ${getGMT()}`
                : `${toLocaleDate},  ${toLocaleTime} ${getGMT()}`;
    }
};