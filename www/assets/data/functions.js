[
    {
        "title": "Any Azure Function Repository",
        "template": "https://raw.githubusercontent.com/jefking/FunctionLibrary/master/azuredeploy.any.json",
        "repository": "https://github.com/jefking/FunctionLibrary",
        "description": "Deployment of Azure Function which takes a Git Repository as a parameter."
    },
    {
        "title": "Tug of War",
        "template": "https://raw.githubusercontent.com/joescars/TugOfWar-FunctionsDemo/master/azuredeploy.json",
        "repository": "https://github.com/joescars/TugOfWar-FunctionsDemo",
        "description": "This simple demo game is used to teach basic concepts around building Azure Functions with node.js."
    },
    {
        "title": "PDF Extraction for Search",
        "template": "https://raw.githubusercontent.com/m-gagne/PDF2AzSearch/master/azuredeploy.json",
        "repository": "https://github.com/m-gagne/PDF2AzSearch",
        "description": "This Azure Function binds to an Azure Storage container to process PDF files, extract metadata (using Regular Expressions), stores the result in DocumentDB (extracted text + captured metadata) which can then be used by Azure Search"
    },
    {
        "title": "HTTP: Entity to SQL",
        "template": "https://raw.githubusercontent.com/AzureBytes/functionsstorsql/master/deploy/azuredeploy.json",
        "repository": "https://github.com/AzureBytes/functionsstorsql/tree/master/src/WebToDatabase",
        "description": "Stores a queue message in SQL Database; uses Entity Framework."
    },
    {
        "title": "Blob: Image Resize",
        "template": "https://raw.githubusercontent.com/jefking/fl-image-resize/master/azuredeploy.json",
        "repository": "https://github.com/jefking/fl-image-resize/tree/master/src/ImageResize",
        "description": "The easiest way to resize images stored in Blob Storage (on Azure); uses ImageProcessor."
    },
    {
        "title": "Slack: User Change Alerts",
        "template": "https://raw.githubusercontent.com/anthonychu/slack-user-change-alerts/master/azuredeploy.portal.json",
        "repository": "https://github.com/anthonychu/slack-user-change-alerts/tree/master/src/SlackUserChangeAlerts.Function",
        "description": "An Azure Function that sends a Slackbot notification to specified users or channels when users are added or removed from Slack. Ported from https://github.com/cfe84/slack-users-change-alerts."
    },
    {
        "title": "Closed Loop for IoT Hub",
        "template": "https://raw.githubusercontent.com/khilscher/AzureFunctions/master/ClosedLoopFunction/deploy/azuredeploy.json",
        "repository": "https://github.com/khilscher/AzureFunctions",
        "description": "The Closed-Loop function binds to the Event Hub compatible name of an IoT Hub. Each message into the IoT Hub will trigger the function. The sample function reads the JSON message payload, deserializes it, adds the two integer values (DataPoint1 and DataPoint2), and sends the sum back to the device, via IoT Hub, using a C2D message.",
        "addTemplate": "https://raw.githubusercontent.com/fashaikh/AzureFunctions/master/ClosedLoopFunction/deploy/addfunction.json"
    },
    {
        "title": "Function: Static Server",
        "template": "https://raw.githubusercontent.com/anthonychu/azure-functions-static-file-server/master/azuredeploy.portal.json",
        "repository": "https://github.com/anthonychu/azure-functions-static-file-server/tree/master/src",
        "description": "Serves a static website. More details at: http://anthonychu.ca/post/azure-functions-static-file-server"
    },
    {
        "title": "Blob: Static Server",
        "template": "https://raw.githubusercontent.com/jefking/fl-default-static/master/azuredeploy.json",
        "repository": "https://github.com/jefking/fl-default-static/tree/master/src",
        "description": "Defaults page (index.htm) for containers. No need for compute on top of raw storage; if you are running static sites."
    },
    {
        "title": "Blob: Static Server with CDN",
        "template": "https://raw.githubusercontent.com/jefking/fl-default-static/master/azuredeploy.cdn.json",
        "repository": "https://github.com/jefking/fl-default-static/tree/master/src",
        "description": "Defaults page (index.htm) for containers. No need for compute on top of raw storage; if you are running static sites. This deployment contains a CDN layered 'over top' of the function."
    },
    {
        "title": "Raffle",
        "template": "https://raw.githubusercontent.com/anthonychu/azure-functions-raffle/master/azuredeploy.portal.json",
        "repository": "https://github.com/anthonychu/azure-functions-raffle/tree/master",
        "description": "A simple raffle application."
    },
    {
        "title": "Azure Function Library (this)",
        "template": "https://raw.githubusercontent.com/jefking/FunctionLibrary/master/azuredeploy.json",
        "repository": "https://github.com/jefking/FunctionLibrary",
        "description": "An open source set of common use cases for Azure Functions that are ready to deploy!"
    }
]