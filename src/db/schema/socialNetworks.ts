import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';
import { auditSchema } from './audit';
import { ApiConfig } from '../routes';
import { isAdminOrUser } from '../config-helpers';
import * as languages from './languages';

export const tableName = 'socialNetworks';

export const route = 'socialNetworks';

export const definition = {
  id: text('id').primaryKey(),
  name: text('name'),
  icon: text('icon'),
  link: text('link')
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
  icon: {
    type: 'file',
    bucket: (ctx) => ctx.env.R2STORAGE,
    path: 'images'
  }
};
