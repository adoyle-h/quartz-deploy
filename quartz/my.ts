export const config: Record<string, any> = {
  pageTitle: "Title",
  pageTitleSuffix: "Title",
  baseUrl: "www.yours.com",
}

export const layout: Record<string, any> = {
  breadcrumbs: {
    rootName: "Home",
    showCurrentPage: false,
  },

  recentNotes: {},

  footer: {
    html: `<p style="font-size: 0.8rem;">Copyright</p>`,

    links: {
    },
  }
}

export const plugins: Record<string, any> = {}

export const pluginOpts: Record<string, any> = {}
