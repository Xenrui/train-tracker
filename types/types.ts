export type FareType = 'beep' | 'sjt';

export type Line = 'LRT2';

export interface Station {
  code: string;
  name: string;
  order: number;
  is_terminal?: boolean;
  latitude: number;
  longitude: number;
}

export interface StationsData {
  line: Line;
  stations: Station[];
}
export interface FareInfo {
  beep: number;
  sjt: number;
}
export interface FaresData {
  fares: {
    [key in string]?: {
      [key in string]?: FareInfo;
    };
  };
}
