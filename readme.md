# Zodiac project

## Tech stack:
as mentioned node, express, moongoose, mondgodb

Steps to start project:
1. git clone 
```https://github.com/Poorvanshi-sahu/zodiac.git ```

2. Download dependencies
```npm i```

3. create .env file 
```.env```

4. Fields to mention in env file
```
PORT=4000
MONGO_URI= atlas cluster url
JWT_SECRET= your own secret
```

5. command to start project
```
npm start
```

## Tools used: 
```
Chatgpt: sign(zodiac) based on DOB is picked from chatgpt as per western culture
```

## Brief

### Design Decisions
```
1. Used Mongoose for schema modeling and easy MongoDB operations.

2. Stored history per user per date to avoid duplicates.

3. Applied rate-limiting per API to prevent API abuse.

4. Zodiac calculated automatically from birthdate at signup.
```

### Improvements with More Time

``` 
1. Add personalized horoscopes per user instead of static zodiac messages.

2. Implement Redis-backed rate-limiting for better performance in a multi-server setup.

3. Add Swagger/OpenAPI documentation for endpoints.
```

### Scaling for Personalized Horoscopes

```
1. Store user-specific horoscope data separately in DB.

2. Pre-generate horoscopes daily for each user to avoid runtime computation.

3. Use caching (Redis or in-memory) to serve frequently requested horoscopes quickly.

4. Implement horizontal scaling: multiple server instances behind a load balancer.
```