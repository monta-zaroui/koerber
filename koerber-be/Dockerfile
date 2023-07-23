# Use the official Node.js LTS (Long Term Support) image as the base image for the backend
FROM node:lts

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) for the backend
COPY package*.json ./

# Install backend dependencies
RUN npm install

# Copy the rest of the application code for the backend
COPY . .

# Expose port 3007 for the backend server (adjust as needed)
EXPOSE 3007

# Start the backend server
CMD ["npm", "start"]
