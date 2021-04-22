DROP TABLE IF EXISTS appusers;
DROP TABLE IF EXISTS notes;

CREATE TABLE appusers (
  username varchar(20) UNIQUE,
  password text
);

CREATE TABLE notes (
  id SERIAL PRIMARY KEY,
  userusername varchar(20),
  lastupdate timestamp,
  title varchar(50),
  content text
);
