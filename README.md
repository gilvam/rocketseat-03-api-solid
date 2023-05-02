# App

Gympass style app.


## FRs (functional requirements)
- [ ] It must be possible to register;
- [ ] It must be possible to authenticate;
- [ ] It must be possible to obtain the profile of a logged in user;
- [ ] It must be possible to obtain the number of check-ins performed by the logged in user;
- [ ] It must be possible for the user to obtain his check-in history;
- [ ] It must be possible for the user to search for nearby gyms;
- [ ] It must be possible for the user to search for gyms by name;
- [ ] It must be possible for the user to check-in at a gym;
- [ ] It must be possible to validate a user's check-in;
- [ ] It must be possible to register a gym;

## BRs (business rules)
- [ ] User must not be able to register with a duplicate email;
- [ ] User cannot make 2 check-ins on the same day;
- [ ] User cannot check-in if he is not close (100m) to the gym;
- [ ] Check-in can only be validated up to 20 minutes after creation;
- [ ] The check-in can only be validated by administrators;
- [ ] The academy can only be registered by administrators;

## NFRs (non functional requirements)
- [ ] User's password must be encrypted;
- [ ] The application data must be persisted in a PostgreSQL database;
- [ ] All data lists must be paginated with 20 items per page;
- [ ] User must be identified by a JWT (JSON Web Token)




## others

### docker
``docker run --name rocketseat-nodejs-03-api-solid -e POSTGRESQL_USERNAME=docker -e POSTGRESQL_PASSWORD=docker -e POSTGRESQL_DATABASE=apisolid -p 5432:5432 bitnami/postgresql:latest``
