export const redisError = (error: string) => {
  console.error(
    `An error '${error}' occured while saving candidate data in Redis`,
  );
  throw new Error("Internal server error");
};
