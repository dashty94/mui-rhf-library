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

function findViteCssLink(html: string): { tag: string; file: string } | null {
    const relFirst =
        /<link\b[^>]*\brel=["']stylesheet["'][^>]*href=["'](?:\.\/)?assets\/([^"']+\.css)["'][^>]*>/i;
    const hrefFirst =
        /<link\b[^>]*href=["'](?:\.\/)?assets\/([^"']+\.css)["'][^>]*\brel=["']stylesheet["'][^>]*>/i;

    let m = relFirst.exec(html);
    if (m) return { tag: m[0], file: m[1] };
    m = hrefFirst.exec(html);
    if (m) return { tag: m[0], file: m[1] };
    return null;
}

/**
 * Inlines the hashed Tailwind bundle into index.html and removes the empty entry script.
 * Opening dist/index.html via file:// then works (crossorigin + ES modules fail on file URLs).
 */
function inlineBuiltCssAndStripEntry() {
    let outDir = '';

    return {
        name: 'inline-built-css-strip-entry',
        apply: 'build' as const,
        enforce: 'post' as const,
        configResolved(config: { root: string; build: { outDir: string } }) {
            outDir = path.resolve(config.root, config.build.outDir);
        },
        closeBundle() {
            const htmlPath = path.join(outDir, 'index.html');
            let html = fs.readFileSync(htmlPath, 'utf8');

            const link = findViteCssLink(html);
            if (!link) return;

            const cssPath = path.join(outDir, 'assets', link.file);
            if (!fs.existsSync(cssPath)) return;

            const css = fs.readFileSync(cssPath, 'utf8');
            html = html.replace(link.tag, `<style>${css}</style>`);

            html = html.replaceAll(
                /<script\b[^>]*\bsrc=["'](?:\.\/)?assets\/[^"']+\.js["'][^>]*>\s*<\/script>\s*/gi,
                '',
            );

            fs.writeFileSync(htmlPath, html);
            fs.unlinkSync(cssPath);

            try {
                const assetsDir = path.join(outDir, 'assets');
                if (fs.existsSync(assetsDir)) {
                    for (const f of fs.readdirSync(assetsDir)) {
                        fs.unlinkSync(path.join(assetsDir, f));
                    }
                    fs.rmdirSync(assetsDir);
                }
            } catch {
                /* ignore */
            }
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
        plugins: [tailwindcss(), seoStaticFiles(siteUrl), inlineBuiltCssAndStripEntry()],
    };
});
