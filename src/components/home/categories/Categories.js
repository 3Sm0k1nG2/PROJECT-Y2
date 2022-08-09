import { useEffect, useState } from "react";
import { Arrow } from "../../common/arrows/Arrow";

import styles from './Categories.module.css';

import { Category } from "./category/Category";

const maxShownCategories = 11;

export const Categories = ({
    categoryOnClickHandler,
    categories
}) => {
    const [lastIndex, setLastIndex] = useState(maxShownCategories);
    const [shownCategories, setShownCategories] = useState(categories.slice(0, lastIndex) || []);

    const prevPage = () => {
        setLastIndex(state => state - 1 >= maxShownCategories ? state - 1 : state);
    }

    useEffect(() => {
        setShownCategories(() => categories.slice(lastIndex - maxShownCategories, lastIndex));
    }, [categories, lastIndex])

    const nextPage = () => {
        setLastIndex(state => state + 1 <= categories.length ? state + 1 : state);

    }

    return (
        <div className={styles.categories}>
            {lastIndex > maxShownCategories &&
                <Arrow arrowOnClickHandler={prevPage} />
            }

            {shownCategories.map(x =>
                <Category
                    key={x.id}
                    id={x.id}
                    title={x.snippet.title}
                    categoryOnClickHandler={categoryOnClickHandler}
                />
            )}

            {lastIndex < categories.length &&
                <Arrow arrowOnClickHandler={nextPage} className="rotate-180" />
            }
        </div>
    );
}