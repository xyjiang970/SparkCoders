1. 
```bash
mkdir [foldername]
cd [foldername]
```
In one line:
```bash
mkdir [foldername] && cd $_

or 

mkdir [foldername] | cd [foldername]
```

2. 
```bash
npm init -y

# This creates the package.json file.
```

3. 
```bash
npm i express nodemon

or
# Assuming you have requirements.txt file set up already with what to download:

#  Mac/ Linux
cat requirements.txt | xargs npm install --save
xargs npm install --save < requirements.txt
npm install $(cat requirements.txt) --save

# Windows
Get-Content requirements.txt | ForEach-Object { npm install $_ --save }
npm install $(Get-Content requirements.txt -Raw) --save

# To set up requirements.txt:
## > (Overwrite): This operator redirects the output of a command and overwrites the contents of the specified file. If the file does not exist, it will be created.
echo express nodemon cors > requirements.txt

## >> (Append): This operator redirects the output of a command and appends it to the end of the specified file. If the file does not exist, it will be created.
echo express nodemon cors >> requirements.txt
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
