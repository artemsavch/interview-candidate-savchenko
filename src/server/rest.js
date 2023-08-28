import express from "express";

const port = 4000;

export const serveRest = (data) => {
  const app = express();

  app.get("/devices", async (_, res) => res.send(
    await connection.raw("select name from devices")
  ));

  app.listen(port, () =>
    console.log(`REST Server ready at http://localhost:${port}`)
  );
};
