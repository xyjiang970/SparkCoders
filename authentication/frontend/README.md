## Frontend Setup Workflow:

1.

```bash
npm create vite@latest
```

- Name project: frontend
- Language: Choose React w/ JavaScript

2.

```bash
echo react-router-dom axios @mui/material @emotion/react @emotion/styled @mui/icons-material qs > requirements.txt
```

3.

```bash
# Mac
cat requirements.txt | xargs npm install --save
xargs npm install --save < requirements.txt
npm install $(cat requirements.txt) --save

# Windows
Get-Content requirements.txt | ForEach-Object { npm install $_ --save }
npm install $(Get-Content requirements.txt -Raw) --save
```
