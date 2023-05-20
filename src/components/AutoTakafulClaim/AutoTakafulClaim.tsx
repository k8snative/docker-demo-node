// import AutoTakafulBanner2 from '../../../public/assets/AutoTakafulBanner2.png'
import ClaimTakafulSteps from "../../../public/assets/campare_steps.gif";
import styles from "./AutoTakafulClaim.module.scss";
import Image from "next/image";
import { Container } from "react-bootstrap";
import MediaQuery from "react-responsive";

const AutoTakafulClaim = () => (
  <div className={styles["wrapper"]}>
    <Container
      className={`d-flex align-items-center flex-column ${styles["container"]}`}
    >
      <p className={styles["heading"]}>
        Three Simple Steps to{" "}
        <span className={styles["headingInRed"]}>
          {" "}
          buying the right Auto Takaful plan 
        </span>
      </p>
      {/* <p className={styles['paragraph']}>Get covered with Takaful Bazaar in three easy steps!</p> */}
      <MediaQuery minWidth={430}>
     
        <div className={styles["imageContainer"]}>
        <Image src={ClaimTakafulSteps}     
        alt ="ClaimTakafulSteps"                    
        // layout="fill"
        height={550}        
        objectFit='scale-down'
     />
        </div>
      </MediaQuery>
      <MediaQuery maxWidth={430}>
        <div className={styles["mimageContainer"]}>
        <Image src={ClaimTakafulSteps}     
        alt ="ClaimTakafulSteps"                    
        // layout="fill"
        height={600}        
        objectFit='scale-down'
     />
        </div>
      </MediaQuery>
    </Container>
  </div>
);

export default AutoTakafulClaim;
