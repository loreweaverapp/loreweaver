import {httpBatchLink, loggerLink} from "@trpc/client";
import {createTRPCNext} from "@trpc/next";
import {type AppRouter} from "$/server/api/root";
import {getUrl, transformer} from "./shared";

export const api = createTRPCNext<AppRouter>({
    config() {
        return {
            transformer,
            links: [
                loggerLink({
                    enabled: (op) =>
                        process.env.NODE_ENV === "development" ||
                        (op.direction === "down" && op.result instanceof Error),
                }),
                httpBatchLink({
                    url: getUrl(),
                    headers() {
                        return {
                            "x-trpc-source": "client",
                        };
                    },
                }),
            ],
        };
    },
    ssr: false,
});

/** Export type helpers */
export type * from "./shared";
