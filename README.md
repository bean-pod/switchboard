# switchboard
A web service that enables peer-to-peer video streaming between senders and receivers. 

Developed as a Concordia University Capstone project.

## Team

| Name | Github Username |
|---|---|
| Felix Lapierre | [felixlapierre](https://github.com/felixlapierre) |
| Jun Loke | [arejayelle](https://github.com/arejayelle) |
| Anissa Kouki | [gdzooks](https://github.com/gdzooks) |
| Sharon Chee Yin Ho | [sharon-ho](https://github.com/sharon-ho) |
| François LaBerge | [FGRCL](https://github.com/FGRCL) |
| Joshua Butler | [MrJCipherButtles](https://github.com/MrJCipherButtles) |
| Maxim Pobudzey | [pobudzey](https://github.com/pobudzey) |
| Mohamed Hefny | [mohhef](https://github.com/mohhef) |
| Hani Sabsoob | [sebhani](https://github.com/sebhani) |


## Setting up the project

### Front-end

#### Set up
* Install Node.js
* From the project root `cd /frontend/`
* Run the command `npm install` to install dependencies

#### Running
* To run the front-end, you have two options 
    * Run the command `npm start` for a non-optimized development build 
    * Run the command `npm run build` for a production build
    
### Backend

#### Setup
* Install Java 11 SDK
    * To check that you are using the correct version:
        * In your terminal, run `java -version`
        * In IntelliJ, you can check File → Project Structure → Project SDK
        
* Install MySQL 8.0
    * Download and install MySQL Community 8.0. Make sure you install at minimum the server and MySQL Workbench.
    * Take note of your root user password. 
        * If you were not prompted for a password during installation, go to the bin folder of your MySQL installation and run the command `mysqld --initialize --console`. This should initialize the database and print a randomly-generated one-time password to the console.
    * Open MySQL workbench and connect to your database.
    * Create a new schema named `switchboard`. If you ever need to reset the contents of your database, delete this schema and re-create it. 
    
#### Running
* `./mvnw install` to install dependencies.
* `./mvnw compile` to compile the code.
* `./mvnw spring-boot:run` to run the application.

### Code styling tools

#### Backend
* Install the IntelliJ plugin for google java format. This will replace the normal Reformat Code action.
* You must import the intellij java google style XML configuration file into IntelliJ in order to handle import ordering.
    * Download the [IntelliJ Java Google Style file](https://raw.githubusercontent.com/google/styleguide/gh-pages/intellij-java-google-style.xml) and import it into File -> Settings -> Editor -> Code Style.
* Consult the [Google Java Format README](https://github.com/google/google-java-format) for more information.

#### Frontend
* How to use ESLint/Prettier
    * Execute command `npm run lint:fix` within frontend directory
    ([README](https://github.com/bean-pod/switchboard/blob/master/frontend/README.md))

## Troubleshooting

#### Frontend does not compile
Usually you need to run `npm install` in the frontend folder to fix most compilation issues.

#### Database is not online / Database connection information is incorrect
Usually this will cause an error when starting up the application indicating an error when creating a bean or service related to Jdbc. Check that your MySQL database is running, and check that the database connection information in `application.properties` is correct. If you need to override the information in `application.properties`, you should add command-line arguments to your runtime configuration.
* For example: `spring-boot:run "-Dspring-boot.run.arguments=--spring.datasource.password=password --spring.datasource.url=jdbc:mysql://localhost:3306/switchboard?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true -Dspring-boot.run.fork=false"`

#### Public key retrieval is not allowed
This error happens the first time you connect to the database. You can fix the problem by adding `useSSL=false&allowPublicKeyRetrieval=true` to the datasource URL.
* Example: `spring-boot:run "-Dspring-boot.run.arguments=--spring.datasource.url=jdbc:mysql://localhost:3306/switchboard?useSSL=false&allowPublicKeyRetrieval=true"`
