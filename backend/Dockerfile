# Use an official Node.js runtime as the base image
FROM node:20

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

RUN npm update -g

# Install the dependencies and rebuild bcrypt
RUN npm install && npm install sequelize sequelize-cli dotenv 

# Copy the rest of the backend code to the working directory
COPY . .

# Add wait-for-it.sh script
COPY wait-for-it.sh .

RUN chmod +x wait-for-it.sh
# Expose the port on which the server will run (if needed)
EXPOSE 3000

# Start the server
CMD ["npx", "start"]