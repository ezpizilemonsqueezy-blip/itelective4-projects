import { useEffect, useRef, useState, type ChangeEvent } from "react";
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
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
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

  const selectedProject = filteredProjects.find((project) => project.id === selectedProjectId) ?? null;

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(event.target.value);
  };

  const handleProjectSelect = (project: Project): void => {
    setSelectedProjectId(project.id);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-6">
        <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white px-4 py-3 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <svg className="h-6 w-6 animate-spin text-indigo-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
          </svg>
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Loading projects</p>
            <p className="text-xs text-gray-600 dark:text-gray-300">Fetching mock data from state…</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-6">
        <div className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-rose-900 shadow-sm dark:border-rose-700 dark:bg-rose-900/30 dark:text-rose-200">
          <p className="font-semibold">Unable to load projects</p>
          <p className="text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 text-black">
      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <label className="flex flex-col gap-2 text-sm font-medium text-gray-900 dark:text-gray-200" htmlFor="project-search">
          Search projects
          <input
            id="project-search"
            ref={inputRef}
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Find a project"
            className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none ring-0 placeholder:text-gray-400 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 dark:placeholder:text-gray-500"
          />
        </label>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-bold text-black dark:text-gray-100">Active Projects</h2>
        <button
          type="button"
          onClick={toggleDetails}
          disabled={!selectedProject}
          className="rounded-full bg-indigo-600 px-3 py-1 text-sm font-medium text-white shadow-sm disabled:cursor-not-allowed disabled:bg-indigo-300"
        >
          {isDetailsOpen ? "Hide details" : "Show details"}
        </button>
      </div>

      <div className="rounded-xl border border-dashed border-indigo-200 bg-indigo-50 p-3 text-sm text-indigo-900 dark:border-indigo-800 dark:bg-indigo-950/40 dark:text-indigo-200">
        Click a project cardnpm , then use the button above to reveal one compact detail summary.
      </div>

      {filteredProjects.length === 0 ? (
        <p className="rounded-xl border border-dashed border-gray-300 p-4 text-sm text-gray-900 dark:border-gray-700 dark:text-gray-300">
          No matching projects found.
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              role="button"
              tabIndex={0}
              onClick={() => handleProjectSelect(project)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  handleProjectSelect(project);
                }
              }}
              className={`cursor-pointer rounded-xl border p-4 shadow-sm transition ${selectedProjectId === project.id ? "border-indigo-500 ring-2 ring-indigo-100 dark:border-indigo-400 dark:ring-indigo-900/40" : "border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800"}`}
            >
              <div className="flex flex-col gap-2">
                <div className="min-w-0">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">{project.name}</h3>
                </div>
                <span className="w-fit rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800 whitespace-nowrap dark:bg-blue-900/40 dark:text-blue-200">
                  {project.status}
                </span>
              </div>

              <div className="mt-3 flex items-center justify-between gap-3 text-sm text-gray-900 dark:text-gray-300">
                <span className="rounded-full bg-gray-100 px-2 py-1 text-gray-900 dark:bg-gray-700 dark:text-gray-200">Priority: {project.priority}</span>
                <span className="whitespace-nowrap">Next review in 2 days</span>
              </div>

              {isDetailsOpen && selectedProject?.id === project.id ? (
                <div className="mt-3 rounded-lg border border-indigo-200 bg-indigo-50 p-3 text-sm text-indigo-900 dark:border-indigo-800 dark:bg-indigo-950/40 dark:text-indigo-200">
                  <p className="font-semibold">Detail summary</p>
                  <p className="mt-1">{project.name}</p>
                  <p className="mt-1">Status: {project.status}</p>
                  <p>Progress: {project.progress}%</p>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function App() {
  const { value: isDarkMode, toggle: toggleDarkMode } = useToggle(false);

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <main className="min-h-screen bg-gray-50 p-6 text-black transition-colors dark:bg-gray-900 dark:text-gray-100">
        <div className="mx-auto max-w-4xl">
          <div className="mb-6 flex items-center justify-between gap-3">
            <div>
              <h1 className="mb-2 text-3xl font-bold text-black dark:text-gray-100">Creative Studio Dashboard</h1>
              <p className="text-gray-700 dark:text-gray-300">
                A simple overview of the current projects, progress, and priorities.
              </p>
            </div>
            <button
              type="button"
              onClick={toggleDarkMode}
              className="rounded bg-gray-800 px-3 py-1.5 text-sm font-medium text-white transition dark:bg-gray-200 dark:text-gray-900"
            >
              {isDarkMode ? "Light Mode" : "Dark Mode"}
            </button>
          </div>
          <ProjectList />
        </div>
      </main>
    </div>
  );
}