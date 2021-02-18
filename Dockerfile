FROM amazonlinux:latest

RUN curl --silent --location https://rpm.nodesource.com/setup_14.x | bash -
RUN yum install nodejs -y 
RUN wget github.com/MeghanaAnvekar/docker-sample-src
COPY . .
RUN npm install

CMD node sample.js
