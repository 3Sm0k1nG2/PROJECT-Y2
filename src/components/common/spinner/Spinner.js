import styles from './Spinner.module.css';

export const Spinner = () => {
    return (
        <div className={styles['lds-roller']} style={{maxWidth: '500px', maxHeight: '500px'}}>
            <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
        </div>
    );
}