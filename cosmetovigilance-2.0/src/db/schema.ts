import { relations } from 'drizzle-orm';
import { integer, pgTable, serial, text, timestamp, jsonb } from 'drizzle-orm/pg-core';

export const admins = pgTable('admins', {
  id: serial('id').primaryKey(),
  uid: text('uid').notNull().unique(), // Firebase Auth UID
  email: text('email').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const responses = pgTable('responses', {
  id: serial('id').primaryKey(),
  fullName: text('full_name').notNull(),
  department: text('department').notNull(),
  studyYear: text('study_year').notNull(),
  gender: text('gender').notNull(),
  age: text('age').notNull(),
  answers: jsonb('answers').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});
