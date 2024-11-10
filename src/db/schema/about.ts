import { index, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';
import { auditSchema } from './audit';
import { ApiConfig } from '../routes';
import { isAdminOrUser } from '../config-helpers';
import * as languages from './languages';

export const tableName = 'about';

export const route = 'about';

export const definition = {
  id: text('id').primaryKey(),
  label: text('label'),
  description: text('description', { mode: 'json' }).$type<string[]>(),
  name: text('name'),
  // email: text('email'),
  // emailLabel: text('emailLabel'),
  rol: text('rol'),
  // birthdate: text('birthdate'),
  // birthdateLabel: text('birthdateLabel'),
  // location: text('location'),
  // locationLabel: text('locationLabel'),
  googleMaps: text('googleMaps'),
  // phone: text('phone'),
  // phoneLabel: text('phoneLabel'),
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
