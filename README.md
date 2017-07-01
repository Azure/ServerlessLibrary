# Azure Serverless: Quickly Deploy Code
An open source set of common use cases for Azure Functions & LogicApps that are ready to deploy!

To add a new item, create a pull request for [Apps.js](http://functionlibrary.azurewebsites.net/assets/data/apps.js):
- title: Title
- description: Description
- template: Deployment File
- repository: Git Repository
- addtemplate: AddTemplateUrl : For more details refer [here](https://github.com/fashaikh/GitHubReZip). Note this currently doesnt support .deployment files and needs a particular dirctory structure.
- language: Language of code expected values: chsarp, javascript, na (none)
- type: Of app that is deployed; expected values: logicapp, function

[![Deploy to Azure](http://azuredeploy.net/deploybutton.svg)](https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2Fjefking%2FFunctionLibrary%2Fmaster%2Fazuredeploy.json)

## Extraa

If you know of a Git repo, you can use this to deploy as an Azure Function [AzureDeploy.Any.json](https://github.com/jefking/FunctionLibrary/blob/master/azuredeploy.any.json)

[![Deploy One Now](http://azuredeploy.net/deploybutton.svg)](https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2Fjefking%2FFunctionLibrary%2Fmaster%2Fazuredeploy.any.json)

[Build Your Own](http://functionlibrary.azurewebsites.net/build.htm)