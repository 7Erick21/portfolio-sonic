import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';
import { auditSchema } from './audit';
import { ApiConfig } from '../routes';
import { isAdminOrUser } from '../config-helpers';
import * as languages from './languages';

export const tableName = 'technologies';

export const route = 'technologies';

export const definition = {
  id: text('id').primaryKey(),
  label: text('label'),
  image: text('image'),
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
  image: {
    type: 'file',
    bucket: (ctx) => ctx.env.R2STORAGE,
    path: 'images'
  }
};
