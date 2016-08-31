# Node.js app Docker file

FROM kerryhatcher/neteoc-baseimage:latest

RUN mkdir -p /opt/neteoc-ui
RUN mkdir -p /opt/neteoc-server
WORKDIR /opt/neteoc-ui

COPY ./package.json /opt/neteoc-ui
RUN npm install

COPY . /opt/neteoc-ui
RUN webpack
