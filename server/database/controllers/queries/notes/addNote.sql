INSERT INTO notes(userusername, title, content) VALUES($1, $2, $3) RETURNING *;
