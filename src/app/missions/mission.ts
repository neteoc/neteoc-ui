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
