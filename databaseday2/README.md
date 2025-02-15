# Connecting frontend w/ backend

1. 
```bash 
npm init -y
```
2. 
```bash
# dependencies to install/ have in requirements.txt to mass install
npm i express nodemon @prisma/client prisma
```
3. 
```bash
npx prisma init --datasource-provider postgresql
```
4. In the .env file, change the DATABASE_URL string to your Postgres configuration

For Mac users:
- Mine is DATABASE_URL="postgresql://postgres:postgres@localhost:5432/test_db"
- npx prisma migrate dev --name initial_seeding (you don't exactly need to call it "initial seeding", you can name it anything you want here).

For Windows users:
- You can have DATABASE_URL="postgresql://postgres:password@localhost:5432/test_db" (make sure password is in the string!)
- Open up the psql terminal (windows search for it), press enter for everything except for "password" prompt.
- Open your schema.prisma and start creating your database schema!
- npx prisma migrate dev --name initial_seeding (you don't exactly need to call it "initial seeding", you can name it anything you want here).

After database + table + schema is created:
```bash
npx prisma studio
```