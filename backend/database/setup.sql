DROP TABLE IF EXISTS post;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS token;
DROP TABLE IF EXISTS user_account;



CREATE TABLE categories (
    category_id INT GENERATED ALWAYS AS IDENTITY,
    category VARCHAR (50) NOT NULL,
    PRIMARY KEY (category_id)
);

CREATE TABLE user_account (
    user_id INT GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(30) UNIQUE NOT NULL,
    password CHAR(60) NOT NULL,
    PRIMARY KEY (user_id)
);
CREATE TABLE post (
    post_id INT GENERATED ALWAYS AS IDENTITY,
    category_id INT DEFAULT 1,
    content VARCHAR (500) NOT NULL,
    user_id INT DEFAULT 1,
    date DATE DEFAULT(CURRENT_DATE),
    PRIMARY KEY (post_id),
    FOREIGN KEY (category_id) REFERENCES categories(category_id),
    FOREIGN KEY (user_id) REFERENCES user_account(user_id)
);
CREATE TABLE token (
    token_id INT GENERATED ALWAYS AS IDENTITY,
    user_id INT NOT NULL,
    token CHAR(36) UNIQUE NOT NULL,
    PRIMARY KEY (token_id),
    FOREIGN KEY (user_id) REFERENCES user_account(user_id)
);

INSERT INTO categories (category)
VALUES ('General'),
 ('Food'),
 ('Dream'),
 ('Travel'),
 ('Work'),
 ('Mood');

INSERT INTO user_account (username, password) VALUES ('Admin', '123456');
INSERT INTO post (category_id, content, user_id, date) VALUES (1, 'Hello World!', 1, '2023-10-05');
