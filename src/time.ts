/**
 * Number of minutes since midnight.
 *
 * Example:
 * 12:00 AM -> 0
 * 1:30 PM  -> 810
 */
export type Minutes = number;

/**
 * Adds minutes to a time.
 */
export function addMinutes(time: Minutes, minutes: number): Minutes {
  const totalMinutes = time + minutes;

  if (totalMinutes < 0 || totalMinutes >= 24 * 60) {
    throw new Error("Time falls outside a single day.");
  }

  return totalMinutes;
}

/**
 * Parses a 12-hour time string.
 *
 * Example:
 * "12:00 PM" -> 720
 * "1:30 PM"  -> 810
 */
export function parseTime(time: string): Minutes {
  const match = time.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);

  if (!match) {
    throw new Error(`Invalid time: ${time}`);
  }

  let hour = Number(match[1]);
  const minute = Number(match[2]);
  const meridiem = match[3].toUpperCase();

  if (hour === 12) {
    hour = 0;
  }

  if (meridiem === "PM") {
    hour += 12;
  }

  return hour * 60 + minute;
}

/**
 * Formats minutes since midnight into a 12-hour time.
 *
 * Example:
 * 720 -> "12:00 PM"
 * 810 -> "1:30 PM"
 */
export function formatTime(time: Minutes): string {
  let hour = Math.floor(time / 60);
  const minute = time % 60;

  const meridiem = hour >= 12 ? "PM" : "AM";

  hour %= 12;

  if (hour === 0) {
    hour = 12;
  }

  return `${hour}:${minute.toString().padStart(2, "0")} ${meridiem}`;
}

/**
 * Formats a time range.
 *
 * Example:
 * "12:00 PM – 1:00 PM"
 */
export function formatRange(start: Minutes, duration: number): string {
  const end = addMinutes(start, duration);

  return `${formatTime(start)} – ${formatTime(end)}`;
}
