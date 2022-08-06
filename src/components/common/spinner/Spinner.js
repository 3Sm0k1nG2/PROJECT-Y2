import './Spinner.css';

export const Spinner = () => {
    return (
        <div className="lds-roller" style={{maxWidth: '500px', maxHeight: '500px'}}>
            <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
        </div>
    );
}