import styles from '../centurion.module.css';
import { clsx } from 'clsx';

export default function Strobe() {
  return (
    <div className={clsx('h-screen w-full top-0 left-0 absolute -z-10', styles.strobeDiv)} />
  );
}