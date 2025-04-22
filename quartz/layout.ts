import { PageLayout, SharedLayout } from "./quartz/cfg"
import { FileTrieNode } from "./quartz/components/Explorer.tsx"
import * as Component from "./quartz/components"
import { QuartzPluginData } from "./quartz/plugins/vfile"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.Footer({
    html: `<p style="font-size: 0.8rem;">
Copyright ADoyle (<a href="mailto:adoyle.h@gmail.com" target="_blank">adoyle.h@gmail.com</a>).
All Rights Reserved. ADoyle 保留所有权力。
<br\>
转载本站文字需要注明署名和来源链接。版权归 ADoyle 所有。如有违反，虽远必诛。
</p>`,

    links: {
    },
  }),
}

const breadcrumbs = Component.Breadcrumbs({
  rootName: "主页",
  showCurrentPage: false,
})

const explorer = Component.Explorer({
  title: '主目录',
  filterFn: (node: FileTrieNode) => {
    return node.isFolder
  },
});

const recnetNotes = Component.ConditionalRender({
  component: Component.RecentNotes({
    limit: 10,
    showTags: false,
    filter: (d: QuartzPluginData) => {
      // not show contentpage index in folder
      // console.log('d=%O', d)
      return !d.slug.endsWith('/index')
    }
  }),
  // only show recent notes in homepage
  condition: (page) => page.fileData.slug === "index",
})

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
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
