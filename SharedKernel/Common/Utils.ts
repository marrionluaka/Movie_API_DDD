export function MoveDateBackward(years: number): Date{
    const date = new Date();
    date.setFullYear(date.getFullYear() - years);
    return date;
}

export function MoveDateForward(years: number): Date{
    const date = new Date();
    date.setFullYear(date.getFullYear() + years);
    return date;
}

export function AddDays(days: number): Date{
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date;
}

export function RemoveDays(days: number): Date{
    const date = new Date();
    date.setDate(date.getDate() - days);
    return date;
}