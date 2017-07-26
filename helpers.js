var numeral = require('numeral'),
	pluralize = require('pluralize');
/**
 * View helpers (see http://expressjs.com/api.html#app.locals)
 */
var pluralise = function (word, count) {
	return pluralize(word, count, true);
};
var titleCase = function (word) {
	return word.charAt(0).toUpperCase() + word.slice(1);
};
var capitalise = function (word) {
	return word.toUpperCase();
};
var formatMoney = function (num) {
	if (num % 1 === 0) {
		return num;
	} else {
		return numeral(num).format('0,0.00');
	}
};
var smartPayParams = function (smartPayResponse) { //changed to SP
	return smartPayResponse.parameters();
};
var documentCount = function (params) {
	return (parseInt(params['dc'], 10) || 0);
};
var registrationCount = function (params) {
	return (parseInt(params['rc'], 10) || 0);
};
var registrationsAndCertificates = function (params) {
	var phrases = [],
		regCount = registrationCount(params),
		docCount = documentCount(params);
	if (regCount > 0) {
		phrases.push(pluralise('registration', regCount));
	}
	if (docCount > 0) {
		phrases.push(pluralise('certificate', docCount));
	}
	return phrases.join(' and ');
};
var formatPageTitle = function (pageTitle) {
	var title = 'GOV.UK';
	if (typeof pageTitle !== 'undefined') {
		title = pageTitle + ' - ' + title;
	}
	return title;
};
module.exports = function (app) {
	if (typeof app === 'undefined') throw new Error('Please pass an app to this module!');
	server.methods.locals.pluralise = pluralise;
	server.methods.locals.titleCase = titleCase;
	server.methods.locals.capitalise = capitalise;
	server.methods.locals.formatMoney = formatMoney;
	server.methods.locals.smartPayParams = smartPayParams; //changed to smartPayParams
	server.methods.locals.documentCount = documentCount;
	server.methods.locals.registrationCount = registrationCount;
	server.methods.locals.registrationsAndCertificates = registrationsAndCertificates;
	// govuk_template vars
	server.methods.locals.assetPath = '/';
	server.methods.locals.bodyClasses = '';
	server.methods.locals.formatPageTitle = formatPageTitle;
	server.methods.locals.govukRoot = 'https://gov.uk';
	server.methods.locals.govukTemplateAssetPath = 'govuk_template/';
	server.methods.locals.headerClass = '';
	server.methods.locals.htmlLang = 'en';
};
