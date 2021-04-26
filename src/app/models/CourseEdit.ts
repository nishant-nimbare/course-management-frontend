import {CourseLocation} from './Location';

export interface CourseEdit {
    id?:number; // new course will not have id
    name?: string;
    description?: string;
    location?:CourseLocation;
}