CREATE TABLE appusers (
  username varchar(20) UNIQUE,
  password varchar(20)
);

CREATE TABLE notes (
  id SERIAL PRIMARY KEY,
  userusername varchar(20),
  lastupdate timestamp,
  title varchar(50),
  content TEXT
);
