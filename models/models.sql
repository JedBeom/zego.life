CREATE TABLE IF NOT EXISTS diets
(
    id         TEXT PRIMARY KEY,
    date       TIMESTAMPTZ NOT NULL,
    timestamp  TEXT        NOT NULL,
    type       INTEGER     NOT NULL,
    content    TEXT,
    canceled   BOOL DEFAULT false NOT NULL,
    created_at TIMESTAMPTZ DEFAULT current_timestamp
);

CREATE TABLE IF NOT EXISTS users
(
    id               TEXT PRIMARY KEY,

    grade            INTEGER     NOT NULL,
    class            INTEGER     NOT NULL,
    number           INTEGER     NOT NULL,
    UNIQUE (grade, class, number),
    name             VARCHAR(10) NOT NULL,

    sex              INTEGER,

    email            TEXT UNIQUE,
    password         TEXT,

    barcode          TEXT UNIQUE,
    kitchen_mem_code TEXT UNIQUE,

    birth_year       INTEGER,
    birth_month      INTEGER,
    birth_day        INTEGER,

    residence        INTEGER,

    created_at       TIMESTAMPTZ DEFAULT current_timestamp,
    updated_at       TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS diet2users
(
    diet_id    TEXT,
    user_id    TEXT,
    PRIMARY KEY (diet_id, user_id),

    applied    bool,
    created_at TIMESTAMPTZ DEFAULT current_timestamp,

    FOREIGN KEY (diet_id) REFERENCES diets (id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
    -- 참조하는 게 삭제되었을 때 같이 삭제됨
);

CREATE TABLE IF NOT EXISTS diet_reviews
(
    diet_id    TEXT,
    user_id    TEXT,
    PRIMARY KEY (diet_id, user_id),

    rate       INTEGER NOT NULL,
    best_index INTEGER,
    best_menu  TEXT,
    created_at TIMESTAMPTZ DEFAULT current_timestamp,

    FOREIGN KEY (diet_id) REFERENCES diets (id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS events
(
    id          TEXT PRIMARY KEY,
    name        TEXT                      NOT NULL,
    date        DATE                      NOT NULL,
    date_string TEXT                      NOT NULL,
    type        INTEGER                   NOT NULL,

    grade1      BOOL        DEFAULT FALSE NOT NULL,
    grade2      BOOL        DEFAULT FALSE NOT NULL,
    grade3      BOOL        DEFAULT FALSE NOT NULL,

    created_at  TIMESTAMPTZ DEFAULT current_timestamp
);

CREATE TABLE IF NOT EXISTS dday_events
(
    id         TEXT PRIMARY KEY,
    name       TEXT,
    date       DATE,
    target     INTEGER,
    created_at TIMESTAMPTZ DEFAULT current_timestamp
);

CREATE TABLE IF NOT EXISTS sessions
(
    id         TEXT PRIMARY KEY NOT NULL,
    user_id    TEXT             NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id),

    created_at TIMESTAMPTZ DEFAULT current_timestamp,
    deleted_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS access_logs
(
    id         TEXT PRIMARY KEY,
    session_id TEXT,
    ip         INET,
    method     TEXT,
    path       TEXT,
    error TEXT,
    created_at TIMESTAMPTZ DEFAULT current_timestamp
);

CREATE TABLE IF NOT EXISTS error_logs
(
    id            TEXT PRIMARY KEY,
    user_id       TEXT,
    access_log_id TEXT,
    location      TEXT,
    content       TEXT,
    created_at    TIMESTAMPTZ DEFAULT current_timestamp,

    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE SET DEFAULT,
    FOREIGN KEY (access_log_id) REFERENCES access_logs (id) ON DELETE SET DEFAULT
);

CREATE TABLE IF NOT EXISTS settings
(
    key TEXT PRIMARY KEY,
    value TEXT
);
