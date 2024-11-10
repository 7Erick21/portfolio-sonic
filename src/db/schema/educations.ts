import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';
import { auditSchema } from './audit';
import { ApiConfig } from '../routes';
import { isAdminOrUser } from '../config-helpers';
import * as languages from './languages';

export const tableName = 'educations';

export const route = 'educations';

export const definition = {
  id: text('id').primaryKey(),
  institution: text('institution'),
  description: text('description', { mode: 'json' }).$type<string[]>(),
  startDate: text('startDate'),
  endDate: text('endDate'),
  code: text('code')
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
  description: {
    type: 'string[]'
  }
};
