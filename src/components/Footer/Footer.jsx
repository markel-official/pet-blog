import React from "react";

import Container from "@mui/material/Container";

import { SocialNetworks } from "../SocialNetworks/SocialNetworks";

import styles from "./Footer.module.scss";
import clsx from "clsx";

import insigniaLogo from "../../assets/svg/awesome-logo.svg";

export const Footer = ({ className: clsNm }) => {
	return (
		<footer className={`${styles["footer"]} ${clsNm}`}>
			<Container>
				<div className={styles["footerWrapper"]}>
					<div className={styles["left-col"]}>
						<p className={clsx(styles["logotext"], styles["footer-text"])}>
							HealthHeaven © <span>{new Date().getFullYear()}</span>
						</p>

						<SocialNetworks className={styles.footerSocials} key="socialWidget2" id="socialWidget2"></SocialNetworks>
					</div>

					<div className={styles["right-col"]}>
						{/* Like here https://www.mrmoneymustache.com/disclaimer/  */}
						<a
							href="#!"
							className={clsx(styles["privacy-policy"], styles["footer-text"])}
							rel="nofollow"
						>
							Privacy & Terms
						</a>
					</div>
				</div>
			</Container>
			<div className={styles.footerFooter}>
				<Container className={styles.bottomFooter} sx={{display: "flex"}}>
					<a
						href="https://markeloff.site/"
						className={styles.footerInsignia}
						target="_blank"
					>
						<span className={styles.footerInsigniaText}>Powered by</span>{" "}
						<img
							className={styles.footerInsigniaLogo}
							src={insigniaLogo}
							alt="Markeloff developer website logo"
						/>
					</a>
				</Container>
			</div>
		</footer>
	);
};

