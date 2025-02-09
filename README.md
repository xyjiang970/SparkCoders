# SparkCoders

Github Webpage Build Guide: 
```bash
npm install
npm run build
```

/dist/ folder should have been created with /assets/ folder within. 

Replace JS and CSS links inside dist/index.html using the following structure:
- "/SparkCoders/react-useState-useEffect-fetch-review/dist/assets/[filename from /assets].js"
- "/SparkCoders/react-useState-useEffect-fetch-review/dist/assets/[filename from /assets].css"

You can then view the live page (i.e. https://xyjiang970.github.io/SparkCoders/react-forms-pokemon-prj/dist/).


Using npm to mass download all requirements in txt file:
```bash
cat requirements.txt | xargs npm install -g
```

In React, we create our applications using: 
```bash
npm create vite@latest
```

In Node, we create our applications using: 
```bash
npm init -y
```

Node is our server that will serve all of our frontend requests. Next, cd into the project folder and run:
```bash
npm install express
```

To run script file:
```bash
node [filename].js
```