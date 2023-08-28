-- DO NOT MODIFY THIS FILE

INSERT INTO users
(
  "email",
  "admin",
  "subscription_ends"
)
VALUES
(
  'jwinger@greendale.edu',
  true,
  DATETIME('NOW', '+5 DAYS')
),
(
  'anadir@greendale.edu',
  true,
  DATETIME('NOW', '+6 DAYS')
),
(
  'phawthorne@aol.com',
  false,
  DATETIME('NOW', '+3 DAYS')
),
(
  'aedison@greendale.edu',
  false,
  DATETIME('NOW', '+4 DAYS')
),
(
  'sbennett@greendale.edu',
  false,
  DATETIME('NOW', '+2 DAYS')
),
(
  'tbarnes@greendale.edu',
  true,
  DATETIME('NOW', '-5 DAYS')
),
(
  'bperry@greendale.edu',
  false,
  DATETIME('NOW', '+1 DAYS')
);

INSERT INTO firmware_versions
(
  "major",
  "minor",
  "patch"
)
VALUES
( 1, 0, 0 ),
( 1, 9, 0 ),
( 1, 10, 0 ),
( 2, 0, 0 ),
( 10, 0, 0 ),
( 10, 0, 1 )
;

INSERT INTO devices
(
  "name",
  "user_email",
  "firmware_version_id"
)
VALUES
(
  'PC',
  'jwinger@greendale.edu',
  1
),
(
  'Phone',
  'jwinger@greendale.edu',
  2
),
(
  'Tablet',
  'jwinger@greendale.edu',
  3
),
(
  'Television',
  'jwinger@greendale.edu',
  4
),
(
  'Watch',
  'jwinger@greendale.edu',
  5
),
(
  'Robot',
  'jwinger@greendale.edu',
  6
),

(
  'PC',
  'anadir@greendale.edu',
  2
),
(
  'Phone',
  'anadir@greendale.edu',
  3
),
(
  'Tablet',
  'anadir@greendale.edu',
  4
),
(
  'Television',
  'anadir@greendale.edu',
  5
),
(
  'Watch',
  'anadir@greendale.edu',
  6
),
(
  'Robot',
  'anadir@greendale.edu',
  1
),

(
  'PC',
  'phawthorne@aol.com',
  3
),
(
  'Phone',
  'phawthorne@aol.com',
  4
),
(
  'Tablet',
  'phawthorne@aol.com',
  5
),
(
  'Television',
  'phawthorne@aol.com',
  6
),
(
  'Watch',
  'phawthorne@aol.com',
  1
),
(
  'Robot',
  'phawthorne@aol.com',
  2
),

(
  'PC',
  'aedison@greendale.edu',
  4
),
(
  'Phone',
  'aedison@greendale.edu',
  5
),
(
  'Tablet',
  'aedison@greendale.edu',
  6
),
(
  'Television',
  'aedison@greendale.edu',
  1
),
(
  'Watch',
  'aedison@greendale.edu',
  2
),
(
  'Robot',
  'aedison@greendale.edu',
  3
),

(
  'PC',
  'sbennett@greendale.edu',
  4
),
(
  'Phone',
  'sbennett@greendale.edu',
  5
),
(
  'Tablet',
  'sbennett@greendale.edu',
  6
),
(
  'Television',
  'sbennett@greendale.edu',
  1
),
(
  'Watch',
  'sbennett@greendale.edu',
  2
),
(
  'Robot',
  'sbennett@greendale.edu',
  3
),

(
  'PC',
  'tbarnes@greendale.edu',
  5
),
(
  'Phone',
  'tbarnes@greendale.edu',
  6
),
(
  'Tablet',
  'tbarnes@greendale.edu',
  1
),
(
  'Television',
  'tbarnes@greendale.edu',
  2
),
(
  'Watch',
  'tbarnes@greendale.edu',
  3
),
(
  'Robot',
  'tbarnes@greendale.edu',
  4
),

(
  'PC',
  'bperry@greendale.edu',
  6
),
(
  'Phone',
  'bperry@greendale.edu',
  1
),
(
  'Tablet',
  'bperry@greendale.edu',
  2
),
(
  'Television',
  'bperry@greendale.edu',
  3
),
(
  'Watch',
  'bperry@greendale.edu',
  4
),
(
  'Robot',
  'bperry@greendale.edu',
  5
);

INSERT INTO updates
(
  "device_id",
  "finished"
)
VALUES
( 1, datetime('now', '-1 HOURS') ),
( 2, NULL ),
( 3, datetime('now', '-20 DAYS') ),
( 4, datetime('now', '-20 HOURS') ),
( 5, datetime('now', '-1 HOURS') ),
( 6, datetime('now', '-1 DAYS') ),
( 6, datetime('now', '-12 DAYS') ),

( 7, datetime('now', '-1 DAYS') ),
( 8, NULL),
( 9, datetime('now', '-1 DAYS') ),
( 10, datetime('now', '-2 DAYS') ),
( 11, datetime('now', '-2 DAYS') ),
( 12, datetime('now', '-1 DAYS') ),
( 12, datetime('now', '-10 HOURS') ),

( 13, datetime('now', '-12 HOURS') ),
( 14, datetime('now', '-1 DAYS') ),
( 15, datetime('now', '-2 DAYS') ),
( 16, datetime('now', '-1 DAYS') ),
( 17, datetime('now', '-12 HOURS') ),
( 18, datetime('now', '-1 DAYS') ),
( 18, datetime('now', '-10 DAYS') ),

( 19, datetime('now', '-12 DAYS') ),
( 20, datetime('now', '-1 DAYS') ),
( 21, datetime('now', '-20 HOURS') ),
( 22, datetime('now', '-1 DAYS') ),
( 23, datetime('now', '-1 DAYS') ),
( 24, datetime('now', '-1 DAYS') ),
( 24, NULL),

( 25, datetime('now', '-20 DAYS') ),
( 27, datetime('now', '-1 DAYS') ),
( 29, datetime('now', '-20 DAYS') ),
( 31, datetime('now', '-1 DAYS') ),
( 33, datetime('now', '-1 DAYS') ),
( 35, datetime('now', '-1 DAYS') )
;
