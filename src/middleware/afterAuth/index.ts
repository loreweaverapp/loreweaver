import {type AfterAuthMiddlewareSection} from "..";
import {indexSection} from "./index.section";
import {finishSignUpSection} from "./finishSignUp.section";

export const afterAuthSections: AfterAuthMiddlewareSection[] = [
    indexSection,
    finishSignUpSection,
];
