# CS360_Group6 ReadMe
Final group project for CS 360. A full-stack web application to get the "Slice of Pacific"

Tutorial on how to run the ‘Slice of Pacific’ website. For this same tutorial with step by step images go to this URL: https://docs.google.com/document/d/1H3bV7YUo50gxjUR5lKDV-P0QloMjgalTUN_kIuOmh5w/edit.

Follow the Express Tutorial if the MongoDB cluster and project sections do not make sense.

# Clone the repository to your local machine
    1.  Go to https://github.com/audrey1146/CS360_GroupFinal 
    2.  Clone the repository

# Make a new project and cluster for your database
    1.  Go to your MongoDB Atlas account
    2.  Go to your ‘Projects’ and click ‘+ New Project’
    3.  Give your project any name then press ‘Next’
    4.  Make sure you are the project owner and then press the button ‘Create Project’
    5.  Press the button ‘Build a Cluster’ and choose the free option
    6.  Choose Any provider then press the ‘Create Cluster’ button
    7.  Click the ‘Collections’ button
    8.  Choose the ‘Add My Own Data’ option
    9.  Fill out the ‘Create Database’ information
    10. Go back to the ‘Overview’ tab and choose ‘Connect’
          a. Choose the ‘Add Your Current IP Address’ option
          b. Create Database User
                i.  Exampe Username: 360User
                ii. Example Password:  360Pass
          c. Choose the ‘Connect your application’ option
                i. Example URL mongodb+srv://360User:360Pass@cluster0.yhpoq.mongodb.net/360Test?retryWrites=true&w=majority
          d. Press close once done

# Connect to MongoDB
    1.  Open up app.js from the cloned repository 
    2.  Replace the current ‘let mongoDB’ string with the URL from earlier

# Populate the Database
    1.  In Git Bash, traverse to the ‘groupFinal’ directory
    2.  Run ‘npm install async’
    3.  Run “node populatedb <your URL>”
          a. Make sure URL is encased in single quotes 
    4.  Check MongoDB and verify that your database now has information
    
# Run the website
    1.  Run “npm update”
    2.  Run “npm run devstart”
    3.  Follow the link to the landing page:  http://localhost:3000/ 
