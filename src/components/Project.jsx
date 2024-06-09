import { client } from "@/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import ProjectList from "./ProjectList";
import WelcomeBanner from "./WelcomeBanner";

const Project = ({ searchQuery }) => {
  const [projects, setProjects] = useState([]);
  const [filterProjects, setFilterProjects] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const query = `*[_type == "projectList"] | order(_createdAt desc) {
      _id,
      name,
      "slug": slug.current,
      "imageUrl": images[0].asset->url,
      description,
      tags,
      riwayatUpload,
      author
    }`;

    client.fetch(query)
      .then((data) => {
        setProjects(data);
        setFilterProjects(data); // Initialize filterProjects with all projects
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false); // Set loading to false if there's an error
      });
  }, []);

  useEffect(() => {
    applyFilters(activeFilter, searchQuery);
  }, [activeFilter, searchQuery]);

  const handleFilterProject = (item) => {
    setActiveFilter(item);
  };

  const applyFilters = (filter, query) => {
    let filteredProjects = projects;

    if (filter !== 'All') {
      filteredProjects = filteredProjects.filter((project) => project.tags.includes(filter));
    }

    if (query) {
      const lowerCaseQuery = query.toLowerCase();
      filteredProjects = filteredProjects.filter((project) => 
        project.name.toLowerCase().includes(lowerCaseQuery) ||
        project.tags.some((tag) => tag.toLowerCase().includes(lowerCaseQuery))
      );
    }

    setFilterProjects(filteredProjects);
  };

  return (
    <div className="p-3 bg-white rounded-lg">
      <WelcomeBanner/>
      <div className="flex items-center justify-between mt-4">
        <h2 className="p-3 text-[16px] md:text-[18px] font-bold text-primary">Project</h2>
        <Select onValueChange={handleFilterProject}>
          <SelectTrigger className="w-[180px] outline-none">
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All</SelectItem>
            <SelectItem value="Website">Website</SelectItem>
            <SelectItem value="Mobile">Mobile</SelectItem>
            <SelectItem value="UI/UX">UI/UX</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <ProjectList projects={filterProjects} loading={loading} />
      </div>
    </div>
  );
};

export default Project;
