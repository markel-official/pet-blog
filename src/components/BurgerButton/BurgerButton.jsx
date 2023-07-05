import styles from "./BurgerButton.module.scss";

export const BurgerButton = ({onClick}) => {
	return (
		<button onClick={onClick} className={styles["burger-btn"]}>
			<span className={styles["burger-btn-line"]}></span>
			<span className={styles["burger-btn-line"]}></span>
			<span className={styles["burger-btn-line"]}></span>
		</button>
	);
};

