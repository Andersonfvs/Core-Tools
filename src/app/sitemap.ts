import { MetadataRoute } from "next";
import { ARTICLES } from "@/data/articles";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://antigravity-utilities.pages.dev";
  
  // Base utility pages
  const baseRoutes = [
    "",
    "/converter-png-para-webp",
    "/converter-jpg-para-webp",
    "/descompactar-zip-online",
    "/abrir-arquivo-rar-online",
    "/sobre",
    "/contato",
    "/politica-de-privacidade",
    "/termos-de-uso",
    "/artigos",
  ];

  const sitemapEntries: MetadataRoute.Sitemap = baseRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1.0 : route.startsWith("/artigos") ? 0.7 : 0.6,
  }));

  // Add all static article pages to index
  ARTICLES.forEach((article) => {
    sitemapEntries.push({
      url: `${baseUrl}/artigos/${article.slug}`,
      lastModified: new Date().toISOString().split("T")[0],
      changeFrequency: "monthly" as const,
      priority: 0.8, // Good SEO priority for detailed content
    });
  });

  return sitemapEntries;
}
