FROM node:18-alpine AS base

# Set working directory
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json package-lock.json* ./
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production image, copy all the files and run next
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

# Copy built assets from the build stage
COPY --from=base /app/dist ./dist
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/package.json ./package.json

# Expose port
EXPOSE 4173

# Start the application
CMD ["npm", "run", "preview"]
