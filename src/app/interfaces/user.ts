import { Vehicle } from './vehicle';

export interface User {
    id?: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: number;
    login: string;
    password?: string;
    birthday?:  Date;
    lastLogin?: Date;
    createdAt?: Date;
    cars?: Vehicle[];
    message?: string;
}
