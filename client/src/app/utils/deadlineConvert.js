function formatTime(data) {
    data = String(data);
    return data.length <= 1 ? `0${data}` : data;
}

const deadlineConvert = {
    toMs: (date) => {
        return Date.parse(date);
    },

    toDate: (ms) => {
        const date = new Date(ms);

        return (
            String(date.getFullYear()) +
            "-" +
            formatTime(date.getMonth() + 1) +
            "-" +
            formatTime(date.getDate()) +
            "T" +
            formatTime(date.getHours()) +
            ":" +
            formatTime(date.getMinutes())
        );
    },

    toDateText: (ms) => {
        const date = new Date(ms);

        return (
            formatTime(date.getDate()) +
            "-" +
            formatTime(date.getMonth() + 1) +
            "-" +
            String(date.getFullYear()) +
            " " +
            formatTime(date.getHours()) +
            ":" +
            formatTime(date.getMinutes())
        );
    },
};

export default deadlineConvert;
