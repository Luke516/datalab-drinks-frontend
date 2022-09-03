<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="https://datalab-drinks.vercel.app/images/drink.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">DataLab Drinks</h3>

  <p align="center">
    Drink ordering system built for <a href="http://www.cs.nthu.edu.tw/~shwu/">NTHU Datalab</a> members 
    <br />
    <br />
    <a href="https://datalab-drinks.vercel.app/" target="_blank"><strong>Go to website »</strong></a>
    <br />
    <br />
    <a href="https://github.com/Luke516/datalab-drinks-frontend/issues">Report Bug</a>
    ·
    <a href="https://github.com/Luke516/datalab-drinks-frontend/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-this-project">About This Project</a>
      <ul>
        <li><a href="#important-changes-to-v2">Important Changes to V2</a></li>
        <li><a href="#built-with">Built With</a></li>
        <li><a href="#mobile">Mobile Version</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#run-locally">Run Locally</a></li>
      </ul>
    </li>
    <li><a href="#deployment">Deployment</a></li>
    <li><a href="#architecture">Architecture</a>
        <!-- <ul>
        <li><a href="#frontend">Frontend</a></li>
        <li><a href="#backend">Backend</a></li>
      </ul> -->
    </li>
    <li><a href="#api">API</a></li>
    <li><a href="#update">Update (DataLab members)</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#change-log">Change Log</a></li>
    <!-- <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li> -->
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

## About This Project

Drink ordering system built for [NTHU Datalab](http://www.cs.nthu.edu.tw/~shwu/) members.

### Important Changes to V2

Previously in V1, this project is for frontend only, and the backend of this project has [another repository](https://github.com/pin-yu/datalab-drinks-backend). However, after author of the backend project graduated, the backend project is not further maintained, so this project has updated from a frontend-only react app to a **full-stack Next.js application** and take care of both frontend and backend needs.

### Built With
* [![Next][Next.js]][Next-url]
* [![React][React.js]][React-url]
* [![Bootstrap][Bootstrap.com]][Bootstrap-url]
* [![Firebase][Firebase.com]][Firebase-url]

### Mobile Version

Mobile version is also available

* [[Download]](https://appho.st/d/aGWkrqX8)  
* [[Repository]](https://github.com/Daviswww/DataBear)

## Getting Started

### Prerequisites

* Have one of Node.js package managers (yarn, npm, etc) installed

### Installation

```bash
yarn
# or
# npm install
```

### Run Locally
```bash
yarn dev
```

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Architecture

**¯\\_(ツ)_/¯**

## API

Current API format follows previous backend project.

[Documentation](https://github.com/pin-yu/datalab-drinks-backend#api-information)

## Update

Quick update guide if any of the members needs to update some informations

* Update meeting time
  * Update ORDER_CLOSE_DAY_OF_WEEK and ORDER_CLOSE_HOUR in `src/modules/backend/utils.js`
* Update drinks menu
  * Update `src/modules/backend/assets/cama_menu.yaml`

## Roadmap

* Robot.txt
* Analytics
* Autocompletion
* History orders
* Internalization
* Login with Google
* Database security
* Typescript

## Change Log

**¯\\_(ツ)_/¯**

## Acknowledgements

* This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

* The readme follow [Best-README-Template](https://github.com/othneildrew/Best-README-Template)

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/github_username/repo_name.svg?style=for-the-badge
[contributors-url]: https://github.com/github_username/repo_name/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/github_username/repo_name.svg?style=for-the-badge
[forks-url]: https://github.com/github_username/repo_name/network/members
[stars-shield]: https://img.shields.io/github/stars/github_username/repo_name.svg?style=for-the-badge
[stars-url]: https://github.com/github_username/repo_name/stargazers
[issues-shield]: https://img.shields.io/github/issues/github_username/repo_name.svg?style=for-the-badge
[issues-url]: https://github.com/github_username/repo_name/issues
[license-shield]: https://img.shields.io/github/license/github_username/repo_name.svg?style=for-the-badge
[license-url]: https://github.com/github_username/repo_name/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[product-screenshot]: images/screenshot.png

[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[Firebase.com]: https://img.shields.io/badge/Firebase-2C384A?style=for-the-badge&logo=firebase&logoColor=ffca28
[Firebase-url]: https://firebase.google.com