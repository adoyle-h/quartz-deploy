import { PageLayout, SharedLayout } from "./quartz/cfg"
import { FileTrieNode } from "./quartz/components/Explorer.tsx"
import * as Component from "./quartz/components"
import { QuartzPluginData } from "./quartz/plugins/vfile"
import { layout } from './quartz.my'

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  beforeBody: [
    Component.Banner(),
  ],
  afterBody: [],
  footer: Component.Footer(layout.footer),
}

const breadcrumbs = Component.Breadcrumbs(layout.breadcrumbs)

const explorer = Component.Explorer({
  filterFn: (node: FileTrieNode) => {
    return node.isFolder
  },
  ...layout.explorer,
});

const recnetNotes = Component.ConditionalRender({
  component: Component.RecentNotes({
    limit: 14,
    showTags: false,
    filter: (d: QuartzPluginData) => {
      // not show contentpage index in folder
      // console.log('d=%O', d)
      return !d.slug.endsWith('/index')
    },
    ...layout.recnetNotes,
  }),
  // only show recent notes in homepage
  condition: layout.recnetNotesCondition || ((page) => page.fileData.slug === "index"),
})

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.Banner(),
    Component.ConditionalRender({
      component: breadcrumbs,
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ArticleTitle(),
    Component.ConditionalRender({
      component: Component.ContentMeta(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.TagList(),
    Component.MetaCard(),
  ],

  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Newline()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
    explorer,
  ],

  right: [
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
    // Component.Graph(),
    recnetNotes
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [
    Component.Banner(),
    breadcrumbs,
    Component.ArticleTitle(),
    Component.ConditionalRender({
      component: Component.ContentMeta(),
      condition: (page) => page.fileData.slug !== "index",
    }),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Newline()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
    explorer,
  ],
  right: [
    recnetNotes
  ],
}
