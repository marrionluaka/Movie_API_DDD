export function MoveDateBackward(years: number, date: Date): void{
    date.setFullYear(date.getFullYear() - years);
}

export function MoveDateForward(years: number, date: Date): void{
    date.setFullYear(date.getFullYear() + years);
}

export function AddDays(days: number): Date{
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date;
}