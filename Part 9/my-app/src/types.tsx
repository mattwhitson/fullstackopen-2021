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

interface CourseDescription extends CoursePartBase {
  description: string;
}

interface CourseNormalPart extends CourseDescription {
  type: "normal";
  
}
interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

interface CourseSubmissionPart extends CourseDescription {
  type: "submission";
  exerciseSubmissionLink: string;
}

export type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart;

export interface PartProps {
    course: CoursePart
}