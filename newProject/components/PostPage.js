import { useEffect } from "react";

const PostPage = () => {
  useEffect(() => {
    const unsubscribe = db
      .firestore()
      .collection("posts")
      .onSnapshot((snapshot) => {
        const updatedPosts = [];
        snapshot.forEach((doc) => {
          const post = doc.data();
          post.id = doc.id;
          post.comments = [];
          updatedPosts.push(post);

          const commentsSnapshot = doc.ref
            .collection("comments")
            .onSnapshot((comments) => {
              const updatedComments = comments.docs.map((commentDoc) => ({
                id: commentDoc.id,
                ...commentDoc.data(),
              }));
              const postIndex = updatedPosts.findIndex((p) => p.id === doc.id);
              if (postIndex !== -1) {
                updatedPosts[postIndex].comments = updatedComments;
                setPosts([...updatedPosts]);
              }
            });

          return () => {
            commentsSnapshot();
          };
        });
      });

    return () => {
      unsubscribe();
    };
  }, []);

  return <></>;
};

export default PostPage;
