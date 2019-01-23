# Waldo 

## Project Team
### Lena Eivy, Caity Heath & Fletcher LaRue
---
### Project Description 
Wouldn't it be nice to be able to host a site without needing to build, maintain, or house a server? This project provides users with a server so that they can focus on the experience of their clients. Waldo is known in the industry as a cloud or serverless system. Our team of three built this technology as a way of learning about serverless systems. After all the best way to learn about something is to build it! 

---
## Running Waldo

#### 1. Authentication
The first step is to sign-up  by making an account with waldo. To do so enter the following command.<br><br>
`http post :3000/signup username='username' password='password'`

<br>

#### 2. Authorization
Once you've created an account you are assigned permissions to visit pages that consumers are not. You will have the ability to deploy functions to our database. You may also read your deployed functions. To sign in enter the following command. <br><br>
`http post :3000/signin -a 'username':'password'`

#### 3. Deploy a function
You must be signed in to deploy a function. Once