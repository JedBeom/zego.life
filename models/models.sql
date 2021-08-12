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

    enter_year INTEGER NOT NULL,
    grade            INTEGER     NOT NULL,
    class            INTEGER     NOT NULL,
    number           INTEGER     NOT NULL,
    UNIQUE (enter_year, grade, class, number),
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

CREATE TABLE IF NOT EXISTS user_upgrades
(
    id         TEXT PRIMARY KEY,

    grade      INTEGER NOT NULL,
    class      INTEGER NOT NULL,
    number     INTEGER NOT NULL,
    UNIQUE (grade, class, number),
    created_at TIMESTAMPTZ DEFAULT current_timestamp,

    FOREIGN KEY (id) REFERENCES users (id) ON DELETE CASCADE
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

CREATE TABLE IF NOT EXISTS feedbacks
(
    id         TEXT PRIMARY KEY,
    user_id    TEXT,

    content    TEXT,
    answer     TEXT,
    created_at TIMESTAMPTZ DEFAULT current_timestamp,

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
    date       TIMESTAMPTZ,
    target     INTEGER,
    created_at TIMESTAMPTZ DEFAULT current_timestamp
);

CREATE TABLE IF NOT EXISTS notices
(
    id           TEXT PRIMARY KEY,
    title        TEXT NOT NULL,
    content      TEXT NOT NULL,
    content_html TEXT,
    author       TEXT,
    created_at   TIMESTAMPTZ DEFAULT current_timestamp,
    updated_at   TIMESTAMPTZ,
    deleted_at   TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS elective_subjects
(
    id            SERIAL PRIMARY KEY,
    grade         INTEGER,
    short_name    TEXT,
    full_name     TEXT,
    teacher       TEXT,
    room          TEXT,
    available_bit INTEGER
);

CREATE TABLE IF NOT EXISTS elective_subjects_to_users
(
    user_id    TEXT PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT current_timestamp,
    updated_at TIMESTAMPTZ,

    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS class_timetables
(
    grade                     INTEGER,
    class                     INTEGER,
    PRIMARY KEY (grade, class),
    subjects                  JSONB,
    elective_subject_template TEXT[],
    created_at                TIMESTAMPTZ DEFAULT current_timestamp,
    updated_at                TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS campaigns
(
    id         TEXT PRIMARY KEY NOT NULL,
    is_ready   BOOL,

    title      TEXT             NOT NULL,
    sub_title  TEXT             NOT NULL,
    image_src  TEXT             NOT NULL,
    link       TEXT             NOT NULL,

    user_id    TEXT             NOT NULL,
    price      INTEGER     DEFAULT 0,
    payment    TEXT,
    pay_code   TEXT,
    payed_at   TIMESTAMPTZ,

    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMPTZ,
    start_at   TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    end_at     TIMESTAMPTZ,

    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS campaigns_not_payed
(
    id         TEXT PRIMARY KEY NOT NULL,
    is_ready   BOOL,

    title      TEXT             NOT NULL,
    sub_title  TEXT             NOT NULL,
    image_src  TEXT             NOT NULL,
    link       TEXT             NOT NULL,

    user_id    TEXT             NOT NULL,
    price      INTEGER     DEFAULT 0,
    payment    TEXT,
    pay_code   TEXT UNIQUE,
    payed_at   TIMESTAMPTZ,

    pay_link   TEXT,

    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMPTZ,
    start_at   TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    end_at     TIMESTAMPTZ,

    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
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
    status     INTEGER,
    error      TEXT,
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
    key   TEXT PRIMARY KEY,
    value TEXT
);

CREATE TABLE IF NOT EXISTS tokens
(
    id         TEXT PRIMARY KEY,
    user_id    TEXT,
    type       INTEGER NOT NULL,
    created_at TIMESTAMPTZ DEFAULT current_timestamp,
    used_at    TIMESTAMPTZ,

    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE -- 같이 삭제
);
