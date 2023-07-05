import React from "react";
import styles from "./styles.module.scss";
import { Grid } from "@mui/material";
import { FbIcon } from "../../SVG/FbIcon/FbIcon";
import { IgIcon } from "../../SVG/IgIcon/IgIcon";
import { PinIcon } from "../../SVG/PinIcon/PinIcon";
import { TwIcon } from "../../SVG/TwIcon/TwIcon";

const fbLink = "https://www.facebook.com/";
const igLink = "https://instagram.com/";
const pinTrstLink = "https://www.pinterest.com/";
const twitterLink = "https://twitter.com/";

function SocialNetworks({ customCSSProp = { align: "center" }, className, id }) {
	return (
		<Grid
			container
			className={className}
			justifyContent={customCSSProp?.justify}
			alignItems={customCSSProp?.align}
		>
			<p className={styles.text}>Join us:</p>
			<ul className={styles.socials}>
				{fbLink && (
					<li className={styles["social-item"]}>
						<a href={fbLink} className="social-link" rel="noreferrer" target="_blank">
							<FbIcon key={`fb-icon-${id}`}></FbIcon>
						</a>
					</li>
				)}
				{igLink && (
					<li className={styles["social-item"]} key={`ig-li-${id}`}>
						<a href={igLink} className="social-link" rel="noreferrer" target="_blank">
							<IgIcon key={`ig-icon-${id}`} id={id}></IgIcon>
						</a>
					</li>
				)}
				{pinTrstLink && (
					<li className={styles["social-item"]}>
						<a href={pinTrstLink} className="social-link" rel="noreferrer" target="_blank">
							<PinIcon key={`pin-icon-${id}`}></PinIcon>
						</a>
					</li>
				)}
				{twitterLink && (
					<li className={styles["social-item"]}>
						<a href={twitterLink} className="social-link" rel="noreferrer" target="_blank">
							<TwIcon key={`tw-icon-${id}`}></TwIcon>
						</a>
					</li>
				)}
			</ul>
		</Grid>
		// <div className={`${styles.socialsWrapper}`}>
		// </div>
	);
}

export { SocialNetworks };

