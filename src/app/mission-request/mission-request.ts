export interface MissionRequest {
    id?: string;
    name: string;
    description: string;
    address: address;
    submittedBy: string;
    ownedBy?: string;
    submittedDate: string;
    startDate: string;
    endDate: string;
    // type: string;
    // siteContact: string;
    // teamContact: string;
    // status: string;
}


interface address {
    name: string;
    address: string;
    address2?: string;
    city: string;
    state: string;
    postalCode: string;
}

