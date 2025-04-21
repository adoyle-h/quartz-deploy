# quartz deploy

Build markdown files via [quartz](https://github.com/jackyzha0/quartz) and deploy to cloudflare page.

The tool only work for my demands. You should fork the project for building your websites.

It needs docker and docker compose.

## Features

- Use container and volumes to extend quartz
- Image support width and hight
- Image support caption
- Date use format YYYY-MM-DD
- Remove Graph View
- Change styles
- Provide default config and layout
- Changed fav.icon
- Add meta for SEO
- Support frontmatter `robots: none` to forbidden SEO robots for folders and documents.

## Install

```sh
git clone https://github.com/adoyle-h/quartz-deploy.git
ln -s "$(realpath ./quartz-deploy/quartz-deploy)" /usr/local/bin/
```

User should install [wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/) before using [quartz-deploy deploy](#deploy).

### Build Image

User should build image once before using [Build](#build)/[Serve](#serve) commands.

`quartz-deploy build-image`

For Chinese users, should use proxy: `APT_MIRROR=mirrors.ustc.edu.cn GITHUB_PROXY=https://ghfast.top/ quartz-deploy build-image`

Notice: the last "/" is required for `GITHUB_PROXY`.

## Usage

`quartz-deploy help`

### Serve

`quartz-deploy serve <path>` and visit `http://localhost:8080`.

Set `PORT` to change listening port: `PORT=80 quartz-deploy serve`

Notice: The public directory not mount to host. Its path is `/root/quartz/public` in container.

### Build

`quartz-deploy build <path>`

### Deploy

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
