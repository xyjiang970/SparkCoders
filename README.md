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


cat requirements.txt | xargs npm install -g