import React, { useState } from "react";
import { UserMenu } from "@/components/UserMenu";
import { NotificationCenter } from "@/components/NotificationCenter";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import api from "@/services/api";
import { useNavigate } from "react-router-dom";

export const DashboardHeader = () => {
  const [query, setQuery] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [results, setResults] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setShowResults(!!value);

    if (!value) {
      setResults([]);
      return;
    }

    try {
      const res = await api.get(`/api/search?q=${value}`);
      if (res.data.success) {
        setResults(res.data.results);
      } else {
        setResults([]);
      }
    } catch (err) {
      console.error("Search error:", err);
      setResults([]);
    }
  };

  const handleRedirect = (type: string, id: string) => {
    setShowResults(false);
    if (type === "task") {
      navigate("/tasks");
    } else if (type === "document") {
      navigate("/documents");
    }
  };

  return (
    <div className="hidden md:block mb-10 relative border-b border-gray-50">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="relative w-full max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="w-4 h-4 text-gray-400" />
          </div>
          <Input
            placeholder="Search tasks or documents..."
            value={query}
            onChange={handleSearch}
            className="pl-10 pr-4 py-2 border rounded-md w-full"
          />
          {showResults && results.length > 0 && (
            <div className="absolute z-10 mt-1 w-full bg-white border rounded-md shadow-md max-h-60 overflow-y-auto">
              {results.map((item) => (
                <div
                  key={item._id}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-700"
                  onClick={() => handleRedirect(item.type, item._id)}
                >
                  {item.type === "task"
                    ? `Task: ${item.title}`
                    : `Document: ${item.name}`}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-5">
          <NotificationCenter />
          <UserMenu />
        </div>
      </div>
    </div>
  );
};
