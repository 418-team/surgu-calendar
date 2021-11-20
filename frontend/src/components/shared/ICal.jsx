let icsFile = null;

export function createFile(start, end, summary, description) {
    const eventDate = {
            start,
            end
        }
    const link = document.querySelector("downloadUrl");
    link.href = makeIcsFile(eventDate, summary, description);
    link.classList.remove("hide");
}
function convertDate(date) {
    console.log(date)
    let event = new Date(date).toISOString();
    event = event.split("T")[0];
    event = event.split("-");
    event = event.join("");
    return event;
}

const getText = (text) => {
    return unescape(encodeURI(text))
}

export function makeIcsFile(date, summary, description) {
    const test =
        "BEGIN:VCALENDAR\n" +
        "CALSCALE:GREGORIAN\n" +
        "METHOD:PUBLISH\n" +
        "PRODID:-//418 Team//RU\n" +
        "VERSION:2.0\n" +
        "BEGIN:VEVENT\n" +
        "UID:" +
        summary.replaceAll(" ", "-") +
        "\n" +
        "DTSTART;VALUE=DATE:" +
        convertDate(date.start) +
        "\n" +
        "DTEND;VALUE=DATE:" +
        convertDate(date.end) +
        "\n" +
        "SUMMARY;" +"\n" +
        "LANGUAGE=ru-RU:"+
        getText(summary) +
        "\n" +
        "DESCRIPTION:" +
        getText(description) +
        "\n" +
        "END:VEVENT\n" +
        "END:VCALENDAR";

    window.open("data:text/calendar;charset=utf8," + escape(test))
}