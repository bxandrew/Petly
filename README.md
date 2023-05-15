# Petly
Petly is a web application that allows users to find pets/animals in need of homes from animal shelters. Using live data pulled from PetfinderAPI to find animals currently located in shelters across the United States. Users may search for animals in need by location (zipcode), animal type, or by breed. All data used in this project belongs to PetfinderAPI.

## Tech Stack
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Axios](https://img.shields.io/badge/-Axios-671ddf?logo=axios&logoColor=black&style=for-the-badge)

### Overview

![alt text](https://github.com/bxandrew/Petly/blob/main/readmepics/landing.png)
- Get started and create an account with Petly with user information being stored in a MongoDB back-end. User information is hashed and salted using bcrypt for security purposes. Creating an account will also provide a unique id to access saved animals in the My List feature.

![alt text](https://github.com/bxandrew/Petly/blob/main/readmepics/search.png)
- Ready to rescue a pet/animal? Search for your next friend by searching via Location (Zipcode), Gender, Animal Type, or Breed. 

![alt text](https://github.com/bxandrew/Petly/blob/main/readmepics/searchresults1.png)
- Pets/Animals searched are shown in order of most recent postings to PetfinderAPI filtered by the entered search criteria. Pets/Animals are shown as individual cards and can be interacted with to show more information or to save them to your personal list. 
