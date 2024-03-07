import styles from '../spotify.module.css';

export default function Background() {
  return (
    <div className="h-screen w-full top-0 left-0 absolute -z-10">
      <div className={styles.gradient} />
    </div>
  );
}
