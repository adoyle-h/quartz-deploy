FROM node:23-bookworm-slim AS builder

WORKDIR /root

ARG GITHUB_PROXY
ARG APT_MIRROR

RUN <<EOF
  [ -n "${APT_MIRROR:-}" ] && sed -i "s/deb.debian.org/$APT_MIRROR/g" /etc/apt/sources.list.d/debian.sources
  apt-get update
  apt-get install -y ca-certificates unzip
EOF

ADD "${GITHUB_PROXY}https://github.com/jackyzha0/quartz/archive/refs/heads/v4.zip" ./quartz.zip

RUN unzip ./quartz.zip && rm -f ./quartz.zip
RUN cd quartz-4 && NODE_ENV=production npm i --verbose

RUN <<EOF
  cd quartz-4
  NODE_ENV=production npm i @microflash/rehype-figure
EOF

FROM node:23-bookworm-slim

WORKDIR /root/quartz

COPY --from=builder /root/quartz-4 /root/quartz

RUN npx quartz create

CMD ["npx", "quartz", "build"]

LABEL author.name="ADoyle"
LABEL author.email="adoyle.h@gmail.com"
