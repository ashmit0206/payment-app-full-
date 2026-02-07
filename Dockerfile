# 1. Use Node.js 20
FROM node:20-alpine

# 2. Set working directory
WORKDIR /usr/src/app

# 3. Copy files
COPY . .

# 4. Install dependencies
RUN npm install

# 5. Generate Prisma Client
RUN cd packages/db && npx prisma generate

# 6. Build the app
RUN npx turbo build --filter=user-app

#  Fix the "Naked App" Issue ---
# We must copy the static assets (CSS/Images) to the standalone folder
RUN cp -r apps/user-app/public apps/user-app/.next/standalone/apps/user-app/public
RUN cp -r apps/user-app/.next/static apps/user-app/.next/standalone/apps/user-app/.next/static
# -----------------------------------------------

# 7. Expose Port
EXPOSE 3000

# 8. Start the app
CMD ["node", "apps/user-app/.next/standalone/apps/user-app/server.js"]