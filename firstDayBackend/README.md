1. 
```bash
mkdir [foldername]
```
2. 
```bash
npm init -y
```
3. 
```bash
npm i express nodemon

or

#  Mac/ Linux
cat requirements.txt | xargs npm install -g

# Windows
Get-Content requirements.txt | ForEach-Object { npm install -g $_ }
```
4. 
```bash
touch server.js

or 

ni server.js
```

Must be included if using nodemon!
```json
"start:development": "nodemon server.js" 
```

Put the above inside "scripts" in package.json.
To use run "npm run [name you used for nodemon server.js - in this case "start:development"]" like so:
```bash
npm run start:development
```
