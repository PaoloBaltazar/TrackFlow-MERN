import React, { useState } from "react";
import { UserMenu } from "@/components/UserMenu";
import { NotificationCenter } from "@/components/NotificationCenter";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import api from "@/services/api";
import { useNavigate } from "react-router-dom";

// Add props: firstName, greeting, formattedDate
export const DashboardHeader = ({
  firstName,
  greeting,
  formattedDate,
}: {
  firstName: string;
  greeting: string;
  formattedDate: string;
}) => {
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
    <div className="hidden md:block mb-8 mt-4 relative border-b border-gray-50 pb-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="text-left hidden sm:block">
          <h1 className="text-4xl font-semibold text-gray-800 mb-2 mt-2">
            {greeting}, {firstName}
          </h1>
          <p className="text-md text-gray-500">{formattedDate}</p>
        </div>

        {/* Greeting & User Actions */}
        <div className="flex items-center gap-5">
          {/* Search */}
          <div className="relative w-full max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="w-4 h-4 text-gray-400" />
            </div>
            <Input
              placeholder="Search"
              value={query}
              onChange={handleSearch}
              className="pl-10 pr-10 py-2 border rounded-2xl w-full h-12"
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
          <NotificationCenter />
          <UserMenu />
        </div>
      </div>
    </div>
  );
};
