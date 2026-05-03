import tailwindcss from '@tailwindcss/vite';
import fs from 'node:fs';
import path from 'node:path';
import { defineConfig, loadEnv } from 'vite';

/** Writes robots.txt and sitemap.xml into the build output for crawlers. */
function seoStaticFiles(siteUrl: string) {
    const origin = siteUrl.replace(/\/$/, '');
    let outDir = '';

    return {
        name: 'seo-static-files',
        apply: 'build' as const,
        configResolved(config: { root: string; build: { outDir: string } }) {
            outDir = path.resolve(config.root, config.build.outDir);
        },
        closeBundle() {
            const robots = [
                'User-agent: *',
                'Allow: /',
                '',
                `Sitemap: ${origin}/sitemap.xml`,
                '',
            ].join('\n');
            fs.writeFileSync(path.join(outDir, 'robots.txt'), robots, 'utf8');

            const lastmod = new Date().toISOString().slice(0, 10);
            const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${origin}/</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`;
            fs.writeFileSync(path.join(outDir, 'sitemap.xml'), sitemap, 'utf8');
        },
    };
}

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    const siteUrl =
        env.VITE_SITE_URL?.trim() ||
        (mode === 'development' ? 'http://localhost:5173' : 'https://dashty94.github.io/mui-rhf-library');

    return {
        // Relative URLs so CSS/JS load under subdirectory hosts (e.g. GitHub Pages project sites).
        base: './',
        plugins: [tailwindcss(), seoStaticFiles(siteUrl)],
    };
});
