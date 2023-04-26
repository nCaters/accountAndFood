DATABASE NAME: account/food;

CREATE TABLE role (
    role_id INTEGER PRIMARY KEY,
	description VARCHAR ( 50 ) NOT NULL
);
-- set extensions 
CREATE extension if not exists "uuid-ossp";

CREATE TABLE "user" (
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    role_id INTEGER,
	username VARCHAR ( 255 ) NOT NULL,
	email VARCHAR ( 255 ) NOT NULL,
	password VARCHAR ( 255 ) NOT NULL,
	FOREIGN KEY(role_id)
		REFERENCES role(role_id)
);

CREATE TABLE point (
	points_earned INTEGER ,
	user_id uuid ,
	FOREIGN KEY (user_id) REFERENCES "user"(user_id)
);

insert into role (role_id, description)
values('0','admin');

insert into role (role_id, description)
values('1','user');
select * from role;

insert into role (role_id, description)
values('2','caterer');
select * from role;

CREATE TABLE meal (
    meal_id INTEGER PRIMARY KEY,
	name VARCHAR ( 50 ) NOT NULL
);

CREATE TABLE cuisine (
    cuisine_id INTEGER PRIMARY KEY,
	name VARCHAR ( 50 ) NOT NULL
);

CREATE TABLE food (
    food_id INTEGER PRIMARY KEY,
    cuisine_id INTEGER,
	meal_id INTEGER,
	name VARCHAR ( 50 ),
	cost INTEGER,
	date_added DATE,
	FOREIGN KEY(cuisine_id)
		REFERENCES cuisine(cuisine_id),
	FOREIGN KEY(meal_id)
		REFERENCES meal(meal_id)
);

ALTER TABLE food ALTER COLUMN food_id ADD GENERATED ALWAYS AS IDENTITY (START WITH 1);

CREATE TABLE wastage (
  wastage_id SERIAL PRIMARY KEY,
  date DATE,
  food_waste_amount DECIMAL(5,2),
  food_id INTEGER,
  FOREIGN KEY (food_id) REFERENCES food(food_id)
);


CREATE TABLE rating (
	food_rating DECIMAL(3,2) NOT null,
	food_id INTEGER,
	user_id VARCHAR ( 50 ),
	FOREIGN KEY(food_id)
	REFERENCES food(food_id)
);


CREATE TABLE preference (
    username VARCHAR ( 255 ),
    meal_id INTEGER,
    date DATE,
	food_id INTEGER,
    PRIMARY KEY(username, meal_id, date),
	FOREIGN KEY(meal_id)
		REFERENCES meal(meal_id),
	FOREIGN KEY(food_id)
		REFERENCES food(food_id)
);


CREATE TABLE food_of_the_day(
	date DATE,
	food_id INTEGER,
	meal_id INTEGER,
	PRIMARY KEY(date,food_id, meal_id),
	FOREIGN KEY(food_id)
		REFERENCES food(food_id),
	FOREIGN KEY(meal_id)
		REFERENCES meal(meal_id)
);

-------------------------------------------------------------------------------------------------------------

DATABASE NAME: notification/reward;

CREATE TABLE notification (
	notification_id SERIAL PRIMARY KEY,
	message VARCHAR (100) NOT NULL,
	date DATE NOT NULL
);

CREATE TABLE reward (
	reward_id INTEGER PRIMARY KEY,
	reward_type VARCHAR ( 50 ),
	point_needed INTEGER

);