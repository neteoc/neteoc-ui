import { User } from './user';

export interface Roles {
    name: string;
    description: string;
    members: User[];
}
