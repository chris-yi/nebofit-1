insert into activity (user_id, date, calories, steps, distance) values ($1, $2, $3, $4, $5)
returning *;