-- select * from users
-- inner join users ON users.id = posts.author_id
select * from users 
where auth0id = $1;