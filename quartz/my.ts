export const config: Record<string, any> = {
  pageTitle: "Title",
  pageTitleSuffix: "Title",
  baseUrl: "www.yours.com",
}

export const layout: Record<string, any> = {
  breadcrumbs: {
    rootName: "主页",
    showCurrentPage: false,
  },

  footer: {
    html: `<p style="font-size: 0.8rem;">
Copyright ADoyle (<a href="mailto:adoyle.h@gmail.com" target="_blank">adoyle.h@gmail.com</a>).
All Rights Reserved. ADoyle 保留所有权力。
<br\>
转载本站文字需要注明署名和来源链接。版权归 ADoyle 所有。如有违反，虽远必诛。
</p>`,

    links: {
    },
  }
}

export const plugins: Record<string, any> = {}
