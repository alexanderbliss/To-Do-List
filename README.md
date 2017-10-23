# To-Do-List

here is some data if yoou eant to populate the database.

CREATE TABLE "to-dos"(
	
	"id" serial primary key,
	"task" varchar(80),
	"completed" boolean,
	"date" varchar(14),
	"description" varchar(200)
	
	
	);
	
	INSERT INTO "to-dos" (task, completed, date, description) 
	VALUES 
	
('Set up Client', true, '1/1/1', 'set up the client and source in the appropriate files.'),
('Set up Server', true, '2/2/2', 'set up serverside code and test in terminal'),
('Set up Database', true , '3/3/3', 'set up database by adding table and and base values to test against'),
('append data to DOM', false, '4/4/4', 'append database data to DOM'),
('edit&delete', false, '5/5/5', 'add an eddit and delte button that also effect the database.'),
('complete button', false, '6/6/6', 'add a complete button that affects server status and DOM');