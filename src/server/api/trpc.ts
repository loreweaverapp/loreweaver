/**
 * YOU PROBABLY DON'T NEED TO EDIT THIS FILE, UNLESS:
 * 1. You want to modify request context (see Part 1).
 * 2. You want to create a new middleware or type of procedure (see Part 3).
 *
 * TL;DR - This is where all the tRPC server stuff is created and plugged in. The pieces you will
 * need to use are documented accordingly near the end.
 */

import {experimental_createServerActionHandler} from "@trpc/next/app-dir/server";
import {initTRPC, TRPCError} from "@trpc/server";
import {cookies, headers} from "next/headers";
import superjson from "superjson";
import {ZodError} from "zod";
import {getAuth, signedOutAuthObject} from "@clerk/nextjs/server";
import {NextRequest} from "next/server";
import {type PrismaClient} from "@prisma/client";
import {auth} from "@clerk/nextjs";
import {prisma as globalPrisma} from "../db";
import type {AuthObject} from "@clerk/nextjs/server";
import type {RequestLike} from "@clerk/nextjs/dist/types/server/types";
import type {FetchCreateContextFnOptions} from "@trpc/server/adapters/fetch";
import type {SecretKeyOrApiKey} from "@clerk/types";

type GetAuthOpts = Partial<SecretKeyOrApiKey>;

function createAuthObject(req?: RequestLike | Request, opts?: GetAuthOpts) {
    if (req) {
        const request = req instanceof Request ? new NextRequest(req) : req;
        return getAuth(request, opts);
    }

    return signedOutAuthObject();
}

/**
 * 1. CONTEXT
 *
 * This section defines the "contexts" that are available in the backend API.
 *
 * These allow you to access things when processing a request, like the database, the session, etc.
 */

type CreateContextOptions = {
    headers: Headers;
    prisma?: PrismaClient;
    auth?: AuthObject;
};

/**
 * This helper generates the "internals" for a tRPC context. If you need to use it, you can export
 * it from here.
 *
 * Examples of things you may need it for:
 * - testing, so we don't have to mock Next.js' req/res
 * - tRPC's `createSSGHelpers`, where we don't have req/res
 *
 * @see https://create.t3.gg/en/usage/trpc#-serverapitrpcts
 */
export const createInnerTRPCContext = (opts: CreateContextOptions) => {
    return {
        headers: opts.headers,
        prisma: opts.prisma ?? globalPrisma,
        auth: opts.auth ?? createAuthObject(),
    };
};

/**
 * This is the actual context you will use in your router. It will be used to process every request
 * that goes through your tRPC endpoint.
 *
 * @see https://trpc.io/docs/context
 */
export const createTRPCContext = (opts: FetchCreateContextFnOptions) => {
    // Fetch stuff that depends on the request

    return createInnerTRPCContext({
        headers: opts.req.headers,
        prisma: globalPrisma,
        auth: createAuthObject(opts.req),
    });
};

/**
 * 2. INITIALIZATION
 *
 * This is where the tRPC API is initialized, connecting the context and transformer. We also parse
 * ZodErrors so that you get typesafety on the frontend if your procedure fails due to validation
 * errors on the backend.
 */

const t = initTRPC.context<typeof createTRPCContext>().create({
    transformer: superjson,
    errorFormatter({shape, error}) {
        return {
            ...shape,
            data: {
                ...shape.data,
                zodError:
                    error.cause instanceof ZodError
                        ? error.cause.flatten()
                        : null,
            },
        };
    },
});

/**
 * Helper to create validated server actions from trpc procedures, or build inline actions using the
 * reusable procedure builders.
 */
export const createAction = experimental_createServerActionHandler(t, {
    createContext() {
        const ctx = createInnerTRPCContext({
            headers: headers(),
            prisma: globalPrisma,
            auth: auth(),
        });
        return ctx;
    },
});

const isAuthed = t.middleware(({next, ctx}) => {
    if (!ctx.auth.userId) {
        throw new TRPCError({code: "UNAUTHORIZED"});
    }

    return next({
        ctx: {
            auth: ctx.auth,
        },
    });
});

/**
 * 3. ROUTER & PROCEDURE (THE IMPORTANT BIT)
 *
 * These are the pieces you use to build your tRPC API. You should import these a lot in the
 * "/src/server/api/routers" directory.
 */

/**
 * This is how you create new routers and sub-routers in your tRPC API.
 *
 * @see https://trpc.io/docs/router
 */
export const createTRPCRouter = t.router;

/**
 * Public (unauthenticated) procedure
 *
 * This is the base piece you use to build new queries and mutations on your tRPC API. It does not
 * guarantee that a user querying is authorized, but you can still access user session data if they
 * are logged in.
 */
export const publicProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(isAuthed);
