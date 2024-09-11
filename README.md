<h1> <b> YelpCamp </b> </h1>
YelpCamp is a full-stack web application where users can create, review, and explore campgrounds. In order to review or create a campground, users must have an account. This project is part of Colt Steele's Web Development Bootcamp course on Udemy.

<h1> <b> Project Overview </b> </h1>
YelpCamp allows users to:
<br> 
<li> View a list of campgrounds along with their details and reviews. </li>
<li> Sign up and log in to create their own campgrounds.</li>
<li> Review campgrounds created by other users.</li>
<li> Edit or delete their own campgrounds and reviews.</li>
<h1> <b> Functionalities </b> </h1>
<li> Public Access: Anyone can browse the campgrounds and reviews without logging in. </li>
<li> Authentication: Users must create an account and log in to add, edit, or delete campgrounds and reviews. </li>
<li>  Authorization: Users can only modify or delete campgrounds and reviews that they created.</li>
<li>  Persistent Data: All campground, review, and user data is stored securely in MongoDB Atlas (deployed on AWS). </li>
  <br> 
<h1> <b>  Technologies Used </b> </h1>
<b> Frontend: </b>
<li> HTML5: Markup language for creating the structure of web pages.</li>
<li> CSS3: For styling and visual presentation of web pages.</li>
<li> Bootstrap: A responsive, mobile-first front-end framework for faster and easier web development.</li>
<li> jQuery: Simplifies JavaScript for DOM manipulation and event handling.</li>
<b> Backend: </b>
<li> Node.js: Open-source JavaScript runtime environment for executing server-side code.</li>
<li> Express.js: A minimal and flexible Node.js web application framework.</li>
<li> REST: Architectural style for structuring web services.</li>
<li> Passport.js: Authentication middleware for Node.js used to handle user authentication.</li>
<li> MongoDB: NoSQL database for storing user accounts, campgrounds, and reviews.</li>
<li> Mongoose: MongoDB object modeling tool used to interact with the database.</li>
<b> Deployment & Hosting:</b>
<li> Render: The app is deployed on Render, a cloud platform for web apps.</li>
<li> AWS: MongoDB is hosted on Amazon EC2, leveraging cloud resources for scalability and availability.</li>
<h1> <b>  Features </b> </h1>
<li> User Authentication: Secure login and signup using Passport.js. </li>
<li>User Authorization: Users can only edit or delete the campgrounds and reviews they have created.</li>
<li> Interactive Map: Integrated with Maptiler to show locations of campgrounds.</li>
<li> Image Upload: Users can upload images when creating a campground, stored via Cloudinary.</li>
<li> Flash Messages: Provides feedback to users (e.g., success or error messages).</li>
<h1> <b> What I Learned </h1> </b>
Throughout the project, I gained experience in:

<li> Full-Stack Development: Combining frontend (HTML, CSS, Bootstrap) and backend (Node.js, Express, MongoDB) technologies.</li>
<li> RESTful Routing: Structuring URLs and HTTP methods to manage resources like campgrounds and reviews.</li>
<li>Authentication & Authorization: Using Passport.js to secure user data and control access to application features.</li>
<li> Data Associations: Creating relationships between users, campgrounds, and reviews using MongoDB.</li>
<li> Deployment: Deploying a full-stack web application to the cloud (Render) and using AWS for MongoDB hosting.</li>
<br> 


