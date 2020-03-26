# ![Image 1](public/img/edb.png)

## Welcome to Eat Da Burger App! 👋

Eat Da Burger! is a fun restaurant app that lets users input the names of burgers they'd like to eat, and then the best part....devour them! (yum).

## ✨ Demo

![Eat Da Burger Demo][demo]

[demo]: https://github.com/carlabeltran/Eat-Da-Burger-/blob/master/public/img/Eat%20Da%20Burger!%20(1).gif?raw=true "Eat Da Burger!"

*****

## 🚀 Deployment

This application is delployed at [Eat Da Burger App](https://eattburgerapp.herokuapp.com/)

*****

## 📕 User Story

```
AS A user, I need to be able to order burgers.
I WANT to be able to add new burger to my order.
SO THAT I can devour them.
```

## 💼 Business Context

```
AS A resturant, I need to be able to recieve burgers orderd from my customers.
I WANT to be able to clear the burger once the customer has finished devouring the burger.
SO THAT I can prepare for the next burgers.
```

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Directory structure

MVC design pattern files and directories should look like the following structure:

```
.
├── config
│   ├── connection.js
│   └── orm.js
│ 
├── controllers
│   └── burgers_controller.js
│
├── db
│   ├── schema.sql
│   └── seeds.sql
│
├── models
│   └── burger.js
│ 
├── node_modules
│ 
├── package.json
│
├── public
│   └── assets
│       ├── css
│       │   └── burger_style.css
│       └── img
│           └── burger.png
│   
│
├── server.js
│
└── views
    ├── index.handlebars
    └── layouts
        └── main.handlebars
```

## ⬇️️ Installation

Install the dependencies and devDependencies and start the server.

### Local Environment Setup

To use Eat-Da-Burger web application application from your local environment, you must accomplish the following steps below:

**Step 1 - Clone my repo using the command line below.**
```
git clone https://github.com/carlabeltran/Eat-Da-Burger-.git
```
**Step 2 - Change directory to the cloned repo folder.**
```
cd Eat-Da-Burger-
```
**Step 3 - Install all required NPM packages.**
```
npm install
```
**Step 4 - Start the application server using the command line below**
```
node server.js
```

## ⚙️ Configuration
``````
heroku & github details

``````
## 💯 Usage

#### Request burger

Type the name of the burger in the input field at the bottom of the page and submit. Next to the submit button I have added some suggestions based of the show bobs burgers. When the user submits a burger's name, the app displays the burger on the left side of the page -- waiting to be devoured.  

#### Devour Burger

Each burger in the **Available Burgers** area has a `Devour it!` button underneath it. When the user clicks the button, the burger moves to the right side of the page, under **Eaten Burgers**.

#### Delete Burger

Each burger in the **Eaten Burgers** has a button right below it `Delete` button. When the user clicks the button, the selected burger gets deleted from the database.

-----
## 🌈 Features

* Responsive Design & User Friendly

* Menu

* Delete Button 

*****

## 💡 Tech

Full-stack MVC web app made with 

* HTML
* CSS
* Google Fonts
* MySQL
* JawsDB
* Heroku
* Animate.css

This app requires a number of programs:

* [Node.js](https://nodejs.org/en/)
* [MySQL Workbench](https://www.mysql.com/products/workbench/)
* NPM Packages: 
	* [Express](https://www.npmjs.com/package/express)
	* [Express-Handlers](https://www.npmjs.com/package/express-handlebars)
	* [Method-Override](https://www.npmjs.com/package/method-override)
	* [MySQL](https://www.npmjs.com/package/mysql)
	* [dotenv](https://www.npmjs.com/package/dotenv)

---

## 🔮 Future work

- Adding descricptions to the burgers of what they contain
- Adding animation of a burger being built when requested
- Adding animation of a burger being devoured
- Adding pricing
- Adding fries and drink to the options

---

## 🤝 Contribute

Please read [CONTRIBUTING.md](https://gist.github.com/carlabeltran) for details on our code of conduct, and the process for submitting pull requests to us.

----
## 🚨 Tests

No tests were run.

----

## ❓FAQS

#### How can I support you?

There are lot's of ways to support me! Give this repository a ⭐, tweet about it and tell your friends!

----
## 📝 License

This project is ${license} licensed.
___

## 👩🏻 Author

![Profile Picture](https://github.com/carlabeltran/Eat-Da-Burger-/blob/master/public/img/profilepic250x350.png?raw=true)

**Carla Beltran**

Full-stack Web Software Developer

> I had so much fun building and designing this application. One big challenge I faced was organizing all the moving parts, remembering where the data was being imported and understanding how the data was being requested. 

- Email: [@carlabeltran](https://github.com/carlabeltran14@icloud.com)
- Linkdin: [@carlabeltran](https://github.com/carlabeltran)

---
***Copyright © 2020 [Carla Beltran](https://github.com/carlabeltran)***
