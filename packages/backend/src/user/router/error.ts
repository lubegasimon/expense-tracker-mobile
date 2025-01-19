export const redisError = (error: any) => {
  console.error(error);
  throw new Error("Internal server error");
};
