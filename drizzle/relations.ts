import { relations } from "drizzle-orm/relations";
import { users, restaurants } from "./schema";

export const restaurantsRelations = relations(restaurants, ({one}) => ({
	user: one(users, {
		fields: [restaurants.managerId],
		references: [users.id]
	}),
}));

export const usersRelations = relations(users, ({many}) => ({
	restaurants: many(restaurants),
}));