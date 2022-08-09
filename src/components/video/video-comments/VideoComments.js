import styles from './VideoComments.module.css'

import { Comment } from "./comment/Comment";

export const VideoComments = ({
    comments
}) => {
    console.log(comments);
    return (
        <div className={styles.comments}>
            {comments.map(x =>
                <Comment
                    key={x.id}
                    {...x.snippet.topLevelComment.snippet}
                    id={x.snippet.id}
                    totalReplyCount={x.snippet.totalReplyCount}
                    authorChannelId={x.snippet.topLevelComment.snippet.authorChannelId.value}
                />
            )}
        </div>
    );
}