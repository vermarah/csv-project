## CSV Project communicating with web api's
### To run the web server, first run the command
#### ng serve --o
### This will start an Angular Live Development Server on localhost:4200

### To get the server running on backend, open a new terminal and run the following commands
#### cd database
#### npx json-server --watch db.json 
### This will initialize the db.json file with the json data

### When the table is populated with data and is ready to be exported just click Export to CSV button at the bottom and the file will be downloaded.
