# Use a lightweight Node.js runtime for the backend container
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy dependency manifest files first to improve build caching
COPY package.json package-lock.json ./

# Install backend dependencies
RUN npm ci

# Copy the rest of the backend source code
COPY . .

# Expose the application port
EXPOSE 80

# Start the backend server
CMD ["node", "server.js"]