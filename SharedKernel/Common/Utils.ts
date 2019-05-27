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

export function GenerateGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}