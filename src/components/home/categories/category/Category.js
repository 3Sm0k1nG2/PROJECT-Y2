export const Category = ({
    id,
    title,
    categoryOnClickHandler
}) => {
    return (
        <button onClick={() => categoryOnClickHandler(id)}>{title}</button>
    );
}