import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { usePrevious } from "./hooks/usePrevious";
import { useToggle } from "./hooks/useToggle";

interface Project {
  id: string;
  name: string;
  priority: "High" | "Medium" | "Low";
  progress: number;
  status: "In Progress" | "Review" | "Completed";
}

const MOCK_PROJECTS: Project[] = [
  {
    id: "1",
    name: "Mobile App Redesign",
    priority: "High",
    progress: 72,
    status: "In Progress",
  },
  {
    id: "2",
    name: "Brand Launch Campaign",
    priority: "Medium",
    progress: 48,
    status: "Review",
  },
  {
    id: "3",
    name: "Client Portal Upgrade",
    priority: "Low",
    progress: 90,
    status: "Completed",
  },
];

export function ProjectList() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { value: isDetailsOpen, toggle: toggleDetails } = useToggle(false);

  useEffect(() => {
    async function loadProjects() {
      try {
        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 500));
        setProjects(MOCK_PROJECTS);
      } catch {
        setError("Failed to load projects.");
      } finally {
        setIsLoading(false);
      }
    }

    loadProjects();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      inputRef.current?.focus();
    }
  }, [isLoading]);

  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(event.target.value);
  };

  if (isLoading) {
    return <p className="text-gray-500">Loading project dashboard...</p>;
  }

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <label className="flex flex-col gap-2 text-sm font-medium text-gray-700" htmlFor="project-search">
          Search projects
          <input
            id="project-search"
            ref={inputRef}
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Find a project"
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none ring-0"
          />
        </label>
      </div>

      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Active Projects</h2>
        <button
          type="button"
          onClick={toggleDetails}
          className="rounded-full bg-indigo-600 px-3 py-1 text-sm font-medium text-white shadow-sm"
        >
          {isDetailsOpen ? "Hide details" : "Show details"}
        </button>
      </div>

      <div className="rounded-xl border border-dashed border-indigo-200 bg-indigo-50 p-3 text-sm text-indigo-700">
        Click a project card, then use the button above to reveal one compact detail summary.
      </div>

      {filteredProjects.length === 0 ? (
        <p className="rounded-xl border border-dashed border-gray-300 p-4 text-sm text-gray-600">
          No matching projects found.
        </p>
      ) : (
        filteredProjects.map((project) => (
          <div
            key={project.id}
            className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
          >
            <div className="flex flex-col gap-2">
              <div className="min-w-0">
                <h3 className="font-semibold">{project.name}</h3>
              </div>
              <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800 whitespace-nowrap w-fit">
                {project.status}
              </span>
            </div>

            <div className="mt-3 flex items-center justify-between gap-3 text-sm text-gray-600">
              <span className="rounded-full bg-gray-100 px-2 py-1">Priority: {project.priority}</span>
              <span className="whitespace-nowrap">Next review in 2 days</span>
            </div>

            {isDetailsOpen ? (
              <div className="mt-3 rounded-lg border border-indigo-200 bg-indigo-50 p-3 text-sm text-indigo-700">
                <p className="font-semibold">Detail summary</p>
                <p className="mt-1">{project.name}</p>
                <p className="mt-1">Status: {project.status}</p>
                <p>Progress: {project.progress}%</p>
              </div>
            ) : null}
          </div>
        ))
      )}
    </div>
  );
}

export default function App() {
  return (
    <main className="min-h-screen bg-slate-100 p-6 text-slate-800">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-2 text-3xl font-bold">Creative Studio Dashboard</h1>
        <p className="mb-6 text-gray-600">
          A simple overview of the current projects, progress, and priorities.
        </p>
        <ProjectList />
      </div>
    </main>
  );
}