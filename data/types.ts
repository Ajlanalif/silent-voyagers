export interface TelemetryPoint {
  sol?: number;
  earthDate: string;
  metric: string;
  value: number | string;
  unit: string;
  notes?: string;
}

export interface DatasetReference {
  name: string;
  portalUrl: string;
  agency: string;
  ingestionRole: string;
  datasetId?: string;
}

export interface Relic {
  id: string;
  name: string;
  callsign: string;
  celestialBody: 'Mars' | 'Moon';
  landingSite: string;
  coordinates: {
    latitude: number;
    longitude: number;
    formatted: string;
    elevation?: string;
  };
  missionDates: {
    launchDate: string;
    landingDate: string;
    finalContactDate: string;
    durationActive: string;
    plannedDuration: string;
  };
  missionStats: {
    distanceTraveledKm?: number;
    photosTransmitted?: number;
    eventsLogged?: string;
    powerSource: string;
  };
  status: 'Silent' | 'Entrapped' | 'Monument' | 'Decommissioned';
  statusReason: string;
  finalTransmission: {
    sol?: number;
    earthDate: string;
    rawMessage?: string;
    humanInterpretation: string;
    batteryLevel?: string;
    tauOpacity?: number;
  };
  narrativeChapter: {
    titleEn: string;
    titleBn: string;
    synopsisEn: string;
    synopsisBn: string;
    themeColor: string;
  };
  scientificImpact: string[];
  orbitalVerification: {
    orbiter: string;
    instrument: string;
    archiveImageId: string;
    verificationNotes: string;
  };
  nasaDatasets: DatasetReference[];
  modelAssetPath: string;
  archivalThumbnail: string;
}
