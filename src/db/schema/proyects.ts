import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';
import { auditSchema } from './audit';
import { ApiConfig } from '../routes';
import { isAdminOrUser } from '../config-helpers';
import * as languages from './languages';

export const tableName = 'proyects';

export const route = 'proyects';

export const definition = {
  id: text('id').primaryKey(),
  title: text('title'),
  description: text('description', { mode: 'json' }).$type<string[]>(),
  technologies: text('technologies', { mode: 'json' }).$type<string[]>(),
  preview: text('preview'),
  image: text('image'),
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
  },
  technologies: {
    type: 'string[]'
  },
  image: {
    type: 'file',
    bucket: (ctx) => ctx.env.R2STORAGE,
    path: 'images'
  }
};
