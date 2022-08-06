
import { Comment } from "./comment/Comment";

export const VideoComments = ({
    comments
}) => {
    return (
        <>
            {comments.map(x => <Comment key={x.id} {...x.snippet.topLevelComment.snippet} id={x.snippet.id} totalReplyCount={x.snippet.totalReplyCount} />)}
        </>
    );
}