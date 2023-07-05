import React from "react";
import Paper from "@mui/material/Paper";
import styles from "./SocialNetworks.module.scss";
import { SocialNetworks } from "../SocialNetworks/SocialNetworks.jsx";

export const SocialNetworksWidget = () => {
	const customCSSProp = {
		justify: "center",
		align: "center",
	};
	return (
		<Paper classes={{ root: styles.root }} elevation={1}>
			<SocialNetworks customCSSProp={customCSSProp} key="socialWidget1" id="socialWidget1"></SocialNetworks>
		</Paper>
	);
};

