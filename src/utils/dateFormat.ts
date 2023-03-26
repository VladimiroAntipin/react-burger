function getRelativeTime(timestamp: number) {
    const DAY_MILLISECONDS = 1000 * 60 * 60 * 24;
  
    const rtf = new Intl.RelativeTimeFormat("ru", {
      numeric: "auto",
    });
    const daysDifference = Math.round(
      (timestamp - new Date().getTime()) / DAY_MILLISECONDS
    );
  
    return rtf.format(daysDifference, "day");
  }
  
  export const formatOrderDate = (date: string) =>
    [
      getRelativeTime(+new Date(date)),
      new Date(date)
        .toLocaleDateString("ru-RU", {
          hour: "numeric",
          hour12: false,
          minute: "numeric",
          timeZone: "Europe/Moscow",
        })
        .toString()
        .split(" ")[1],
    ].join(" ");