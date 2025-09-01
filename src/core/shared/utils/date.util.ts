import { DateTime } from "luxon";
import { DEFAULT_TIME_ZONE } from "@core/config/env";

export const toUserLocalString = (date: Date | string, userTimeZone?: string, format = 'dd/MM/yyyy HH:mm') => {
  return DateTime.fromJSDate(new Date(date))
    .setZone(userTimeZone || DEFAULT_TIME_ZONE)
    .toFormat(format);
};

// Devuelve fecha actual en UTC
export const nowUTC = () => DateTime.utc().toJSDate();
