import { createReadStream, copyFileSync, existsSync, mkdirSync, readdirSync, statSync } from "node:fs";
import { extname, resolve, sep } from "node:path";
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";

const selectedPublicDirs = [
  "assets/daily-low-price",
  "assets/decor",
  "assets/instant-retail",
  "assets/pinhaofan-growth",
  "assets/yearly-recap-2023",
  "fonts",
  "images",
];

const selectedPublicFiles = new Set([
  "assets/neeko-avatar.gif",
  "assets/neeko-avatar.mp4",
  "assets/written-tests/95fen-pdp-redesign.pdf",
  "assets/written-tests/douyin-gift-panel.pdf",
  "assets/written-tests/jd-health-ai.pdf",
  "assets/written-tests/tmall-ai-home.pdf",
  "emotional-before-after.webp",
  "emotional-hero.webp",
  "emotional-layers.webp",
  "emotional-screen-a.webp",
  "emotional-screen-b.webp",
  "pinhaofan-hero.webp",
  "resume.pdf",
  "screen-autumn.webp",
  "screen-christmas.webp",
  "screen-sakura.webp",
  "screen-spring.webp",
  "snow-fall.mp4",
  "strawberry-drop.mp4",
  "strawberry-mockup.webp",
  "strawberry-steps.webp",
  "winter-mockup.webp",
  "yearly-recap-hero.webp",
]);

const excludedPublicFiles = new Set([
  "assets/instant-retail/v2-brand-color-detail.webp",
  "assets/instant-retail/v2-brand-color-system.webp",
]);

const selectedCoverPattern = /^assets\/covers\/.*\.webp$/;

const mimeByExt: Record<string, string> = {
  ".css": "text/css; charset=utf-8",
  ".gif": "image/gif",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".mp4": "video/mp4",
  ".pdf": "application/pdf",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
};

function normalizePublicPath(path: string) {
  return path.replace(/^\/+/, "").replace(/\\/g, "/");
}

function isSelectedPublicPath(path: string) {
  const normalized = normalizePublicPath(path);

  if (excludedPublicFiles.has(normalized)) {
    return false;
  }

  return (
    selectedPublicFiles.has(normalized) ||
    selectedCoverPattern.test(normalized) ||
    selectedPublicDirs.some((dir) => normalized === dir || normalized.startsWith(`${dir}/`))
  );
}

function walkSelectedPublicFiles(publicDir: string) {
  const files: string[] = [];

  function walk(dir: string) {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const absolutePath = resolve(dir, entry.name);

      if (entry.isDirectory()) {
        walk(absolutePath);
        continue;
      }

      const relativePath = normalizePublicPath(absolutePath.slice(publicDir.length + 1));

      if (entry.isFile() && isSelectedPublicPath(relativePath)) {
        files.push(relativePath);
      }
    }
  }

  walk(publicDir);
  return files;
}

function selectedPublicAssets(): Plugin {
  let publicDir = "";
  let outDir = "";

  return {
    name: "selected-public-assets",
    config() {
      return {
        publicDir: false,
      };
    },
    configResolved(config) {
      publicDir = resolve(config.root, "public");
      outDir = resolve(config.root, config.build.outDir);
    },
    configureServer(server) {
      server.middlewares.use((request, response, next) => {
        if (!request.url) {
          next();
          return;
        }

        const requestPath = decodeURIComponent(request.url.split(/[?#]/)[0]);
        const relativePath = normalizePublicPath(requestPath);

        if (!isSelectedPublicPath(relativePath)) {
          next();
          return;
        }

        const filePath = resolve(publicDir, relativePath);

        if (!filePath.startsWith(`${publicDir}${sep}`) || !existsSync(filePath) || !statSync(filePath).isFile()) {
          next();
          return;
        }

        const contentType = mimeByExt[extname(filePath).toLowerCase()];
        if (contentType) {
          response.setHeader("Content-Type", contentType);
        }
        response.setHeader("Cache-Control", "no-cache");
        createReadStream(filePath).pipe(response);
      });
    },
    writeBundle() {
      if (!existsSync(publicDir)) {
        return;
      }

      for (const relativePath of walkSelectedPublicFiles(publicDir)) {
        const source = resolve(publicDir, relativePath);
        const target = resolve(outDir, relativePath);
        mkdirSync(resolve(target, ".."), { recursive: true });
        copyFileSync(source, target);
      }
    },
  };
}

export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/wuyueportfolio/' : '/',
  plugins: [react(), selectedPublicAssets()],
  assetsInclude: ['**/*.glb'],
});
