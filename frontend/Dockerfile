# Use an official Node.js runtime as the base image
FROM node:14 AS build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the frontend code to the working directory
COPY . .

# Build the React frontend
RUN npm run build

# Use an official Nginx image as the base image for serving the frontend
FROM nginx:stable-alpine

# Copy the built frontend files from the previous stage to the Nginx HTML directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose the port on which the frontend will be served
EXPOSE 3000

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]