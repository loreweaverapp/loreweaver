import {type MySqlVarCharConfig, varchar} from "drizzle-orm/mysql-core";

export function uuidCol(
    name: string,
    config: Partial<MySqlVarCharConfig<[string, ...string[]]>>,
) {
    return varchar(name, {length: 36, ...config});
}
