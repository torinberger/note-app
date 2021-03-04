UPDATE notes
SET title = $2,
    content = $3,
    lastupdate = $4
WHERE id = $1;
