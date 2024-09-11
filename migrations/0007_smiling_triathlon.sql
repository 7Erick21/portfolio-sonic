ALTER TABLE `educations` RENAME COLUMN `name` TO `institution`;--> statement-breakpoint
ALTER TABLE `educations` RENAME COLUMN `language` TO `description`;--> statement-breakpoint
ALTER TABLE educations ADD `startDate` text;--> statement-breakpoint
ALTER TABLE educations ADD `endDate` text;