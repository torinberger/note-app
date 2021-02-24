INSERT INTO appusers(username, password) VALUES($1, $2) RETURNING *;
