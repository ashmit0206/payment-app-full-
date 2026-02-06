# 1. use node.js 20

FROM node:20-alpine

# 2.  Set the working directory inside the container

WORKDIR /usr/src/app

# 3. Copy all your files into the container

COPY . .

# 4. Install dependencies

RUN npm install

# 5. Generate Prisma Client (So the DB Connects)

RUN cd packages/db && npx prisma generate

# 6. Build the specific app (user-app)

RUN npx turbo build --filter=user-app

# 7. Expose the port (Next.js default)

EXPOSE 3000

# 8. Start the app

CMD [ "npm" , "run" , "start-user-app"]