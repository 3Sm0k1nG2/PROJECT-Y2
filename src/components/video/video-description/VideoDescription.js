import styles from './VideoDescription.module.css';

export const VideoDescription = ({
    description,
    channel
}) => {
    console.log('desc: ', description);
    console.log('chan: ', channel);

    return (
        <div className={styles.description}>
            <h3>Description</h3>
        </div>
    );
}