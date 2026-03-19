## How to setup a new Typescript Express Project

1.

```
npm init -y
```

2.

```
npm i -D typescript
npm i concurrently
```

3.

```
tsc --init
```

4.Add the following script in package.json

```

"scripts": {
    "build": "npx tsc",
    "watch": "npx tsc -w",
    "prestart": "npm run build",
    "start": "npx nodemon dist/index.js",
    "dev": "npx concurrently --kill-others \"npm run watch\" \"npm start\""
  },
```

Note: Make relevant config changes in tsconfig.json

5.

```
npm run dev
```

### To start redis

```
redis-cli
```
