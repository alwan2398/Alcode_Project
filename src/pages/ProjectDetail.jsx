import { client } from "@/client";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { lazy, Suspense, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const CommentForm = lazy(() => import('@/components/CommentForm'));

const ProjectDetail = () => {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingComments, setLoadingComments] = useState(true);
  const [otherProjects, setOtherProjects] = useState([]);
  const [loadingOtherProjects, setLoadingOtherProjects] = useState(true);

  useEffect(() => {
    const query = `*[_type == "projectList" && slug.current == $slug][0]{
      _id,
      name,
      "imageUrl": images[0].asset->url,
      description,
      tags,
      riwayatUpload,
      author,
      projectLink,
      codeLink
    }`;

    client.fetch(query, { slug }).then((data) => {
      setProject(data);
      setLoading(false);
    }).catch((error) => {
      console.error('Error fetching project:', error);
      setLoading(false);
    });
  }, [slug]);

  useEffect(() => {
    if (project?._id) {
      const commentsQuery = `*[_type == "comment" && project._ref == $projectId] | order(_createdAt desc) {
        name,
        comment,
        _createdAt
      }`;

      client.fetch(commentsQuery, { projectId: project._id }).then((data) => {
        setComments(data);
        setLoadingComments(false);
      }).catch((error) => {
        console.error('Error fetching comments:', error);
        setLoadingComments(false);
      });
    }
  }, [project]);

  const handleCommentAdded = (newComment) => {
    setComments((prevComments) => [newComment, ...prevComments]);
  };

  useEffect(() => {
    const otherProjectsQuery = `*[_type == "projectList" && slug.current != $slug]{
      name,
      "imageUrl": images[0].asset->url,
      slug,
      author,
      tags
    }`;

    client.fetch(otherProjectsQuery, { slug }).then((data) => {
      setOtherProjects(data);
      setLoadingOtherProjects(false);
    }).catch((error) => {
      console.error('Error fetching other projects:', error);
      setLoadingOtherProjects(false);
    });
  }, [slug]);

  const formatTanggal = (riwayat) => {
    return `${riwayat.tanggal}/${riwayat.bulan}/${riwayat.tahun}`;
  };

  if (loading) {
    return (
      <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="col-span-2 bg-white p-3 rounded-md flex flex-col">
          <Skeleton className="w-full h-64 mb-3" />
          <Skeleton className="w-1/2 h-8 mb-3" />
          <Skeleton className="w-full h-16" />
        </div>
        <div className="p-4 bg-white rounded-md flex flex-col">
          <Skeleton className="w-full h-8 mb-3" />
          <Skeleton className="w-full h-64" />
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-3">
      <div className="col-span-1 md:col-span-2 bg-white p-3 rounded-md flex flex-col">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-[20px] font-semibold">{project.name}</h2>
            <h2 className="text-[14px] text-gray-600 mb-3">{formatTanggal(project.riwayatUpload)}</h2>
          </div>
          <Link to="/" className="hover:text-blue-800">
            <Button>Home</Button>
          </Link>
        </div>
        <img src={project.imageUrl} alt={project.name} width={1000} height={250} loading="lazy" className="rounded-sm" />
        <div className="mt-2 flex gap-3">
          <Link to={project.codeLink} target="_blank" className="flex p-1 gap-2 items-center">
            <img src="https://cdn-icons-png.flaticon.com/128/2111/2111425.png" alt="Github" className="md:w-[24px] md:h-[24px] w-[18px] h-[18px]" />
            <h2 className="text-[14px] text-gray-600 hover:text-primary">Code Link</h2>
          </Link>
          <Link to={project.projectLink} target="_blank" className="flex p-1 gap-2 items-center">
            <img src="https://cdn-icons-png.flaticon.com/128/9628/9628522.png" alt="Preview" className="md:w-[24px] md:h-[24px] w-[18px] h-[18px]" />
            <h2 className="text-[14px] text-gray-600 hover:text-primary">Project Link</h2>
          </Link>
        </div>
        <div className="mt-2">
          <p>{project.description}</p>
        </div>
        <div className="mt-4">
          <h2 className="text-[12px] space-y-2">
            {project.tags.map((tag, index) => (
              <span key={index} className="mr-2">#{tag}</span>
            ))}
          </h2>
        </div>
        <div>
          <h2 className="text-[18px] font-semibold mt-4">Komentar</h2>
          <div className="mt-4">
            {loadingComments ? (
              <Skeleton className="w-full h-24" />
            ) : (
              comments.map((comment, index) => (
                <div key={index} className="border-b border-gray-200 py-2">
                  <h3 className="text-[14px] font-semibold">{comment.name}</h3>
                  <p className="text-[14px]">{comment.comment}</p>
                  <p className="text-[12px] text-gray-500">{new Date(comment._createdAt).toLocaleString()}</p>
                </div>
              ))
            )}
          </div>
          <Suspense fallback={<Skeleton className="w-full h-24" />}>
            <CommentForm projectId={project._id} onCommentAdded={handleCommentAdded} />
          </Suspense>
        </div>
      </div>
      <div className="col-span-1 bg-white p-3 rounded-md flex flex-col">
        <h2 className="text-[18px] font-semibold mb-3">Project Lain</h2>
        {loadingOtherProjects ? (
          <Skeleton className="w-full h-64" />
        ) : (
          <div className="flex flex-col gap-3">
            {otherProjects.map((proj) => (
              <Link key={proj.slug.current} to={`/project/${proj.slug.current}`} className="flex gap-3 items-center hover:scale-105 transition-all duration-75">
                <img src={proj.imageUrl} alt={proj.name} width={50} height={50} className="rounded-md md:w-[120px] md:h-[100px]" loading="lazy" />
                <div>
                  <h2 className="text-[14px] font-semibold">{proj.name}</h2>
                  <h2 className="text-[14px]">{proj.author}</h2>
                  <div className="text-[12px] space-y-2">
                    {proj.tags.map((tag, index) => (
                      <span key={index} className="mr-2">#{tag}</span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectDetail;
