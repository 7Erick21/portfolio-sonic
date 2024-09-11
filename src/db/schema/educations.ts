import { customType, index, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';
import { auditSchema } from './audit';
import { ApiConfig } from '../routes';
import { isAdminOrUser } from '../config-helpers';
import * as languages from './languages';

export const tableName = 'educations';

export const route = 'educations';

const jsonType = customType<{ data: object; driverData: string }>({
  dataType() {
    return 'json';
  },
  toDriver(value) {
    return JSON.stringify(value);
  },
  fromDriver(value) {
    return JSON.parse(value);
  }
});

export const definition = {
  id: text('id').primaryKey(),
  institution: text('institution'),
  description: text('description'),
  startDate: text('startDate'),
  endDate: text('endDate'),
  code: text('code')
    .notNull()
    .references(() => languages.table.code)
};

export const table = sqliteTable(
  tableName,
  {
    ...definition,
    ...auditSchema
  },
  (table) => {
    return {
      codeLanguage: index('educationForLanguageCode').on(table.code)
    };
  }
);

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

export const fields: ApiConfig['fields'] = {};
