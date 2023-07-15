# App

Gympass style app.


## FRs (functional requirements)
- [x] It must be possible to register;
- [x] It must be possible to authenticate;
- [x] It must be possible to obtain the profile of a logged in user;
- [ ] It must be possible to obtain the number of check-ins performed by the logged in user;
- [x] It must be possible for the user to obtain his check-in history;
- [ ] It must be possible for the user to search for nearby gyms;
- [ ] It must be possible for the user to search for gyms by name;
- [x] It must be possible for the user to check-in at a gym;
- [ ] It must be possible to validate a user's check-in;
- [x] It must be possible to register a gym;

## BRs (business rules)
- [x] User must not be able to register with a duplicate email;
- [x] User cannot make 2 check-ins on the same day;
- [x] User cannot check-in if he is not close (100m) to the gym;
- [ ] Check-in can only be validated up to 20 minutes after creation;
- [ ] The check-in can only be validated by administrators;
- [ ] The academy can only be registered by administrators;

## NFRs (non functional requirements)
- [x] User's password must be encrypted;
- [x] The application data must be persisted in a PostgreSQL database;
- [x] All data lists must be paginated with 20 items per page;
- [ ] User must be identified by a JWT (JSON Web Token)




## others

### docker
* both work to start: 
  * create from zero: ``docker run --name rocketseat-nodejs-03-api-solid -e POSTGRESQL_USERNAME=docker -e POSTGRESQL_PASSWORD=docker -e POSTGRESQL_DATABASE=apisolid -p 5432:5432 bitnami/postgresql:latest``
  * use file [docker-compose.yml](docker-compose.yml) ``docker compose up -d`` or stop: `docker compose stop`

### prisma
* use to create db ``npx prisma migrate dev``. 
* The class use files: [schema.prisma](prisma%2Fschema.prisma)
* show db: ``npx prisma studio``
