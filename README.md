# Blocks
built with node v18


## Features
- logging middleware that save actions into database
- policies based on user role
- customize register to accept user type (role)
- add custom routes to users-permissions plugin
- database migration that will create admin role and add all required permissions to it
  ( there is issue sqlite )
- complex join based on strapi v4 1-M and M-M ( product controller )
- charts query with group by ( order controller )

## Commands

- allow-access custom command to manage access control
- create-postman-requests create postman folder based on route config file
- ps-auth-routes create auth request folder in postman

## Plugins

- basic custom field plugin that render button only for certain content-type

## Utilities

- command runner
- test runner
- query utils with type support

# Future

# TESTING SETUP

package.json jest supertest and jest types and command
config/env/test/database.js
test folder ( app.test.js + helpers )

# GET Started

- yarn cmd seed/products create product with categories and variations
  use pm2 start to run the app with 3 clusters
