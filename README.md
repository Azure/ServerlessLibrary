# Azure Serverless Community Library
An open source set of common use cases for Azure Functions & LogicApps that are ready to deploy!


## How-to Contribute to the Serverless Library

1) Build something cool! 

2) Put it in a public repository. Here are a couple great examples: [Function Example](https://github.com/jefking/fl-image-resize) or [LogicApp Example](https://github.com/Azure/azure-quickstart-templates/tree/master/101-logic-app-create)

2) Create an ARM template for your application (this is acually pretty simple.) This [ARM template generator](https://armbuilder.z5.web.core.windows.net/) quickly creates one for Azure Functions,  and Logic Apps code is contained in ARM templates, so build the Logic App in the Azure portal & commit the generated template to your Git repo. Note: This requirement is not applicable to Linux-based applications e.g. Python

3) Finally, [create an issue](https://github.com/Azure/FunctionLibrary/issues/new) in this repo containing the relevant details (template provided).

4) Wait for approval. When we close the issue, we'll merge your sample!


## Generic Deployment

If you find a Git repo with a Function or Logic App in it, you can use this to quickly deploy to Azure: [AzureDeploy.Any.json](https://github.com/jefking/FunctionLibrary/blob/master/azuredeploy.any.json)

If you want to create an ARM template that deploys Functions or LogicApps: 
[Build Your Own](https://armbuilder.z5.web.core.windows.net/)
