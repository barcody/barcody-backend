# barcody-backend

Barcody backend

## Install required packages

In the root of your project

```bash
npm-install-all server.js -g
npm-install-all
```

Expected output should be similar to the below:

```bash
INSTALLING THE FOLLOWING MODULES:
├──  "express"
├──  "winston"
├──  "mongodb"
├──  "winston-logrotate"
├──  "config"
├──  "body-parser"
├──  "morgan"
└──  "path"
```

### install nodemon

```bash
npm i --save-dev nodemon
```

Then, go to `package.json` file, within `script` object add the below command:

```json
{
  "script": {
    "dev": "nodemon server.js"
  }
}
```

After that you can run the development environment by the below command:

```bash
npm run dev
```

## Testing

Prior pushing your feature, make sure to run the below command.

```bash
npm run lint
```

## Install mongodb on mac

install brew package manager

check brew

```bash
brew -v
```

then install xcode select tool

```bash
xcode-select --install
```

then install mongodb server

First, specify the path

```bash
brew tap mongodb/brew
brew install mongodb-community@4.4
```

then run the server

```bash
mongod --config /usr/local/etc/mongod.conf
```

for background servers you can do it by using the below command:

```bash
brew services start mongodb/brew/mongodb-community@4.4
```

Also, it's better to be added in your PATH.

> sure you need to replace the path to the one you specified.

```bash
echo 'export PATH="/usr/local/opt/mongodb-community@4.4/bin:$PATH"' >> ~/.zshrc
```

> restart your terminal to reflect the changes

Then simply just type `mongo` and you will be connected to your local mongodb.

---

if mongodb in your machine is setup, one of the below commands should be enough to run the server on background job.

```bash
brew services start mongodb
brew services start mongodb/brew/mongodb-community
brew services start mongodb/brew/mongodb-community@4.4
```

then you can access the database locally using mongosh or mongo:

````bash
mongosh monogdb://localhost:27017
mongo mongodb://localhost:27017

### logs

you can check mongodb logs using the below command:

```bash
tail -f /usr/local/var/log/mongodb/mongo.log
````
