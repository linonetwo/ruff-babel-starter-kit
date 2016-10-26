# ruff-babel-starter-kit

Transform ES6+ to ruff runable code

## Usage

To install babel, connect to wifi with internet access, run:

```shell
rap install && npm install && rap layout
```

Note that ```rap layout``` is mostly for automatically download main board drivers.

Write codes in /src with index.js as an entry.

Then connect to ruff's wifi, run:

```shell
npm run deploy
```

## Notes

### Wifi

If there are any connection issue, please check out which wifi are you in first!  

### Npm packages

To install and use packages from npm, for example bluebird, you should run:  

```shell
rap install bluebird --npm
```

Only by this way can you bring this package to ruff.

### Syntax check

Ruff's rap will check all files excludes what mentioned in the .rapignore file.  
So I add /src/** to .rapignore to preventthe checking of source file. That's why you should introduce eslint to your project for static checking.  

And babel-plugin-typecheck is not supported yet, since it will use ```Symbol```.

### What's currently not supported

- babel-plugin-typecheck: need Symbol polyfill

### Size

1kb code will trans to approximately 400kb, mostly polyfill and **bluebird**.  
But this is worthwhile since you are happy writing ES6+ and using way more powerful Promise.  

But js size larger than 1M is currently not supported by ruff1.6. So if you are not using bluebird features, you can safely remove it from package.json:  

```json
{
  "ruff": {
    "boards": {
      "ruff-mbd-v1": "^4.1.4",
      "*": "*"
    },
    "dependencies": {
      "regenerator-runtime": "npm:^0.9.5",
      "bluebird": "npm:^3.4.6" // <- you can safely remove this
    },
    "devDependencies": {}
  }
}
```
