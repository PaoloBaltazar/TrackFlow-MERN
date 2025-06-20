import React, { useState, useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Upload, FileText, Download, Eye, Trash2 } from "lucide-react";
import api from "@/services/api";
import { DashboardHeader } from "@/components/DashboardHeader";

interface Document {
  _id: string;
  name: string;
  type: string;
  size: string;
  uploadedBy: string;
  uploadDate: string;
  category: string;
}

const Documents = () => {
  const { toast } = useToast();

  const [documents, setDocuments] = useState<Document[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const res = await api.get("/api/documents");
        if (res.data.success) {
          setDocuments(res.data.documents);
        }
      } catch (err) {
        console.error("Error fetching documents:", err);
      }
    };

    fetchDocuments();
  }, []);

  const filteredDocuments = documents.filter(
    (doc) =>
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.uploadedBy.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("category", "General");

      try {
        const res = await api.post("/api/documents/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        });

        if (res.data.success) {
          setDocuments((prev) => [res.data.document, ...prev]);
          toast({
            title: "📄 File uploaded successfully!",
            description: `${file.name} has been uploaded.`,
          });
        }
      } catch (err) {
        console.error("Upload failed:", err);
        toast({
          title: "❌ Upload failed",
          description: "Something went wrong while uploading.",
        });
      }
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("category", "General");

      try {
        const res = await api.post("/api/documents/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        });

        if (res.data.success) {
          setDocuments((prev) => [res.data.document, ...prev]);
          toast({
            title: "📄 File uploaded successfully!",
            description: `${file.name} has been uploaded.`,
          });
        }
      } catch (error) {
        console.error("Upload error:", error);
        toast({
          title: "❌ Upload failed",
          description: "Something went wrong while uploading.",
        });
      }
    }
  };

  const handleDownload = async (docId: string) => {
    try {
      const res = await api.get(`/api/documents/download/${docId}`, {
        responseType: "blob",
        withCredentials: true,
      });

      const blob = new Blob([res.data], {
        type: res.headers["content-type"], // This will be application/pdf
      });

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;

      // Optional: try to get filename from Content-Disposition header
      const disposition = res.headers["content-disposition"];
      const match = disposition?.match(/filename="(.+)"/);
      const fileName = match ? match[1] : "downloaded-document";
      console.log(res.headers["content-type"]);

      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Download failed:", error);
      toast({
        title: "❌ Download failed",
        description: "An error occurred while downloading the document.",
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await api.delete(`/api/documents/delete/${id}`, {
        withCredentials: true,
      });

      if (res.data.success) {
        setDocuments((prev) => prev.filter((doc) => doc._id !== id));
        toast({
          title: "🗑️ Document deleted",
          description: "The document was deleted successfully.",
        });
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast({
        title: "❌ Delete failed",
        description: "Something went wrong while deleting the document.",
      });
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      Financial: "bg-emerald-50 text-emerald-700 border-emerald-100",
      Marketing: "bg-purple-50 text-purple-700 border-purple-100",
      HR: "bg-blue-50 text-blue-700 border-blue-100",
      Operations: "bg-orange-50 text-orange-700 border-orange-100",
      Technical: "bg-gray-50 text-gray-700 border-gray-100",
    };
    return colors[category] || "bg-gray-50 text-gray-700 border-gray-100";
  };

  const getFileIcon = (type: string) => (
    <FileText className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
  );

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
          <DashboardHeader />
          <div className="mb-6 sm:mb-10">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
                  Documents
                </h1>
                <p className="text-gray-600 mt-2 text-sm sm:text-base">
                  Upload, organize, and manage your company documents
                </p>
              </div>
            </div>
          </div>

          {/* Upload Area */}
          <Card
            className={`p-6 sm:p-8 mb-6 sm:mb-8 border-2 border-dashed transition-all duration-300 shadow-sm bg-white ${
              dragActive ? "border-blue-400 bg-blue-50/50" : "border-gray-300"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="text-center">
              <div className="p-3 sm:p-4 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 flex items-center justify-center border border-blue-100">
                <Upload className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                Upload Documents
              </h3>
              <p className="text-gray-600 mb-4 text-sm sm:text-base">
                Drag and drop files here, or click to select files
              </p>

              <input
                type="file"
                onChange={handleFileSelect}
                ref={fileInputRef}
                className="hidden"
              />
              <Button
                variant="outline"
                className="border-gray-200 hover:bg-gray-50 w-full sm:w-auto"
                onClick={() => fileInputRef.current?.click()}
              >
                Choose Files
              </Button>
            </div>
          </Card>

          {/* Search Bar */}
          <div className="mb-6 sm:mb-8">
            <Card className="p-4 bg-white border border-gray-200 shadow-sm">
              <Input
                placeholder="Search documents by name, category, or uploader..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:max-w-md border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </Card>
          </div>

          {/* Documents List */}
          <div className="space-y-4">
            {filteredDocuments.map((doc) => (
              <Card
                key={doc._id}
                className="group bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
              >
                <div className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-start sm:items-center space-x-3 sm:space-x-4 min-w-0 flex-1">
                      <div className="p-2 sm:p-3 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl shadow-sm border border-blue-100 flex-shrink-0">
                        {getFileIcon(doc.type)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-2 truncate">
                          {doc.name}
                        </h3>
                        <div className="flex flex-wrap items-center gap-2 mb-2">
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
                          <span className="text-xs sm:text-sm text-gray-500">
                            {doc.size}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-500">
                          Uploaded by{" "}
                          <span className="font-medium text-gray-900">
                            {doc.uploadedBy}
                          </span>{" "}
                          on {new Date(doc.uploadDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2 w-full sm:w-auto">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-200 hover:bg-gray-50 flex-1 sm:flex-none"
                        onClick={() => handleDownload(doc._id)}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        <span className="hidden sm:inline">Download</span>
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        className="flex-1 sm:flex-none"
                        onClick={() => handleDelete(doc._id)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        <span className="hidden sm:inline">Delete</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Documents;
