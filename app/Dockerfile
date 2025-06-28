# Build Stage
FROM node:20-alpine

WORKDIR /app

# Copy package files first
COPY package*.json ./

# Install dependencies
RUN npm i

# Copy application code
COPY . .

EXPOSE 3000
CMD ["npm", "start"]