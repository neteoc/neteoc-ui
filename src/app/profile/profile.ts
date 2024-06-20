export interface Profile {
    $key: string;
    pubDetails: pubDetails;
    homeOfRecord: Address;
    primaryICE: Contact;
    alternateICE: Array<Contact>
}

export interface pubDetails {
    displayName: string;
    email: string;
    photoURL: string;
    phoneNumber: string;
}

export interface Address {
    street1: string;
    street2: string;
    city: string;
    state: string;
    zip: string;
    description: string;
}

export interface Contact {
    name: string;
    phone: string;
    email: string;
    address: Address;
    description: string;
}