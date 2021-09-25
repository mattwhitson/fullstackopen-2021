export type Course = {
    name: string,
    exerciseCount: number
}

export interface HeaderProps {
    header: string;
}

export interface ContentProps {
    name: string,
    exerciseCount: number
}

export interface TotalProps {
    courses: Course[]
}