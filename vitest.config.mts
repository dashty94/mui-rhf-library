import { defineConfig } from 'vitest/config';

export default defineConfig({
    // Inline config stops Vite from loading the repo's postcss.config.js, which tests don't need.
    css: { postcss: {} },
    test: {
        environment: 'jsdom',
        include: ['src/**/*.test.{ts,tsx}'],
        setupFiles: ['./src/test/setup.ts'],
        // MUI pickers and popovers render a lot of DOM; jsdom can be slow on CI.
        testTimeout: 15000
    }
});
