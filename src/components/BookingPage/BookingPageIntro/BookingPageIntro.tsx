import LayoutWrapper from "@/components/shared/LayoutWrapper";
import styles from "./BookingPageIntro.module.css";
import Img1 from "../../../../public/images/booking.jpg";
import Image from "next/image";
import SectionHeading from "@/components/shared/SectionHeading/SectionHeading";
import { SITE } from "@/config/site";

export default function BookingPageIntro() {
  return (
    <section className={styles.container}>
      <LayoutWrapper>
        <div className={styles.hero}>
          <Image
            src={Img1}
            alt={`Booking with ${SITE.name}`}
            title={`Booking with ${SITE.name}`}
            fill
            priority
            className={styles.img}
          />
          <div className={styles.overlay} />
          <div className={styles.content}>
            <SectionHeading text={SITE.name} color='cream' dot />
            <h1 className={styles.heading}>Book A ride </h1>
            {/* <p className={styles.copy}>
              Request a ride. A dispatcher will confirm and send a payment link.
            </p> */}
          </div>
        </div>
      </LayoutWrapper>
    </section>
  );
}
