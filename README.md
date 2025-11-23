# PRIS Client



### Introduction



PRIS is a pull request inspection system for Azure DevOps. Users can configure custom code review systems for repositories using their own LLMs and contexts. This repository contains the code for the PRIS client application.



### Running PRIS



#### Instructions



These instructions assume that you are standing up PRIS using your own organization's Entra ID App Registration. For more information about app registrations, please read the [quickstart guide](https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app).



##### Prerequisites



The following list includes the requirements for starting the PRIS client application:



1. A Microsoft Account
2. Access to Azure Portal
3. A Microsoft Entra ID App Registration
4. [node v25](https://nodejs.org/en/download/archive/v25.2.1)
5. An instance of the [pris-web-api](https://github.com/tbsdvl/pris-web-api)



##### Cloning the Repository



You may clone the repository on GitHub [here](https://github.com/tbsdvl/pris-web.git).



##### Setup



###### Generating SSL Certificates



After cloning the repository onto your machine you will need to add a certificate and a key.



It is easy to generate certificates for local development using [mkcert](https://mkcert.org/). You will need to create a key and cert file and put them into the `cert` directory.
You must upload the certificate in your app registration's [Certificates \& Secrets](https://learn.microsoft.com/en-us/entra/identity-platform/how-to-add-credentials?tabs=certificate) in order to avoid SSL handshake errors when the application sends requests.



###### Environment Variables



After creating the certificate and key, create a .env file within the `client-app` directory and configure the following environment variables. Some variables are prefixed with `VITE` so that the client application can read these values at runtime.



```

MODE=development
VITE_API_BASE_URL=https://localhost:<PRIS-WEB-API-PORT>/
VITE_BASE_URL=https://localhost:<PRIS-CLIENT-PORT>/
TIMEOUT=30000 // default is 30000
VITE_AZURE_CLIENT_ID=<YOUR-APP-REGISTRATION-CLIENT-ID>
CERT_FILE=<CERT-FILE-NAME>
KEY_FILE=<KEY-FILE-NAME>
HOST=localhost
PORT= <PRIS-CLIENT-PORT>
SCOPES=Users.Read // default is Users.Read for fetching lists of repositories, branches, pull requests, etc. from Azure DevOps
VITE_API_SCOPE=<YOUR-APP-REGISTRATION-DEFAULT-API-PERMISSIONS-SCOPE> // learn more about adding api permissions [here](https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-configure-app-access-web-apis)
```



###### Installing Packages



Open a terminal in the `client-app` directory and run `npm i`. This will install all of the dependencies to run the PRIS client.



###### Running the Application



After completing the setup and installing the dependencies, open a terminal in the `client-app` directory and run `npm run dev`. Navigate to the URL PRIS runs on in your browser. You will see the Microsoft login page if setup is successful.



