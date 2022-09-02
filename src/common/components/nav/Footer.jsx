import GitHubButton from 'react-github-btn'

import styles from "./Footer.module.css";

export default function Footer() {
  return <footer className={"bd-footer p-3 mt-5 text-center text-sm-start " + styles["sticky-footer"]} style={{
    // position: "relative",
    backgroundColor: "rgba(255,255,255,0.4)"
  }}>
    <div className="container">
      <div className="d-flex flex-column gap-2 justify-content-center align-items-center">
        <p className="mb-0">Designed and built with ❤️ by people from <a href="http://www.cs.nthu.edu.tw/~shwu/">NTHU Datalab</a></p>
        <p>Menu from <a href="https://www.camacafe.com/Menu/1">cama coffee</a> (03)571-1500</p>
        <GitHubButton href="https://github.com/Luke516/datalab-drinks-frontend" data-size="large" data-show-count="true" aria-label="Star Luke516/datalab-drinks-frontend on GitHub">Star</GitHubButton>
      </div>
    </div>
  </footer>
}