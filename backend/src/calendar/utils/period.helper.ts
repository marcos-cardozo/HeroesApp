export enum Period {
  MORNING = 'MORNING',
  AFTERNOON = 'AFTERNOON',
  EVENING = 'EVENING',
}

export function calculatePeriod(startTime: string): Period {
  const [hours] = startTime.split(':').map(Number);

  if (hours < 12) {
    return Period.MORNING;
  } else if (hours < 18) {
    return Period.AFTERNOON;
  } else {
    return Period.EVENING;
  }
}

export function groupByPeriod<T extends { startTime: string }>(
  items: T[],
): Record<Period, T[]> {
  const result: Record<Period, T[]> = {
    [Period.MORNING]: [],
    [Period.AFTERNOON]: [],
    [Period.EVENING]: [],
  };

  for (const item of items) {
    const period = calculatePeriod(item.startTime);
    result[period].push(item);
  }

  return result;
}
