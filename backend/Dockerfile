# Use an official Node.js runtime as the base image
FROM node:16

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the dependencies and rebuild bcrypt
RUN npm install --build-from-source

# Copy the rest of the backend code to the working directory
COPY . .

# Expose the port on which the server will run (if needed)
EXPOSE 3001

# Start the server
CMD ["npm", "start"]