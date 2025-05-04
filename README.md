# quartz deploy

Build markdown files via [quartz](https://github.com/jackyzha0/quartz) and deploy to cloudflare page.

## Features

- Use container and volumes to extend quartz.
- Provide default [config](#config) and [layout](#quartzquartzlayoutts).
- Layout for my demand:
  - Hide breadcrumbs and content metas at homepage.
  - Show recent notes only at homepage.
  - Remove GraphView
  - Explorer only list folders by default.
  - Sort documents by created datetime.
  - Remove CustomOgImages to speed up build time.
- Modified quartz components
  - ContentMeta: Show created time, updated time, word count, reading time.
  - Head: Support frontmatter `robots: none` to forbidden SEO robots for folders and documents. Defaults to `robot: noimageindex`.
  - Date: Using format YYYY-MM-DD.
- New components
  - Metacard: list frontmatters into table.
  - Banner: Support frontmatter `banner: url` to add banner to page.
  - Newline: wrap line in mobile view.
- Modified quartz plugins
  - ContentIndex
      - auto create robots.txt file based on frontmatter `robot: none`.
      - sitemap.xml do not include files under folder whose frontmatter is `robot: none`.
- New plugins
  - improved-image
      - Support reszing image with width and hight.
      - Support image caption.
- Change styles.
  - Change fontsize, line-heights, colors.
  - Set my fav.icon.

Demo: https://talks.adoyle.me/

## Requirements

- `docker` and `docker compose`
- [wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/)

## Install

```sh
git clone https://github.com/adoyle-h/quartz-deploy.git
ln -s "$(realpath ./quartz-deploy/quartz-deploy)" /usr/local/bin/
```

### Build Image

User should build image once before using [Build](#build) and [Serve](#serve) commands.

`quartz-deploy build-image`

For Chinese users, should use proxy: `APT_MIRROR=mirrors.ustc.edu.cn GITHUB_PROXY=https://ghfast.top/ quartz-deploy build-image`

Notice: the last "/" is required for `GITHUB_PROXY`.

## Config

1. Create `wrangler.toml` file in your project root.
2. Create `.quartz/my.ts` file in your project root.

### wrangler.toml

It is required. The "wrangler.toml" file used by wrangler command for cloudflare page.

```toml
name = "cloudflare-page-name"
pages_build_output_dir = "./.public"  # do not change this line
compatibility_date = "2025-04-21"     # set your current date
```

### .quartz/my.ts

It is required. The ".quartz/my.ts" file is used by quartz-deploy for quick configuration.

```typescript
export const config: Record<string, any> = {
  pageTitle: "website title",
  baseUrl: "www.your.com",
}

export const layout: Record<string, any> = {
  breadcrumbs: {
    showCurrentPage: false,
  },

  footer: {
    html: `<p>Copyright</p>`,
    links: {},
  }
}

export const plugins: Record<string, any> = {}
```

See [./quartz/my.ts](./quartz/my.ts) for example.

### .quartz/quartz.config.ts

It is optional. If you create the file, it will override the [default config provided by quartz-deploy](./quartz/config.ts).

The content of file refer to official quartz.config.ts.

### .quartz/quartz.layout.ts

It is optional. If you create the file, it will override the [default layout provided by quartz-deploy](./quartz/layout.ts).

The content of file refer to official quartz.layout.ts.

## Usage

`quartz-deploy help`

### Serve

`quartz-deploy serve <path>` and visit `http://localhost:8080`.

Set `PORT` to change listening port: `PORT=80 quartz-deploy serve`

Notice: The public directory not mount to host. Its path is `/root/quartz/public` in container.

### Build

`quartz-deploy build <path>`

### Deploy

User should install [wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/) before using [quartz-deploy deploy](#deploy).

If [wrangler.toml](https://developers.cloudflare.com/workers/wrangler/configuration/) existed on your project root, just use `quartz-deploy deploy`.

Otherwise, use `quartz-deploy deploy <path>`.

## Suggestion, Bug Reporting, Contributing

**Before opening new Issue/Discussion/PR and posting any comments**, please read [Contributing Guidelines](https://gcg.adoyle.me/CONTRIBUTING).

## Copyright and License

Copyright 2025 ADoyle (adoyle.h@gmail.com) All Rights Reserved.
The project is licensed under the **Apache License Version 2.0**.

See the [LICENSE][] file for the specific language governing permissions and limitations under the License.

See the [NOTICE][] file distributed with this work for additional information regarding copyright ownership.


<!-- links -->

[LICENSE]: ./LICENSE
[NOTICE]: ./NOTICE
