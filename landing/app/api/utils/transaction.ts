export const transaction = async (
  session: any,
  operations: any,
  action: any
) => {
  let data: any;
  return await session
    .withTransaction(async () => {
      const temp = await operations();
      data = !Array.isArray(temp) ? [temp] : temp;
    })
    .then(() => {
      return {
        data,
        status: "success",
        message: `${action} success`,
      };
    })
    .catch((e: any) => {
      return {
        data: [],
        status: "fail",
        message: `${e} failed`,
      };
    })
    .finally(() => {
      session.endSession();
    });
};
