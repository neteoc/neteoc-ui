export interface Mission {
  id?: string;
  title: string;
  description: string;
  location: string;
  roster: roster[];
  ownerID: string;
  admins: admins[];
  startDate: Date;
  endDate: Date;
  signupEnabled: boolean;
  
}

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
}


interface address {
  name: string;
  address: string;
  address2?: string;
  city: string;
  state: string;
  postalCode: string;
}

interface roster {
  userId: string;
  location: {
    Latitude: number;
    Longitude: number;
  }
  
}

interface admins {
  userId: string;
}
