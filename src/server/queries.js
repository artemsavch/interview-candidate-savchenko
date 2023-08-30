const sortColumns = {
    device_name: 'devices.name',
    email: 'users.email',
    is_admin: 'users.admin',
    due_date: 'users.subscription_ends',
    finish_date: 'updates.finished',
    status: `
    CASE firmware_status
      WHEN 'latest' THEN 1
      WHEN 'loading' THEN 2
      ELSE 3
    END
  `,
};

export const fetchLatestFirmwareVersion = async (connection) => {
    return connection
        .select("*")
        .from("firmware_versions")
        .orderBy("major", "desc")
        .orderBy("minor", "desc")
        .orderBy("patch", "desc")
        .first();
};

export const buildQuery = ({ connection, column, order, latestFirmwareVersion }) => {
    const currentDate = new Date().toISOString();

    let query = connection
        .select(
            "users.email AS email",
            "users.admin AS is_admin",
            "users.subscription_ends AS due_date",
            "devices.name AS device_name",
            "updates.finished AS finish_date",
            connection.raw(
                "firmware_versions.major || '.' || firmware_versions.minor || '.' || firmware_versions.patch AS firmware_version"
            ),
            connection.raw(`
                CASE
                  WHEN devices.firmware_version_id = ? THEN 'latest'
                  WHEN updates.finished IS NULL THEN 'loading'
                  ELSE ''
                END as firmware_status
                `, latestFirmwareVersion.id
            )
        )
        .leftJoin("devices", "users.email", "devices.user_email")
        .leftJoin("updates", "devices.id", "updates.device_id")
        .leftJoin("firmware_versions", "firmware_versions.id", "devices.firmware_version_id")
        .where("due_date", ">", currentDate)
        .from("users")

        if (column === 'firmware_version') {
            query
                .orderBy("firmware_versions.major", order)
                .orderBy("firmware_versions.minor", order)
                .orderBy("firmware_versions.patch", order);
        } else {
            query.orderBy(connection.raw(sortColumns[column] || column), order);
        }

    return query;
};
