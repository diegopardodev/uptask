import { formatDistanceToNow } from "date-fns";

export const formatCreatedDate = (date: Date) => {
    return formatDistanceToNow(date);
};