-- Cuisine
Insert into cuisine values(1,'Chinese');
Insert into cuisine values(2,'Western');
Insert into cuisine values(3,'Indian');
Insert into cuisine values(4,'Muslim');
Insert into cuisine values(5,'Vegetarian');

-- Meal
Insert into meal values(1,'Breakfast');
Insert into meal values(2,'Lunch');
Insert into meal values(3,'Dinner');

-- Food
Insert into food (cuisine_id, meal_id, name, cost, date_added)values( 1, 1, 'Chicken Porridge', '3', CURRENT_DATE);
Insert into food (cuisine_id, meal_id, name, cost, date_added)values( 1, 1, 'Bee Hoon', '3', CURRENT_DATE);
Insert into food (cuisine_id, meal_id, name, cost, date_added)values( 2, 1, 'Egg and Toast', '4', CURRENT_DATE);
Insert into food (cuisine_id, meal_id, name, cost, date_added)values( 2, 2, 'Pork Chop', '5', CURRENT_DATE);
Insert into food (cuisine_id, meal_id, name, cost, date_added)values( 1, 2, 'Wonton Noodle', '3', CURRENT_DATE);
Insert into food (cuisine_id, meal_id, name, cost, date_added)values( 3, 2, 'Prata', '2', CURRENT_DATE);
Insert into food (cuisine_id, meal_id, name, cost, date_added)values( 3, 2, 'Mutton Briyani', '10', CURRENT_DATE);
Insert into food (cuisine_id, meal_id, name, cost, date_added)values( 1, 2, 'Chicken Rice', '4', CURRENT_DATE);
Insert into food (cuisine_id, meal_id, name, cost, date_added)values( 2, 3, 'Aglio Olio', '6', CURRENT_DATE);
Insert into food (cuisine_id, meal_id, name, cost, date_added)values( 1, 3, 'Chilli Crab', '38', CURRENT_DATE);
Insert into food (cuisine_id, meal_id, name, cost, date_added)values( 4, 3, 'Nasi Padang', '11', CURRENT_DATE);
Insert into food (cuisine_id, meal_id, name, cost, date_added)values( 5, 3, 'Vegetarian Laksa', '3', CURRENT_DATE);


-- food of the day
Insert into food_of_the_day values('24/4/2023', 1, 1);
Insert into food_of_the_day values('24/4/2023', 3, 1);
Insert into food_of_the_day values('24/4/2023', 4, 2);
Insert into food_of_the_day values('24/4/2023', 7, 2);
Insert into food_of_the_day values('25/4/2023', 8, 2);
Insert into food_of_the_day values('25/4/2023', 11, 3);


-- reward
Insert into reward values(1, 'Green Tea', 5);
Insert into reward values(2, 'Milk Tea', 5);
Insert into reward values(3, 'Peach Tea', 5);
Insert into reward values(4, 'Apple', 5);
Insert into reward values(5, 'Orange', 5);
Insert into reward values(6, 'Red Bean Bun', 5);

-- account
insert into role (role_id, description)
values('0','admin');

insert into role (role_id, description)
values('1','user');
select * from role;

insert into role (role_id, description)
values('2','caterer');
select * from role;