CREATE TABLE `departments_table` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(40) NOT NULL,
	CONSTRAINT `departments_table_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `employee_department_table` (
	`employee_id` int NOT NULL,
	`department_id` int NOT NULL,
	CONSTRAINT `employee_department_table_department_id_employee_id_pk` PRIMARY KEY(`department_id`,`employee_id`)
);
--> statement-breakpoint
CREATE TABLE `employees_table` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`first_name` varchar(25) NOT NULL,
	`last_name` varchar(25) NOT NULL,
	`hire_date` datetime NOT NULL,
	CONSTRAINT `employees_table_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `titles_table` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`employee_id` int NOT NULL,
	`title` varchar(50) NOT NULL,
	`creation_date` datetime NOT NULL,
	CONSTRAINT `titles_table_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `employee_department_table` ADD CONSTRAINT `employee_department_table_employee_id_employees_table_id_fk` FOREIGN KEY (`employee_id`) REFERENCES `employees_table`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `employee_department_table` ADD CONSTRAINT `employee_department_table_department_id_departments_table_id_fk` FOREIGN KEY (`department_id`) REFERENCES `departments_table`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `titles_table` ADD CONSTRAINT `titles_table_employee_id_employees_table_id_fk` FOREIGN KEY (`employee_id`) REFERENCES `employees_table`(`id`) ON DELETE no action ON UPDATE no action;