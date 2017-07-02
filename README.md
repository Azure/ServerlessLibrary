# Azure Serverless Library: Quickly Deploy Code
An open source set of common use cases for Azure Functions & LogicApps that are ready to deploy!

## Adding to the Serverless Library

### Function or LogicApp

### Add to the Serverless Library
To add a new item to the library, create a pull request for [Apps.js](https://github.com/jefking/FunctionLibrary/blob/master/www/assets/data/apps.js):
- title: Title of application
- description: Description of application
- template: ARM template which deploys the infrastructure & the application
- repository: URL of a publicly accessible git repository
- addtemplate: Add Template Url; for more details go [here](https://github.com/fashaikh/GitHubReZip). This currently doesn't support .deployment files & needs a particular dirctory structure.
- language: Language code is written in (ex. chsarp, javascript, na
- type: Type of application (ex. logicapp, function)

## Generic Deployment

If you find a Git repo with a Function or Logic App in it, you can use this to quickly deploy to Azure: [AzureDeploy.Any.json](https://github.com/jefking/FunctionLibrary/blob/master/azuredeploy.any.json)

If you want to create an ARM template that deploys Functions or LogicApps: 
[Build Your Own](http://functionlibrary.azurewebsites.net/build.htm)

## Enjoy a Serverless Library of your very own :-)

[![Deploy to Azure](http://azuredeploy.net/deploybutton.svg)](https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2Fjefking%2FFunctionLibrary%2Fmaster%2Fazuredeploy.json)