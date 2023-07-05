import styles from "./CloseButton.module.scss";
import clsx from "clsx";

function CloseButton({ className = "", onClick }) {
	return (
		<div onClick={onClick} className={clsx(styles.closeBtn, className)}>
			<span className={styles.closeBtnLine}></span>
			<span className={styles.closeBtnLine}></span>
		</div>
	);
}

export { CloseButton };

