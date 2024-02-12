//['page','limit','sortBy','sortOrder']

const pick = <T extends Record<string, unknown>, K extends keyof T>(
  url: string,
  keys: K[]
): Partial<T> => {
  const params = new URL(url);
  const finalObj: Partial<T> = {};

  keys.forEach((key) => {
    finalObj[key] = params.searchParams.get(key as string) as T[K];
  });

  return finalObj;
};

export default pick;
