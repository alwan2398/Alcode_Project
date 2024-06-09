import { client } from "@/client";
import { useEffect, useState } from 'react';

const Comments = ({ projectId }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      const query = `*[_type == "comment" && project._ref == $projectId] | order(_createdAt desc) {
        _id,
        name,
        comment,
        _createdAt
      }`;
      const params = { projectId };
      const fetchedComments = await client.fetch(query, params);
      setComments(fetchedComments);
    };

    fetchComments();
  }, [projectId]);

  return (
    <div className="mt-4 rounded-lg">
      <h2 className="text-[14px] font-semibold mb-2">Komentar</h2>
      {comments.map((comment) => (
        <div key={comment._id} className="border-b rounded-lg border-gray-500 mb-2 pb-2">
          <h3 className="text-[14px] font-semibold">{comment.name}</h3>
          <p className="text-[14px]">{comment.comment}</p>
          <small>{new Date(comment._createdAt).toLocaleString()}</small>
        </div>
      ))}
    </div>
  );
};

export default Comments;
