DROP TABLE IF EXISTS diets CASCADE;
CREATE TABLE diets
(
    id         TEXT PRIMARY KEY,
    date       TIMESTAMPTZ NOT NULL,
    timestamp  TEXT        NOT NULL,
    type       INTEGER     NOT NULL,
    content    TEXT,
    created_at TIMESTAMPTZ DEFAULT current_timestamp
);

DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users
(
    id               TEXT PRIMARY KEY,

    grade            INTEGER     NOT NULL,
    class            INTEGER     NOT NULL,
    number           INTEGER     NOT NULL,
    UNIQUE (grade, class, number),
    name             VARCHAR(10) NOT NULL,

    email            TEXT UNIQUE,
    password         TEXT,

    barcode          TEXT UNIQUE,
    kitchen_mem_code TEXT UNIQUE,

    birth_year       INTEGER,
    birth_month      INTEGER,
    birth_day        INTEGER,

    created_at       TIMESTAMPTZ DEFAULT current_timestamp,
    updated_at       TIMESTAMPTZ
);

DROP TABLE IF EXISTS diet2users;
CREATE TABLE diet2users
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

DROP TABLE IF EXISTS access_log;
CREATE TABLE access_log
(
    id         TEXT PRIMARY KEY,
    session_id TEXT,
    ip         INET,
    method     TEXT,
    path       TEXT,
    created_at TIMESTAMPTZ DEFAULT current_timestamp
);

DROP TABLE IF EXISTS error_log;
CREATE TABLE error_log
(
    id            TEXT PRIMARY KEY,
    user_id       TEXT,
    access_log_id TEXT,
    location      TEXT,
    content       TEXT,
    created_at    TIMESTAMPTZ DEFAULT current_timestamp,

    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE SET DEFAULT,
    FOREIGN KEY (access_log_id) REFERENCES access_log (id) ON DELETE SET DEFAULT
)