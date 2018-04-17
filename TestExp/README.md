# TestExp

This is a framework of a back-end restful api server

## Install It
```
npm install
```

## Run It
#### Run in *development* mode:

```
npm run dev
```

#### Run in *production* mode:

```
npm run compile
npm start
```

#### Run tests:

```
npm test
```

#### Deploy to the Cloud
e.g. CloudFoundry

```
cf push TestExp
```

### Try It
* Point you're browser to [http://localhost:3000](http://localhost:3000)
* Invoke the example REST endpoint `curl http://localhost:3000/api/v1/examples`
   
### Notes:
* Node.js + express + swagger + pg + backpack
* Use swagger to manage all of rest api. Swagger middleware can validate entity. (Api.yml)
* Use async/await
* Use PostgreSQL and 'pg'
