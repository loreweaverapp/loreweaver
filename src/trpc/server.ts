// import {createTRPCProxyClient, httpBatchLink, loggerLink} from "@trpc/client";
// import {headers} from "next/headers";
// import {type AppRouter} from "$/server/api/root";
// import {getUrl, transformer} from "./shared";
//
// export const api = createTRPCProxyClient<AppRouter>({
//     transformer,
//     links: [
//         loggerLink({
//             enabled: (op) =>
//                 process.env.NODE_ENV === "development" ||
//                 (op.direction === "down" && op.result instanceof Error),
//         }),
//         httpBatchLink({
//             url: getUrl(),
//             headers() {
//                 // Forward headers from the browser to the API
//                 return {
//                     ...Object.fromEntries(headers()),
//                     "x-trpc-source": "server",
//                 };
//             },
//         }),
//     ],
// });
//
// // export const createAction =
