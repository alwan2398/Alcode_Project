import { client } from "@/client";
import { useCallback, useState } from 'react';
import { Button } from "./ui/button";

const CommentForm = ({ projectId, onCommentAdded }) => {
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleNameChange = useCallback((e) => {
    setName(e.target.value);
  }, []);

  const handleCommentChange = useCallback((e) => {
    setComment(e.target.value);
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const newComment = {
        _type: 'comment',
        name,
        comment,
        project: {
          _type: 'reference',
          _ref: projectId,
        },
        createdAt: new Date().toISOString(),
      };
      await client.create(newComment);
      setName('');
      setComment('');
      setError('');
      if (onCommentAdded) {
        onCommentAdded(newComment);
      }
    } catch (err) {
      console.error('Error creating comment:', err);
      setError('Failed to submit comment. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [name, comment, projectId, onCommentAdded]);

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div>
        <label className="text-[12px] font-bold">Nama:</label>
        <input
          type="text"
          value={name}
          onChange={handleNameChange}
          placeholder="nama kamu"
          required
          className="border p-2 w-full"
        />
      </div>
      <div className="mt-2">
        <label className="text-[12px] font-bold">Komentar:</label>
        <textarea
          value={comment}
          onChange={handleCommentChange}
          placeholder="komentar"
          required
          className="border p-2 w-full"
        />
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <div className="flex justify-center mt-2">
        <Button type="submit" className="w-full max-w-xs text-white p-2 rounded-md" disabled={loading}>
          {loading ? 'Loading...' : 'Kirim'}
        </Button>
      </div>
    </form>
  );
};

export default CommentForm;
