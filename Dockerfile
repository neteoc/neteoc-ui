# Node.js app Docker file

FROM kerryhatcher/neteoc-baseimage:latest

RUN mkdir -p /opt/neteoc-server
WORKDIR /opt/neteoc-server

COPY ./neteoc-server /opt/neteoc-server
#RUN webpack
