export { default } from "next-auth/middleware";

export const config = {
    matcher: [
        "/issue/new",
        "/issue(\/[a-zA-Z0-9-]+\/edit$)"
    ]
};