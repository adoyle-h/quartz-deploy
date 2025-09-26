import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"
import { config as conf, plugins, transformers, filters, emitters, emitterOpts } from './quartz.my'

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Title",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: false,
    analytics: {
      provider: "plausible",
    },
    locale: "zh-CN",
    baseUrl: "xxx.me",
    // https://quartz.jzhao.xyz/features/private-pages
    ignorePatterns: [".*", "wrangler.toml"],
    defaultDateType: "created",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Schibsted Grotesk",
        body: "Source Sans Pro",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#faf8f8",
          lightgray: "#e5e5e5",
          gray: "#9d9d9d",
          darkgray: "#4e4e4e",
          dark: "#2b2b2b",
          secondary: "#2b7cf3",
          tertiary: "#db7500",
          highlight: "#e6eeff",
          textHighlight: "#C7B000",
        },
        darkMode: {
          light: "#1E1E1E",
          lightgray: "#34373B",
          gray: "#565656",
          darkgray: "#b3b3b3",
          dark: "#d6d6d6",
          secondary: "#2b7cf3",
          tertiary: "#db7500",
          highlight: "#1E1E1E",
          textHighlight: "#C7B000",
        },
      },
    },
    ...conf,
  },

  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.HardLineBreaks(),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
      Plugin.ImprovedImage(),
      ...transformers,
    ],
    filters: [
      Plugin.RemoveDrafts(),
      ...filters,
    ],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
        enableRobotsTxt: true,
        rssSlug: 'rss',
        rssLimit: 20,
        robotsIndex: [],
        ...emitterOpts?.ContentIndex,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      // Plugin.CustomOgImages(),
      ...emitters,
    ],
    ...plugins,
  },
}

export default config
