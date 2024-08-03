export interface User {
    $key: string;
    pubDetails: object;
    roles: [string];
}

export interface UserProfile {
    email: string;
    displayName: string;
    photoURL: string;
}

export interface UserRoles {
    key: [string];
}