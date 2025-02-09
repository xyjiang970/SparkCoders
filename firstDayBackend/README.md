Must be included if using nodemon!
"start:development": "nodemon server.js" 

Put the above inside "scripts" in package.json.
To use run "npm run [name you used for nodemon server.js - in this case "start:development"]" like so:
```bash
npm run start:development
```
