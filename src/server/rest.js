import express from "express";
import {connection} from "./connection.js";
import cors from "cors"
import { fetchLatestFirmwareVersion, buildQuery } from "./queries.js";

const port = 4000;

export const serveRest = (data) => {
  const app = express();
  app.use(cors());

  app.get('/users-with-related-data', async (req, res) => {
    try {
      const {
        page = 1,
        perPage = 10,
        column = 'device_name',
        order = 'asc'
      } = req.query;

      const startIndex = (parseInt(page) - 1) * parseInt(perPage);
      const endIndex = startIndex + parseInt(perPage);

      const latestFirmwareVersion = await fetchLatestFirmwareVersion(connection);
      const query = buildQuery({
        connection,
        column,
        order,
        latestFirmwareVersion
      });

      const usersWithRelatedData = await query;

      const paginatedData = usersWithRelatedData.slice(startIndex, endIndex);

      const total = usersWithRelatedData.length;

      res.json({
        page,
        perPage,
        pages: Math.ceil(total / perPage),
        total,
        data: paginatedData,
      });
    } catch (error) {
      res.status(500).json({
        error: 'Internal server error',
        message: error.message
      });
    }
  })

  app.listen(port, () =>
    console.log(`REST Server ready at http://localhost:${port}`)
  );
};
