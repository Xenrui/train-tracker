import faresData from '@/data/trains/lrt2/fares.json';
import { FaresData, FareType, Station } from '@/types/types';

export function calculateFare(
  from: Station | null,
  to: Station | null,
  fareType: FareType,
  isDiscounted: boolean,
): number | null {
  if (!from || !to) return null;

  const fares = (faresData as FaresData).fares;
  const fare =
    fares?.[from.id]?.[to.id]?.[fareType] ??
    fares?.[to.id]?.[from.id]?.[fareType];

  if (fare === undefined) return null;

  return isDiscounted ? fare / 2 : fare;
}
