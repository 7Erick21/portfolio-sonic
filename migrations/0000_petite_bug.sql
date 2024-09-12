CREATE TABLE `about` (
	`id` text PRIMARY KEY NOT NULL,
	`label` text,
	`description` text,
	`code` text NOT NULL,
	`createdOn` integer,
	`updatedOn` integer
);
--> statement-breakpoint
CREATE TABLE `categories` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text,
	`body` text,
	`createdOn` integer,
	`updatedOn` integer
);
--> statement-breakpoint
CREATE TABLE `categoriesToPosts` (
	`id` text NOT NULL,
	`postId` text NOT NULL,
	`categoryId` text NOT NULL,
	`createdOn` integer,
	`updatedOn` integer,
	PRIMARY KEY(`categoryId`, `postId`),
	FOREIGN KEY (`postId`) REFERENCES `posts`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`categoryId`) REFERENCES `categories`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `comments` (
	`id` text PRIMARY KEY NOT NULL,
	`body` text,
	`userId` text,
	`postId` integer,
	`tags` text,
	`createdOn` integer,
	`updatedOn` integer
);
--> statement-breakpoint
CREATE TABLE `educations` (
	`id` text PRIMARY KEY NOT NULL,
	`institution` text,
	`description` text,
	`startDate` text,
	`endDate` text,
	`code` text NOT NULL,
	`createdOn` integer,
	`updatedOn` integer
);
--> statement-breakpoint
CREATE TABLE `experiences` (
	`id` text PRIMARY KEY NOT NULL,
	`company` text,
	`description` text,
	`startDate` text,
	`endDate` text,
	`code` text NOT NULL,
	`createdOn` integer,
	`updatedOn` integer
);
--> statement-breakpoint
CREATE TABLE `languages` (
	`id` text PRIMARY KEY NOT NULL,
	`language` text,
	`code` text,
	`createdOn` integer,
	`updatedOn` integer
);
--> statement-breakpoint
CREATE TABLE `navbar` (
	`id` text PRIMARY KEY NOT NULL,
	`label` text,
	`path` text,
	`enpoits` text,
	`slug` text NOT NULL,
	`code` text NOT NULL,
	`createdOn` integer,
	`updatedOn` integer
);
--> statement-breakpoint
CREATE TABLE `personalData` (
	`id` text PRIMARY KEY NOT NULL,
	`firstName` text,
	`lastName` text,
	`profession` text,
	`email` json,
	`happyBirthday` json,
	`location` json,
	`redesSociales` text,
	`code` text NOT NULL,
	`createdOn` integer,
	`updatedOn` integer
);
--> statement-breakpoint
CREATE TABLE `posts` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text,
	`body` text,
	`userId` text,
	`image` text,
	`images` text,
	`tags` text,
	`createdOn` integer,
	`updatedOn` integer
);
--> statement-breakpoint
CREATE TABLE `recommendations` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text,
	`description` text,
	`image` text,
	`code` text NOT NULL,
	`createdOn` integer,
	`updatedOn` integer
);
--> statement-breakpoint
CREATE TABLE `technologies` (
	`id` text PRIMARY KEY NOT NULL,
	`label` text,
	`image` text,
	`code` text NOT NULL,
	`createdOn` integer,
	`updatedOn` integer
);
--> statement-breakpoint
CREATE TABLE `user_keys` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`hashed_password` text,
	`createdOn` integer,
	`updatedOn` integer,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`firstName` text,
	`lastName` text,
	`email` text,
	`password` text,
	`role` text,
	`createdOn` integer,
	`updatedOn` integer
);
--> statement-breakpoint
CREATE TABLE `user_sessions` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`active_expires` integer NOT NULL,
	`idle_expires` integer NOT NULL,
	`createdOn` integer,
	`updatedOn` integer,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `commentsUserIdIndex` ON `comments` (`userId`);--> statement-breakpoint
CREATE INDEX `commentsPostIdIndex` ON `comments` (`postId`);--> statement-breakpoint
CREATE INDEX `postUserIdIndex` ON `posts` (`userId`);