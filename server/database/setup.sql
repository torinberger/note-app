CREATE TABLE appusers (
  username varchar(20) UNIQUE,
  password varchar(30)
);

CREATE TABLE notes (
  id SERIAL PRIMARY KEY,
  userusername varchar(20),
  title varchar(50),
  content TEXT
);
