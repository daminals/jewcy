CREATE TABLE profile (
    ID SERIAL PRIMARY KEY,
    name CHARACTER VARYING(30) COLLATE pg_catalog."default" NOT NULL,
    joined TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    pfp BYTEA,
    CONSTRAINT uniqueuser UNIQUE (name)
                     );

