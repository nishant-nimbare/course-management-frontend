export interface User {
    id?:number;
    name?:string;
    email?:string;
    authToken?:string;
    role: 'TRAINER' | 'STUDENT';
    isTrainer?:boolean;
}