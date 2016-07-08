FROM node:4-onbuild

# Format: MAINTAINER Name <email@addr.ess>
MAINTAINER M.Y. Name <colbyjax@zoho.com>

# For development, leave 'code' working directory. Remove for AWS
ADD . /code
WORKDIR /code

EXPOSE 4000

# To build and run...
#$ docker build -t my-nodejs-app .
#$ docker run -it --rm --name my-running-app my-nodejs-app
