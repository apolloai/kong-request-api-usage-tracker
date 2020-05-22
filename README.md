# kong-request-api-usage-tracker

![Test](https://github.com/apolloai/kong-request-api-usage-tracker/workflows/Test/badge.svg)
![CI](https://github.com/apolloai/kong-request-api-usage-tracker/workflows/CI/badge.svg)
[![codecov](https://codecov.io/gh/apolloai/kong-request-api-usage-tracker/branch/master/graph/badge.svg)](https://codecov.io/gh/apolloai/kong-request-api-usage-tracker)

KRAUT - a prometheus exporter for Kong API usage

## Development

Following scripts are available to you (in the package.json):

- `start` Starts the webserver (executes lib/index.js)
- `start:watch` Same as `start` but restarts when file changes are detected
- `build` Compliles the typescript sources to javascript
- `build:docker` Builds sources, packages them into a docker image and push it to the DockerHub repository
- `test` Runs all specs
- `test:coverage` Runs all specs and generates a coverage report
- `watch` Same as build but stays active and watches for file changes

You can run them using `yarn run [script]`

### Simulate Kong http-plugin

Run the the following: 

```
yarn run start:generator
```

By default it sends logs to `http://localhost:3000` - if you want to change the endpoint set the environment variable
```
ENDPOINT=http://kaut.url yarn run start:generator
```
