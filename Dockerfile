FROM ghcr.io/puppeteer/puppeteer:23.1.0

# 切换到 root 用户
USER root

# 安装 Puppeteer 依赖项及必需的库
RUN apt-get update && apt-get install -y \
    wget \
    unzip \
    fonts-noto-cjk \
    libnss3 \
    libxss1 \
    libasound2 \
    libatk-bridge2.0-0 \
    libgtk-3-0 \
    libx11-xcb1 \
    libxcb1 \
    libxcomposite1 \
    libxcursor1 \
    libxdamage1 \
    libxi6 \
    libxtst6 \
    libnss3-dev \
    libxrandr2 \
    libgbm-dev \
    libpango1.0-0 \
    libasound2 \
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
