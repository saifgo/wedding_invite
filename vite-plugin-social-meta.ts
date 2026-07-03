import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import type { Plugin } from "vite";

interface WeddingDataRoot {
  defaultLanguage: string;
  story: { images: { src: string }[] };
  languages: Record<
    string,
    {
      couple: { hisName: string; herName: string };
      cover: {
        inviteHeading?: string;
        weddingCelebration?: string;
        joyMessage?: string;
      };
    }
  >;
}

function loadWeddingData(): WeddingDataRoot {
  const path = resolve(process.cwd(), "public/wedding-data.json");
  return JSON.parse(readFileSync(path, "utf-8")) as WeddingDataRoot;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export function socialMetaPlugin(): Plugin {
  return {
    name: "social-meta",
    transformIndexHtml(html) {
      const data = loadWeddingData();
      const lang = data.languages[data.defaultLanguage] ?? data.languages.ar;
      const siteUrl = (process.env.VITE_SITE_URL ?? "").replace(/\/$/, "");
      const imagePath = data.story.images[1]?.src ?? "/story/img_2.jpg";
      const imageUrl = siteUrl ? `${siteUrl}${imagePath}` : imagePath;

      const title =
        data.defaultLanguage === "ar"
          ? `دعوة زفاف ${lang.couple.hisName} و ${lang.couple.herName}`
          : data.defaultLanguage === "fr"
            ? `Mariage de ${lang.couple.hisName} & ${lang.couple.herName}`
            : `${lang.couple.hisName} & ${lang.couple.herName} — Wedding Invitation`;

      const description =
        lang.cover.joyMessage ??
        lang.cover.inviteHeading ??
        "You are cordially invited to our wedding celebration";

      if (!siteUrl && process.env.NODE_ENV === "production") {
        console.warn(
          "[social-meta] VITE_SITE_URL is not set. Social previews need an absolute image URL (https://your-domain.com/story/img_1.jpg).",
        );
      }

      const tags = [
        `<meta property="og:type" content="website" />`,
        `<meta property="og:site_name" content="${escapeHtml(title)}" />`,
        `<meta property="og:title" content="${escapeHtml(title)}" />`,
        `<meta property="og:description" content="${escapeHtml(description)}" />`,
        `<meta property="og:image" content="${escapeHtml(imageUrl)}" />`,
        `<meta property="og:image:secure_url" content="${escapeHtml(imageUrl)}" />`,
        `<meta property="og:image:type" content="image/jpeg" />`,
        `<meta property="og:image:alt" content="${escapeHtml(title)}" />`,
        siteUrl
          ? `<meta property="og:url" content="${escapeHtml(`${siteUrl}/`)}" />`
          : "",
        `<meta property="og:locale" content="${data.defaultLanguage === "ar" ? "ar_AR" : data.defaultLanguage === "fr" ? "fr_FR" : "en_US"}" />`,
        `<meta name="twitter:card" content="summary_large_image" />`,
        `<meta name="twitter:title" content="${escapeHtml(title)}" />`,
        `<meta name="twitter:description" content="${escapeHtml(description)}" />`,
        `<meta name="twitter:image" content="${escapeHtml(imageUrl)}" />`,
      ]
        .filter(Boolean)
        .join("\n    ");

      return html
        .replace(
          '<meta name="description" content="You are cordially invited to our wedding celebration" />',
          `<meta name="description" content="${escapeHtml(description)}" />`,
        )
        .replace(
          "<title>Wedding Invitation</title>",
          `<title>${escapeHtml(title)}</title>`,
        )
        .replace("<!-- social-meta -->", tags);
    },
  };
}
