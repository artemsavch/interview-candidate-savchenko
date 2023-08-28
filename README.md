# Project Description

You’ve been tasked with creating a feature to help clients manage firmware updates for their organization’s devices.

To accomplish this, we’ve created a table component. We’d like to populate this table with device and update data from the database.

## Server

To start the server, run `npm run serve` from the project root. Currently, this serves a basic GraphQL endpoint with the device names. You may use the included RESTful example instead, or another strategy if you prefer.

This server has access to a [sqlite3](https://www.sqlite.org/download.html) database with all the necessary data, seeded by the queries in the `sql` folder. Create additional functions or views as needed, but do not modify the existing schema or data.

## Client

To view the client in a browser, run `npm run start` from the root. This client should consume data from the local server.

Feel free to make any changes to the existing code and include new modules as needed.

## Assignment & Instructions

Take the existing code, and modify as necessary to load the data from the database, and meet the criteria for each column described below.

The table should paginate

**Note: The table should not include devices of users whose subscription end dates have passed.**

#### Name

This column displays the name of the device in the database.

This column should be sortable. Sorting on other columns will be considered bonus
#### User

This column displays the email address of the device’s user.

If the device’s user cannot perform updates, this column will also include a warning icon. Users can perform updates only if they are an admin.

#### Firmware

This column displays the device’s current version, formatted like “1.2.3”.

(See https://semver.org/ for more explanation of this convention.)

#### Last Updated

This column’s value is based on the most recent “finished” time for a completed update.

For updates completed today, this should just display "Today". Otherwise display the date.

#### Status (Unlabeled)

Devices with an in-progress update will display a loading icon. Updates are in-progress if no “finished” value is present in the database.

Our existing firmware versions can be found in the database. Devices that are on the latest version will have a green checkmark in this column.

For other devices, this column can be blank.

#### Bonus points

1. When the `firmware` column is sorted, 9.1.1 should come before 10.1.1.
2. When the `last updated` column is sorted, most recent should be first.
3. When the `status` column is sorted, checkmarks should come first, followed by loading icons, then empty rows.
4. Hint: For scalability, pagination and sorting can be handled in the back-end!
