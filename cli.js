#!/usr/bin/env node

const chalk = require('chalk')
const program = require('commander')
const pkg = require('./package.json')
const fs = require('fs-extra')
const execa = require('execa')

let projectName

program
  .version(pkg.version)
  .arguments('<project-name>')
  .usage(`${chalk.bgGreen.black('<project-name>')}`)
  .action(function(name) {
    projectName = name
  })
  .parse(process.argv)

const createPrismaApp = (projectName) => {
  try {
    console.log(chalk.bgYellow.black('installing...'))
    fs.copySync(`${__dirname}/template`, `${process.cwd()}/${projectName}`)
    execa
      .shell(`cd ${process.cwd()}/${projectName} && npm i`)
      .then((result) => {
        console.log(result.stdout)
        console.log(chalk.bgGreen.black('success!'))
      })
      .catch((error) => {
        console.log(chalk.bgRed.white(error))
      })
  } catch (err) {
    console.error(chalk.bgRed.white(err))
  }
}

if (/^([A-Za-z\-\_\d])+$/.test(projectName)) createPrismaApp(projectName)
else console.log(chalk.bgRed.white('invalid project name'))
