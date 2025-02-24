## Backend Setup Workflow:

1.

```bash
mkdir backend && cd $_
or
mkdir backend | cd backend
```

2.

```bash
npm init -y
```

3.

```bash
touch server.js
or
ni server.js
```

4.

```bash
echo express nodemon cors @prisma/client prisma dotenv axios qs > requirements.txt
```

5.

```bash
# Mac
cat requirements.txt | xargs npm install --save
xargs npm install --save < requirements.txt
npm install $(cat requirements.txt) --save

# Windows
Get-Content requirements.txt | ForEach-Object { npm install $_ --save }
npm install $(Get-Content requirements.txt -Raw) --save
```

6.  The following must be included in package.json (backend package.json not frontend) if using nodemon:

```json
"start": "nodemon server.js"
or
"start:dev": "nodemon server.js"
```

7.

```bash
npm run start
or
npm run start:dev
```

## DB Setup Workflow:

- Link to [installing Postgres on Mac](https://www.youtube.com/watch?v=wTqosS71Dc4).
- Link to [installing Postgres on Windows](https://www.youtube.com/watch?v=HmziePvMwkE).

Note:

- Don't install pgAdmin!
- Don't forget your password!!
- Port should be default at: 5432
- Locale should be default

1.

```bash
npx prisma init --datasource-provider postgresql
```

2. In the .env file, change the DATABASE_URL string to your Postgres configuration:

   ### For MAC Users:

   1. In your .env file:
      DATABASE_URL="postgresql://postgres:postgres@localhost:5432/[DESIRED DB NAME]

   2.

   ```bash
   npx prisma migrate dev --name initial_seeding
   ```

   You don't exactly need to call it "initial seeding", you can name it anything you want here.

   ### For WINDOWS Users:

   1. In your .env file:
      DATABASE_URL="postgresql://postgres:[YOUR PASSWORD]@localhost:5432/[DESIRED DB NAME]"

   2.

   ```bash
   npx prisma migrate dev --name initial_seeding
   ```

3. After database (in .env file) AND tables (in prisma/schema.prisma) have been created:

```bash
npx prisma studio
```

Note: whenever you create/ update/ delete a table model in schema.prisma you need to migrate AGAIN it using:

```bash
npx prisma migrate dev --name [whatever you want to name it]
```
