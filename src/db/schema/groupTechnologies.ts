import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';
import { auditSchema } from './audit';
import { ApiConfig } from '../routes';
import { isAdminOrUser } from '../config-helpers';
import * as languages from './languages';

export const tableName = 'groupTechnologies';

export const route = 'groupTechnologies';

export const definition = {
  id: text('id').primaryKey(),
  name: text('name'),
  technologies: text('technologies', { mode: 'json' }).$type<string[]>()
};

export const table = sqliteTable(tableName, {
  ...definition,
  ...auditSchema
});

export const relation = relations(table, ({}) => ({}));

export const access: ApiConfig['access'] = {
  operation: {
    read: true,
    create: true,
    update: isAdminOrUser,
    delete: isAdminOrUser
  }
};

export const hooks: ApiConfig['hooks'] = {};

export const fields: ApiConfig['fields'] = {
  technologies: {
    type: 'string[]'
  }
};
