export type StationId =
  | 'recto'
  | 'legarda'
  | 'pureza'
  | 'v_mapa'
  | 'j_ruiz'
  | 'gilmore'
  | 'betty_go'
  | 'cubao'
  | 'anonas'
  | 'katipunan'
  | 'santolan'
  | 'marikina'
  | 'antipolo';

export type FareType = 'beep' | 'sjt';

export type Line = 'LRT2';

export interface Station {
  id: StationId;
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
    [key in StationId]?: {
      [key in StationId]?: FareInfo;
    };
  };
}
