<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
<!-- 
[![Contributors][contributors-shield]][contributors-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]
-->


<!-- PROJECT LOGO -->
<br />
<p text-align="center">
  

  <h3 text-align="center">CricTrack</h3>

  <p text-align="center">
   A better place to learn Cricket
    <br>
    <br />
    <br />
    <a href="https://cricket4u-website.vercel.app/">More info</a>
    
  </p>
</p>



<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <!-- <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li> -->
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

<!-- [![Product Name Screen Shot][product-screenshot]](https://example.com) -->

Cricket is a game played all around the world by everyone regardless of gender, age. Though anyone can play cricket; all of them are not getting proper guidance. There are lot of people with passion towards cricket  but  due to financial issues and unavailability of coaches in rural areas they cannot afford proper cricket coaching. 
The proposed system  will help the players to improve their cricketing skills in both batting and bowling. In terms of batting our system will classify various types of batting shots, accuracy of a shot, comparison between two players. In terms of bowling our system will identify the bowls length and wicket taking ability. In addition to that the users will be able to find statistics based on their performance.
By using  this system young cricketers will be able to overcome their barriers such as lack of trainers, poor infrastructure in coaching classes and financial issues. Proposed system will reduce the cost incurred for their cricket practices. 
Our main goal is to combine technology with cricket to provide a platform where young emerging cricketers will be able to improve the skills.


### Built With

* [React Native](https://reactnative.dev/)
* [Python](https://www.python.org/)
* [FastAPI](https://fastapi.tiangolo.com/)
* [Tensorflow](https://www.tensorflow.org/)
* [Yolo](https://pjreddie.com/darknet/yolo/)
* [AWS](https://aws.amazon.com/?nc2=h_lg)
* [MySQL](https://www.mysql.com/)
* [Mediapipe](https://google.github.io/mediapipe/)



<!-- GETTING STARTED -->
## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* npm
  ```sh
  npm install npm@latest -g
  ```
* [Vs Code](https://code.visualstudio.com/)

### Installation

1. Clone the repo
   ```sh
   git clone http://gitlab.sliit.lk/2021-172/2021-172
   ```
2. Install NPM packages
   ```sh
   npm install
   ```




<!-- USAGE EXAMPLES -->
## Usage

* Client Side 


```
 1. cd client
 ```
 
 ```
 2. npm install
 ```
 
 ```
 3. npm start
```

 * Server side


```
 1. cd backend_
 ```
 
 ```
 2. create .env file
 ```
 with the following details
 ```
        SECRET_KEY=secret
        DEBUG=True
        DB_CONNECTION=mysql+pymysql://127.0.0.1/db
        HOST=127.0.0.1
        PORT=3306
        USER_NAME=root
        PASSWORD=root
        DB=cricket4u
```
start the server with
```
->  uvicorn src.main:app --reload
```


