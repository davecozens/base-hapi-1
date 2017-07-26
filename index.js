'use strict'
const Path = require('path')
const Hapi = require('hapi')
const Vision = require('vision')
const ejs = require('ejs')
const Config = require('./config')

// Create a server with a host and port
const server = new Hapi.Server()
server.connection({
  host: Config.server.host,
  port: Config.server.port
})

server.register([require('hapi-locals'), require('inert'), require('vision')], (err) => {
  if (err) {
    throw err
  }

  server.views({
    engines: { ejs: ejs },
    relativeTo: __dirname,
    path: 'views'
  })

  server.route({
    method: 'GET',
    path: '/public/{param*}',
    handler: {
      directory: {
        path: 'public/',
        listing: true

      }
    }
  })

  server.route({ method: 'GET', path: '/', handler: rootHandler })
})

const rootHandler = function (request, reply) {
  /* key variables required for layout:
  govukTemplateAssetPath

  */

  // var pageData={};
  console.log(server.methods.locals)
//  var pageData = server.methods.locals;

  // pageData.partial=partial;

  var formatPageTitle = function (pageTitle) {
  	var title = 'GOV.UK'
  	if (typeof pageTitle !== 'undefined') {
  		title = pageTitle + ' - ' + title
  	}
  	return title
  }

  var pageData = {}
  // govuk_template vars
  pageData.assetPath = '/'
  pageData.bodyClasses = ''
  pageData.formatPageTitle = formatPageTitle
  pageData.govukRoot = 'https://gov.uk'
  pageData.govukTemplateAssetPath = '/public/govuk_template/'
  pageData.headerClass = ''
  pageData.htmlLang = 'en'

  pageData.body = 'some text'
  pageData.journeyDescription = 'You are here...'

  pageData.partial = function (path, data) {
    console.log(path)
    console.log(data)
    return '<p>attempted to load external content ' + path + '</p>'
  }

  console.log(pageData)

//  reply.view('layout', pageData)
  reply.view('layout', pageData)
}

// Start the server
server.start((err) => {
  if (err) {
    throw err
  }
  console.log('Server running at:', server.info.uri)
})
