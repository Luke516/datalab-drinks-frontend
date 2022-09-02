
import styles from "./Footer.module.css";

export default function Footer (){
    return <footer className={"bd-footer p-3 mt-5 text-center text-sm-start " + styles["sticky-footer"]} style={{
      // position: "relative",
      backgroundColor: "rgba(255,255,255,0.4)"
      }}>
    <div className="container">
      <ul className="bd-footer-links ps-0 mb-3">
        <li className="d-inline-block"><a href="https://github.com/jackraken/datalab-drinks-frontend">GitHub</a></li>
      </ul>
      <div className="d-flex flex-row">
        <p className="mb-0">Designed and built with all the love in the world by the <a href="http://www.cs.nthu.edu.tw/~shwu/">Datalab</a> with the help of <a href="https://www.camacafe.com/">cama coffee</a>(03)571-1500.</p>
      </div>
    </div>
  </footer>
}