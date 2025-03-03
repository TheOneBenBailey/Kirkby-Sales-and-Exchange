// Function to add ordinal suffix (st, nd, rd, th)
const getOrdinal = (day) => {
    const suffixes = ["th", "st", "nd", "rd"];
    const value = day % 100;
    return suffixes[(value - 20) % 10] || suffixes[value] || suffixes[0];
};

// Function to convert the date
export const formatDate = (dateString) => {
    const [day, month, year] = dateString.split('-');
    const date = new Date(`${year}-${month}-${day}`);

    const options = { weekday: 'long', day: 'numeric', month: 'long' };
    let formattedDate = new Intl.DateTimeFormat('en-GB', options).format(date);

    // Replace day with ordinal suffix
    formattedDate = formattedDate.replace(/\d+/, (day) => day + getOrdinal(day));

    return formattedDate;
};

export const formatCurrency = (num) => {
    if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`.replace('.0', '');
    if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`.replace('.0', '');
    return num;
};

export const formatTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
};

export function generateICS({ title, description, location, startDate, endDate }) {
    const icsContent = `
BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Med Poker Party//Event//EN
BEGIN:VEVENT
UID:${Date.now()}@medpokerparty.com
DTSTAMP:${formatICSDate(new Date())}
DTSTART:${formatICSDate(new Date(startDate))}
DTEND:${formatICSDate(new Date(endDate))}
SUMMARY:${title}
DESCRIPTION:${description}
LOCATION:${location}
END:VEVENT
END:VCALENDAR
          `.trim();

    const blob = new Blob([icsContent], { type: "text/calendar" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "event.ics";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function formatICSDate(date) {
    return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}


