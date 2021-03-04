INSERT INTO notes(userusername, title, content, lastupdate) VALUES($1, $2, $3, $4) RETURNING *;
