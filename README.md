
## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

# BY - Rabbi76
- Github   :: https://github.com/Rabbi76
- LinkedIn :: https://www.linkedin.com/in/rabbi76/
- Website  :: https://rabbi76.com/
- Email    :: fazlarabbi76@gmail.com
- Phone    :: +88-01932-321881


## All List

- Use Nest (NestJS) framework for building efficient, scalable Node.js server-side applications
- Swagger API Enable
- TypeORM Use & Supported 
- Mysql Database use
- Need to set the .env to database config
- Authentication & Authorization Apply
- Role Support
- Test Case written Unit Test & E2E
- Rate limit Use
- Employee Tree Listing 

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```


##  Problem Statement:
- Develop an API that returns all the Employee Information (hierarchy by position) under any given position in the organogram.
- Call another API (Can be another endpoint of your current api) with JWT token authorization.

###  Solve

Create Employee Entity with help of @Tree('closure-table') of typeorm. Use Parent self join. To get child data use TreeRepository.findDescendantsTree. It is scale such a way so that it can handle thousands of users. For more support we can use different technic 
- Auto Scaling
- Query Optimization
- Multi Primary Replication
- Partitioning

###  Deployment  
For auto deployment we can use [GitHub Actions](https://docs.github.com/en/actions/automating-builds-and-tests/building-and-testing-nodejs) / Code pipeline / jenkins 
