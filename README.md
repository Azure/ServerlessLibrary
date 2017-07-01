# Azure Serverless: Quickly Deploy Code
An open source set of common use cases for Azure Functions & LogicApps that are ready to deploy!

## Adding to the Library

### Function or LogicApp

### Add to the FunctionLibrary
To add a new item to the library, create a pull request for [Apps.js](https://github.com/jefking/FunctionLibrary/blob/master/www/assets/data/apps.js):
- title: Title of application
- description: Description of application
- template: ARM template which deploys infrastructure as well as application
- repository: URL of publically accessible git repository
- addtemplate: AddTemplateUrl : For more details refer [here](https://github.com/fashaikh/GitHubReZip). Note this currently doesnt support .deployment files and needs a particular dirctory structure.
- language: Language of code expected values: chsarp, javascript, na (none)
- type: Of app that is deployed; expected values: logicapp, function

[![Deploy to Azure](http://azuredeploy.net/deploybutton.svg)](https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2Fjefking%2FFunctionLibrary%2Fmaster%2Fazuredeploy.json)

## Generic Deployment

If you know a Git repo with a Function or Logic App in it you can use this to deploy to Azure: [AzureDeploy.Any.json](https://github.com/jefking/FunctionLibrary/blob/master/azuredeploy.any.json)

If you want to create an ARM template that deploys Functions or LogicApps: 
[Build Your Own](http://functionlibrary.azurewebsites.net/build.htm)