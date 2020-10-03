FROM buildkite/puppeteer:latest

RUN apt-get update && apt-get install -y \
    unzip \
    && rm -rf /var/lib/apt/lists/* \
    && wget https://noto-website.storage.googleapis.com/pkgs/NotoSansCJKtc-hinted.zip -O font.zip \
    && unzip font.zip \
    && mkdir -p /usr/share/fonts/opentype/noto \
    && mv *otf /usr/share/fonts/opentype/noto \
    && fc-cache -f -v

WORKDIR /usr/src/app

COPY . ./

RUN npm install

CMD npm run dev
