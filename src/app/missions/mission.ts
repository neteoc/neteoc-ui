export interface Mission {
  id?: string;
  title: string;
  description: string;
  location: string;
  roster: Array<roster>;
}

interface roster {
  userId: string;
  location: {
    Latitude: number;
    Longitude: number;
  }
}


