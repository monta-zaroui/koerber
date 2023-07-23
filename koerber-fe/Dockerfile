# Use the official Node.js LTS (Long Term Support) image as the base image for the frontend
FROM node:lts AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) for the frontend
COPY package*.json ./

# Install frontend dependencies
RUN npm install

# Copy the rest of the application code for the frontend
COPY . .

# Build the Vue app
RUN npm run build

# Use a lightweight image for serving the built Vue app
FROM nginx:alpine

# Copy the built Vue app from the previous stage to the NGINX server's public directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 8007 for the NGINX server
EXPOSE 8007
