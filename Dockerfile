FROM amazonlinux:latest

RUN curl --silent --location https://rpm.nodesource.com/setup_14.x | bash -
RUN yum install nodejs -y 
RUN yum install -y tar.x86_64
RUN yum install -y gzip
RUN LOCATION=$(curl -s https://api.github.com/repos/meghanaanvekar/docker-sample-src/releases/latest \ 
| grep "tag_name" \
| awk '{print "https://github.com/meghanaanvekar/docker-sample-src/archive/" substr($2, 2, length($2)-3) ".tar.gz"}') \
; curl -L -o docker-sample-src.tar.gz $LOCATION
RUN tar -xf docker-sample-src.tar.gz
COPY docker-sample-src-1 .
CMD node sample.js
