# UGAT
## UGAT project for Greenhouse Gas Emissions Inventory Data Collection Tool

This is a microservices project based in 3 services each one allocated in a container:
	1- Front-end service, developed in Angular 9, inside a container named ugat-back-app
	2- Back-end service, develop in spring boot 2.2.4 and Java 8, inside a container named ugat-front-app
	3- Database service, MySQL database version 5.7, inside a container named ugat-db

To run the containers you should have docker installed in the machine, situate in the folder with the file docker-compose.yml is located, normally is in /usr/share/ugat and then run the command:
* docker-compose up -d

This will run the docker containers and create a network to comunicate between each one.

Once the containers are up and running the web site will be avialable in https://ghgcity.al (or the domain or IP of the machine in case of being in other host) 
and to login you can user the Super Admin user with the following credentials:

user:admin
password:UGAT_admin_1

The database container has a volume in order to don't lose the information when the containers are destroyed, the name of the volume is ugat-mysql-data

There is another volume for the SSL certificates under /etc/data/nginx/certs/
