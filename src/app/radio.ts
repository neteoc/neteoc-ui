export interface Radio {

    // Original properties from whitepaper 
    id: string;
    digitalID: number;
    assetTag: string;
    creationTimestamp: string;
    comment: string;

    // Hatcher's additional properties 
    serialNumber: string; // OEM serial number
    deployable: boolean; // Is the radio deployable or waiting for repair?
    make: string; // OEM? Motorola, Kenwood, etc.
    model: string; // OEM Model: UV-5R, APX8000, etc.
    modes: Modes[]; // List of modes the radio can operate in
    bands: Bands[]; // List of bands the radio can operate in
    features: Features[]; // List of features the radio has
    log: LogEntry[]; // List of log entries for the radio. For example, when it was last programmed, when it was last tested, etc.
}

interface RadioSystem {
    id: string;
    name: string;
}

interface LogEntry {
    timestamp: string;
    entry: string;
}

interface Features {
    digital: boolean;
    encryption: boolean;
    encryptionType: string;
    gps: boolean;
    frontFaceProgramming: boolean;
    bluetooth: boolean;
    wifi: boolean;
}

interface Modes {
    dmr: boolean;
    p25: boolean;
    nxdn: boolean;
    c4fm: boolean;
    dstar: boolean;
    analog: boolean;
}

interface Bands {
    vhf: boolean;
    uhf: boolean;
    seven: boolean;
    eight: boolean;
    nine: boolean;
    hf: boolean;
    gz: boolean;
}