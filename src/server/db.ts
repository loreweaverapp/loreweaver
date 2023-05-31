import {connect, type Connection} from "@planetscale/database";
import {
    drizzle,
    type PlanetScaleDatabase,
} from "drizzle-orm/planetscale-serverless";
import {env} from "$/env.mjs";

const globalForDrizzle = globalThis as unknown as {
    dbConnection: Connection | undefined;
    db: PlanetScaleDatabase | undefined;
};

export const dbConnection =
    globalForDrizzle.dbConnection ??
    connect({
        url: env.DATABASE_URL,
        fetch,
    });

export const db = globalForDrizzle.db ?? drizzle(dbConnection);

if (env.NODE_ENV !== "production") {
    globalForDrizzle.dbConnection = dbConnection;
    globalForDrizzle.db = db;
}
