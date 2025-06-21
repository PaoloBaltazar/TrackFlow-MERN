import React, { useEffect, useState } from "react";
import api from "@/services/api";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Download, Eye, MoreHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Document {
  _id: string;
  name: string;
  type: string;
  size: string;
  uploadedBy: string;
  uploadDate: string;
  category: string;
}

export const RecentDocumentsList = () => {
  const [recentDocuments, setRecentDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDocuments = async () => {
    try {
      const res = await await api.get("/api/documents", {
        withCredentials: true,
      });
      if (res.data.success) {
        // Limit to the 5 most recent
        setRecentDocuments(res.data.documents.slice(0, 5));
      } else {
        setError("Failed to fetch documents.");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError("An error occurred while fetching documents.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const navigate = useNavigate(); // ✅ Initialize navigate function

  const handleViewAll = () => {
    navigate("/documents"); // ✅ Redirect to Task page
  };

  const getCategoryColor = (department: string) => {
    const colors: { [key: string]: string } = {
      Finance: "bg-emerald-100 text-emerald-800 hover:bg-emerald-200",
      Marketing: "bg-purple-100 text-purple-800 hover:bg-purple-200",
      "Human Resources": "bg-blue-100 text-blue-800 hover:bg-blue-200",
      Operations: "bg-orange-100 text-orange-800 hover:bg-orange-200",
      IT: "bg-gray-100 text-gray-800 hover:bg-gray-200",
    };
    return colors[department] || "bg-gray-100 text-gray-800 hover:bg-gray-200";
  };

  return (
    <Card className="bg-white border border-gray-100 rounded-3xl shadow-sm">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Recent Documents
          </h2>
          <Button
            onClick={handleViewAll}
            variant="ghost"
            size="sm"
            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
          >
            View All
          </Button>
        </div>

        {loading ? (
          <p className="text-sm text-gray-500">Loading documents...</p>
        ) : error ? (
          <p className="text-sm text-red-500">{error}</p>
        ) : recentDocuments.length === 0 ? (
          <p className="text-sm text-gray-500">No documents found.</p>
        ) : (
          <div className="space-y-4">
            {recentDocuments.map((doc) => (
              <div
                key={doc._id}
                className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
              >
                <div className="p-2 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg border border-blue-100 flex-shrink-0">
                  <FileText className="h-5 w-5 text-blue-600" />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900 text-sm truncate group-hover:text-blue-600 transition-colors">
                    {doc.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge
                      variant="outline"
                      className="border border-gray-200 text-xs"
                    >
                      {doc.type}
                    </Badge>
                    <Badge
                      className={`${getCategoryColor(
                        doc.category
                      )} border text-xs`}
                    >
                      {doc.category}
                    </Badge>
                    <span className="text-xs text-gray-500">{doc.size}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    By {doc.uploadedBy} •{" "}
                    {new Date(doc.uploadDate).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 hover:bg-gray-100"
                    onClick={() =>
                      window.open(`/api/document/download/${doc._id}`, "_blank")
                    }
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 hover:bg-gray-100"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 hover:bg-gray-100"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};
