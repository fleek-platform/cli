export const processPromisesBatch = async <T, R>(
  items: T[],
  fn: (item: T) => Promise<R>,
  batchSize = 10,
) => {
  let results: R[] = [];
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(
      i,
      i + batchSize > items.length ? items.length : i + batchSize,
    );
    const batchResults = await Promise.all(batch.map((item) => fn(item)));
    results = [...results, ...batchResults];
  }

  return results;
};
