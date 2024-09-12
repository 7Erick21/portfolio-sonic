import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';
import { auditSchema } from './audit';
import { ApiConfig } from '../routes';
import { isAdminOrUser } from '../config-helpers';
import * as languages from './languages';

export const tableName = 'navbar';

export const route = 'navbar';

export const definition = {
  id: text('id').primaryKey(),
  label: text('label'),
  path: text('path'),
  enpoits: text('enpoits', { mode: 'json' }).$type<string[]>(),
  slug: text('slug').notNull(),
  code: text('code').notNull()
};

export const table = sqliteTable(tableName, {
  ...definition,
  ...auditSchema
});

export const relation = relations(table, ({ one }) => ({
  language: one(languages.table, {
    fields: [table.code],
    references: [languages.table.code]
  })
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

export const fields: ApiConfig['fields'] = {
  enpoits: {
    type: 'string[]'
  }
};
