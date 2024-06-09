import { memo } from 'react';
import { Link } from 'react-router-dom';
import { Skeleton } from './ui/skeleton';

const ProjectList = memo(({ projects, loading }) => {
  const skeletonArray = Array.from({ length: 6 });

  return (
    <div className="p-2 grid grid-cols-2 lg:grid-cols-3 gap-3">
      {loading
        ? skeletonArray.map((_, index) => (
            <div key={index} className="border rounded-xl">
              <Skeleton className="rounded-t-xl mt-2 w-full h-36" />
              <div className="mt-2 px-2">
                <Skeleton className="w-3/4 h-6 mb-2" />
                <Skeleton className="w-1/2 h-4" />
              </div>
              <div className="flex gap-2 mt-2 px-2">
                <Skeleton className="w-4 h-4" />
                <Skeleton className="w-24 h-4" />
              </div>
            </div>
          ))
        : projects.map((project) => (
            <div key={project._id}>
              <Link to={`/project/${project.slug}`}>
                <div className="px-2 border rounded-xl transition-all hover:scale-105 duration-100 ease-in-out">
                  <img
                    src={project.imageUrl}
                    alt={`Project Image of ${project.name}`} 
                    width={500}
                    height={150}
                    loading="lazy"
                    className="rounded-t-xl mt-2 cursor-pointer"
                  />
                  <div className="mt-2">
                    <h2 className="text-[12px] md:text-[14px] md:font-semibold">{project.name}</h2>
                    <h2 className="text-[10px] text-gray-600 md:text-[12px] mt-2">{project.author}</h2>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <h2 className="md:text-[13px] text-[8px] text-gray-500 mb-2">@alwan.balweel</h2>
                  </div>
                </div>
              </Link>
            </div>
          ))}
    </div>
  );
});

export default ProjectList;
