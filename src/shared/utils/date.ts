import { format, formatDistanceToNow } from "date-fns";

export const formatCreatedDate = (date: Date) => {
    return formatDistanceToNow(date);
};

export const formatDate = (date: Date) => {
    return format(date, "MMM d, yyyy");
};