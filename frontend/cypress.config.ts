import { defineConfig } from "cypress";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

export default defineConfig({
    e2e: {
        setupNodeEvents(on, config) {},
        baseUrl: process.env.CYPRESS_FRONTEND_URL,
        chromeWebSecurity: false,
        experimentalRunAllSpecs: true,
    },
});
