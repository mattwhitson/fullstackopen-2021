export type Course = {
    name: string,
    exerciseCount: number
}

export interface HeaderProps {
    header: string;
}

export interface ContentProps {
    courseParts: CoursePart[];
}

export interface TotalProps {
    courses: Course[]
}


interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface CourseNormalPart extends CoursePartBase {
  type: "normal";
  description: string;
}
interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

interface CourseSubmissionPart extends CoursePartBase {
  type: "submission";
  description: string;
  exerciseSubmissionLink: string;
}

export type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart;

export interface PartProps {
    course: CoursePart
}