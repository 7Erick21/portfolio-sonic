import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';
import { auditSchema } from './audit';
import { ApiConfig } from '../routes';
import { isAdminOrUser } from '../config-helpers';
import * as about from './about';
import * as navbar from './navbar';
import * as recommendations from './recommendations';
import * as experiences from './experiences';
import * as socialNetworks from './socialNetworks';
import * as educations from './educations';
import * as groupTechnologies from './groupTechnologies';

export const tableName = 'languages';

export const route = 'languages';

export const definition = {
  id: text('id').primaryKey(),
  language: text('language'),
  code: text('code')
};

export const table = sqliteTable(tableName, {
  ...definition,
  ...auditSchema
});

export const relation = relations(table, ({ many }) => ({
  educations: many(educations.table),
  about: many(about.table),
  navbar: many(navbar.table),
  experiences: many(experiences.table),
  recommendations: many(recommendations.table),
  groupTechnologies: many(groupTechnologies.table),
  socialNetworks: many(socialNetworks.table)
}));

export const access: ApiConfig['access'] = {
  operation: {
    read: true,
    create: true,
    update: isAdminOrUser,
    delete: isAdminOrUser
  }
};

export const hooks: ApiConfig['hooks'] = {};

export const fields: ApiConfig['fields'] = {};
