FROM buildkite/puppeteer:latest

RUN apt update
RUN apt install curl -y
RUN apt install unzip -y
RUN curl https://noto-website.storage.googleapis.com/pkgs/NotoSansCJKtc-hinted.zip -o font.zip
RUN unzip font.zip
RUN mkdir -p /usr/share/fonts/opentype/noto
RUN mv *otf /usr/share/fonts/opentype/noto
RUN fc-cache -f -v

WORKDIR /usr/src/app

COPY . ./

RUN npm install

CMD npm run dev
