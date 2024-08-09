export interface User {
    $key: string;
    name: string;
    approved: boolean;
    private: [];
    public: [];
}

export interface Profile {
    email: string;
    displayName: string;
    photoURL: string;
}

export interface Roles {
    superadmin?: boolean;
    missionrequestor?: boolean;
    recruiting?: boolean;
}