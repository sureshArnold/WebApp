# Build the React app using a Node image
FROM node:26 as build

# Set the working directory inside the container
WORKDIR /app

# Copy package files first to improve caching
COPY package.json package-lock.json ./

# Install frontend dependencies
RUN npm ci

# Copy the rest of the project source and build the production bundle
COPY . .
RUN npm run build

# Serve the built app with Nginx
FROM nginx:alpine

# Copy the compiled static files into the Nginx public directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose the default HTTP port
EXPOSE 80

# Start Nginx in the foreground
CMD ["nginx","-g","daemon off;"]


