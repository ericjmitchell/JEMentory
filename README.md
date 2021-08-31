# JEMentory

This project is for setting up an inventory system to use in my home. The repo contains both the backend api and frontend web app.

Features:
* Inventory database
* Ability to create a family and share an inventory
* Cost analysis
* Supply analysis

## Api
The api is a REST api using express and deployed to AWS Lambda using Serverless js. The database is DynamoDb using the one table pattern (https://www.alexdebrie.com/posts/dynamodb-single-table/).

## Web
The web app is built using React and Chakra UI.
