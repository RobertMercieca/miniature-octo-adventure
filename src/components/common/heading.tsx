import styles from './heading.module.css';

type Props = {
  text: string;
};

export default function Heading({ text }: Props) {
  return <h3 className={styles['heading']}>{text}</h3>;
}
