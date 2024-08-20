FROM node:20.16.0

# Install Puppeteer dependencies and required libraries
RUN apt-get update && apt-get install -y \
    wget \
    unzip \
    fonts-noto-cjk \
    libnss3 \
    libxss1 \
    libasound2 \
    libatk-bridge2.0-0 \
    libgtk-3-0 \
    && rm -rf /var/lib/apt/lists/* \
    && wget https://noto-website.storage.googleapis.com/pkgs/NotoSansCJKtc-hinted.zip -O font.zip \
    && unzip font.zip \
    && mkdir -p /usr/share/fonts/opentype/noto \
    && mv *otf /usr/share/fonts/opentype/noto \
    && fc-cache -f -v

# Install Puppeteer globally
RUN npm install -g puppeteer

WORKDIR /usr/src/app

COPY . ./

RUN npm install

CMD npm run dev
