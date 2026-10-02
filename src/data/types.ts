// CodeAtlas — shared data types
export interface Lesson {
  gi: number;        // global index within course (1-based)
  modId: string;     // module id
  modTitle: string;  // module title
  title: string;
  videoId: string;
  url: string;
}

export interface CourseModule {
  id: string;
  title: string;
  lessonCount: number;
  lessons: Lesson[];
}

export interface Course {
  num: number;
  id: string;
  title: string;
  playlistUrl: string;
  domain: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  tags: string[];
  moduleCount: number;
  modules: CourseModule[];
  lessons: Lesson[];
  lessonCount: number;
}

export interface NoteSection {
  heading: string;
  points: string[];
}

export interface PracticeLink {
  label: string;
  url: string;
  note: string;
}

export interface CourseProject {
  title: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  brief: string;
}

export interface CourseMeta {
  shortTitle: string;
  description: string;
  learn: string[];
  prereqs: string[];
  notes: NoteSection[];
  practice: PracticeLink[];
  projects: CourseProject[];
  resourceLinks?: { label: string; url: string }[];
}

export interface Catalog {
  version: number;
  courses: Course[];
}
