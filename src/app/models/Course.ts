import {CourseLocation} from './Location';

export interface Course {
    id:number;
    name: string;
    description: string;
    courseLocation?: CourseLocation;
    created_at: string;
    updated_at: string;
    skills?: string[];
    prerequisites?: string[];
}