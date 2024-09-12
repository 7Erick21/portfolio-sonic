import { customType, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';
import { auditSchema } from './audit';
import { ApiConfig } from '../routes';
import { isAdminOrUser } from '../config-helpers';
import * as languages from './languages';

export const tableName = 'personalData';

export const route = 'personal-data';

interface IPersonalData {
  label: string;
  value: string;
  icon: string;
}

const customPersonalDataType = customType<{
  data: IPersonalData;
  driverData: string;
}>({
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
  firstName: text('firstName'),
  lastName: text('lastName'),
  profession: text('profession'),
  email: customPersonalDataType('email'),
  happyBirthday: customPersonalDataType('happyBirthday'),
  location: customPersonalDataType('location'),
  redesSociales: text('redesSociales', { mode: 'json' }).$type<string[]>(),
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
  redesSociales: {
    type: 'string[]'
  }
};
