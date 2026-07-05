import { Minutes, parseTime } from "./time";

/**
 * Matches:
 *
 * 12:00 PM – 1:00 PM
 * 12:00 PM - 1:00 PM
 * 12:00 PM–1:00 PM
 */
const TIME_RANGE_REGEX =
  /^(\d{1,2}:\d{2}\s*(?:AM|PM))\s*[–-]\s*(\d{1,2}:\d{2}\s*(?:AM|PM))$/i;

/**
 * Returns the ending time of a time block.
 *
 * Returns null if the text is not a valid time block.
 */
export function parseEndTime(text: string): Minutes | null {
  const match = text.trim().match(TIME_RANGE_REGEX);

  if (!match) {
    return null;
  }

  return parseTime(match[2]);
}

/**
 * Returns true if the block looks like a time block.
 */
export function isTimeBlock(text: string): boolean {
  return parseEndTime(text) !== null;
}
