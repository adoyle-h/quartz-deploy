# quartz deploy

Build markdown files via quartz and deploy to cloudflare page.

The tool only work for my demands. You should fork the project for building your websites.

It needs docker and docker compose.

## Install

```sh
git clone 
ln -s "$(realpath ./quartz-deploy/quartz-deploy)" /usr/local/bin/
```

## Usage

`quartz-deploy help`

### For Chinese Users

`APT_MIRROR=mirrors.ustc.edu.cn GITHUB_PROXY=https://ghfast.top/ quartz-deploy build`

Notice: the last "/" is required for `GITHUB_PROXY`.

### Serve

`quartz-deploy serve <path>` and visit `http://localhost:8080`.

Set `PORT` to change listening port: `PORT=80 quartz-deploy serve`

Notice: The public directory not mount to host. Its path is `/root/quartz/public` in container.

### Build

`quartz-deploy build <path>`

### Deploy

`quartz-deploy deploy <path>`

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
