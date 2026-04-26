# 1 - Create a temporary enviroment to compile our app
# Acquire minmal version of our app
FROM node:22-alpine AS builder
# Create and cd into this dir
WORKDIR /app
# Copy our config files first
COPY package*.json ./
# Install required modules - do this to avoid reinstall of whole modeule folder if 
# config folder not get updated
RUN npm install
# copy everything from our project to our temporary dir
COPY . .
# Create a compiled version of our app
RUN npm run build 

# 2 - Create an nginx minmal build
FROM nginx:alpine
# remove the default files in nginx
RUN rm -rf /usr/share/nginx/html/*
# copy our compiled frontned into the nginx instance
COPY --from=builder /app/dist /usr/share/nginx/html
# also copy our nginx.conf to the project folder 
COPY default.conf.template /etc/nginx/templates/default.conf.template
# expose that port 80
EXPOSE 80
# required to run nginx
CMD ["nginx", "-g", "daemon off;"]