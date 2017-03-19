# serverless-gulp
A simple wrapper around **[serverless 1.x](https://serverless.com)** that simplifies the creation of gulp tasks. If you like having all your automation tasks for local and CI in one place eg running unit, acceptance and smoke tests, environment or config specific stuff, and deployment of lambdas, etc and love the simplicity that gulp brings, then this module may help you.
Some examples of using gulp with serverless spawn a process with options as arguments to serverless. The approach used by this module uses **serverless framework** as a node module and provides options to it via your gulpfile.

To get started, npm install this module as a dev dependency:

```javascript
npm install --save-dev serverless-gulp
```

This module has a dependency on the following modules:

* serverless 1.x
* gulp
* gulp-util for logging

Once installed, unless you need other gulp task modules, you should not really need any other dev dependencies. Copy the gulpfile below to get started and keep developing your services as you would.
To get started, use the code below as your initial *gulpfile.js*. The idea of this module is to keep things simple, so regardless of how the *serverless framework* evolves, this module will allow you to specify any command and and options within a gulp task as you would on the command line.

```javascript
const gulp = require('gulp');
const serverlessGulp = require('serverless-gulp');
const util = require('gulp-util');

const paths = {
  serverless: ['./**/serverless.yml', '!node_modules/**/serverless.yml']
};

gulp.task('deploy', () => {
  gulp.src(paths.serverless, { read: false })
      .pipe(serverlessGulp.exec('deploy', { stage: 'dev' }));
});

gulp.task('remove', () => {
  gulp.src(paths.serverless, { read: false })
    .pipe(serverlessGulp.exec('remove', { stage: 'dev' }));
});
```

The first argument to serverless-gulp is the command you would pass to *serverless framework*, eg *deploy*, *invoke*, etc; the second takes options for the command. So, for the following command line:

```bash
serverless invoke --function someFunction --stage en --region eu-west-2
```

your gulp task would look something like:

```javascript
gulp.task('invoke', () => {
  gulp.src(paths.serverless, { read: false })
    .pipe(serverlessGulp('invoke', { function: 'someFunction', stage: 'en', region: 'eu-west-1' }));
});
```

## Installing serverless modules
If you are writing your serverless services in nodejs, then you have to install node modules for each service. You can provide a post install hook in your main npm package to install packages for every service as follows:

Include the following gulp task in your gulpfile.js:

```javascript
gulp.task('setup', () => {
  gulp.src(paths.serverless)
      .pipe(serverlessGulp.install());
})
```

Include the following post install step in the package.json

```json
{
  "scripts": {
    "postinstall": "gulp setup"
  }
}
```

## Example project

For a working example, or as a quick start project, fork/copy the repo at https://github.com/rhythminme/serverless-gulp-example
