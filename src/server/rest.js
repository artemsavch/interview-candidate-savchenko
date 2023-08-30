import express from "express";
import {connection} from "./connection.js";
import cors from "cors"

const port = 4000;

export const serveRest = (data) => {
  const app = express();
  app.use(cors());

  app.get("/devices", async (_, res) => res.send(
    await connection.raw("select * from devices")
  ));

  app.get("/users", async (_, res) => res.send(
      await connection.raw("select * from users")
  ));

  app.get('/users-with-related-data', async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const size = parseInt(req.query.perPage) || 10;

      const column = req.query.column || 'device_name';
      const order = req.query.order || 'asc';

      const startIndex = (page - 1) * size;
      const endIndex = startIndex + size;

      const currentData = new Date().toISOString();

      const latestFirmwareVersion = await connection.select('*')
          .from('firmware_versions')
          .orderBy('major', 'desc')
          .orderBy('minor', 'desc')
          .orderBy('patch', 'desc')
          .first();


      let query = connection.select(
          'users.email AS email',
          'users.admin AS is_admin',
          'users.subscription_ends AS due_date',
          'devices.name AS device_name',
          'updates.finished AS finish_date',
          connection.raw("firmware_versions.major || '.' || firmware_versions.minor || '.' || firmware_versions.patch AS firmware_version"),
          connection.raw(`
          CASE
            WHEN devices.firmware_version_id = ? THEN 'latest'
            WHEN updates.finished IS NULL THEN 'loading'
            ELSE ''
          END as firmware_status
        `, latestFirmwareVersion.id)

      )
          .leftJoin('devices', 'users.email', 'devices.user_email')
          .leftJoin('updates', 'devices.id', 'updates.device_id')
          .leftJoin('firmware_versions', 'firmware_versions.id', 'devices.firmware_version_id')
          .where('due_date', '>', currentData)
          .from('users');

      if (column === 'firmware_version') {
        query
            .orderBy('firmware_versions.major', order)
            .orderBy('firmware_versions.minor', order)
            .orderBy('firmware_versions.patch', order);
      } else if (column === 'status') {
        query
            .orderBy(
            connection.raw(`
              CASE firmware_status
                WHEN 'latest' THEN 1
                WHEN 'loading' THEN 2
                ELSE 3
              END
           `),
            order
        )
      } else {
        query.orderBy(column, order)
      }

      const usersWithRelatedData = await query;

      const paginatedData = usersWithRelatedData.slice(startIndex, endIndex);

      res.json({
        total: usersWithRelatedData.length,
        page,
        size,
        pages: Math.ceil(usersWithRelatedData.length / size),
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
