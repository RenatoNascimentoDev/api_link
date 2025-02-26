import { pgTable, unique, text, timestamp, foreignKey, pgEnum } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const userRole = pgEnum("user_role", ['manager', 'customer'])


export const users = pgTable("users", {
	id: text().primaryKey().notNull(),
	name: text().notNull(),
	email: text().notNull(),
	phone: text(),
	role: userRole().default('customer').notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	unique("users_email_unique").on(table.email),
]);

export const restaurants = pgTable("restaurants", {
	id: text().primaryKey().notNull(),
	name: text().notNull(),
	description: text(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
	managerId: text("manager_id"),
}, (table) => [
	foreignKey({
			columns: [table.managerId],
			foreignColumns: [users.id],
			name: "restaurants_manager_id_users_id_fk"
		}).onDelete("set null"),
]);
