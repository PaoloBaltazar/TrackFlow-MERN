import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Upload, FileText, Download, Eye } from 'lucide-react';

interface Document {
  id: number;
  name: string;
  type: string;
  size: string;
  uploadedBy: string;
  uploadDate: string;
  category: string;
}

const Documents = () => {
  const [documents] = useState<Document[]>([
    {
      id: 1,
      name: 'Q4_Financial_Report.pdf',
      type: 'PDF',
      size: '2.4 MB',
      uploadedBy: 'John Doe',
      uploadDate: '2024-06-10',
      category: 'Financial'
    },
    {
      id: 2,
      name: 'Marketing_Campaign_Brief.docx',
      type: 'DOCX',
      size: '1.8 MB',
      uploadedBy: 'Jane Smith',
      uploadDate: '2024-06-12',
      category: 'Marketing'
    },
    {
      id: 3,
      name: 'Employee_Handbook_2024.pdf',
      type: 'PDF',
      size: '5.2 MB',
      uploadedBy: 'Mike Johnson',
      uploadDate: '2024-06-08',
      category: 'HR'
    },
    {
      id: 4,
      name: 'Project_Timeline.xlsx',
      type: 'XLSX',
      size: '856 KB',
      uploadedBy: 'Sarah Wilson',
      uploadDate: '2024-06-11',
      category: 'Operations'
    },
    {
      id: 5,
      name: 'Technical_Specifications.pdf',
      type: 'PDF',
      size: '3.1 MB',
      uploadedBy: 'David Brown',
      uploadDate: '2024-06-09',
      category: 'Technical'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [dragActive, setDragActive] = useState(false);

  const filteredDocuments = documents.filter(doc =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.uploadedBy.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      console.log('Files dropped:', e.dataTransfer.files);
      // Handle file upload logic here
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Financial': 'bg-emerald-50 text-emerald-700 border-emerald-100',
      'Marketing': 'bg-purple-50 text-purple-700 border-purple-100',
      'HR': 'bg-blue-50 text-blue-700 border-blue-100',
      'Operations': 'bg-orange-50 text-orange-700 border-orange-100',
      'Technical': 'bg-gray-50 text-gray-700 border-gray-100'
    };
    return colors[category] || 'bg-gray-50 text-gray-700 border-gray-100';
  };

  const getFileIcon = (type: string) => {
    return <FileText className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />;
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
          {/* Header Section */}
          <div className="mb-6 sm:mb-10">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
                  Documents
                </h1>
                <p className="text-gray-600 mt-2 text-sm sm:text-base">Upload, organize, and manage your company documents</p>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700 shadow-sm w-full sm:w-auto">
                <Upload className="mr-2 h-4 w-4" />
                Upload Document
              </Button>
            </div>
          </div>

          {/* Upload Area */}
          <Card 
            className={`p-6 sm:p-8 mb-6 sm:mb-8 border-2 border-dashed transition-all duration-300 shadow-sm bg-white ${
              dragActive ? 'border-blue-400 bg-blue-50/50' : 'border-gray-300'
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
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Upload Documents</h3>
              <p className="text-gray-600 mb-4 text-sm sm:text-base">Drag and drop files here, or click to select files</p>
              <Button variant="outline" className="border-gray-200 hover:bg-gray-50 w-full sm:w-auto">
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

          {/* Documents Grid */}
          <div className="space-y-4">
            {filteredDocuments.map((doc) => (
              <Card key={doc.id} className="group bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
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
                          <Badge variant="outline" className="border border-gray-200 text-xs">
                            {doc.type}
                          </Badge>
                          <Badge className={`${getCategoryColor(doc.category)} border text-xs`}>
                            {doc.category}
                          </Badge>
                          <span className="text-xs sm:text-sm text-gray-500">{doc.size}</span>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-500">
                          Uploaded by <span className="font-medium text-gray-900">{doc.uploadedBy}</span> on {doc.uploadDate}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 w-full sm:w-auto">
                      <Button variant="outline" size="sm" className="border-gray-200 hover:bg-gray-50 flex-1 sm:flex-none">
                        <Download className="h-4 w-4 mr-2" />
                        <span className="hidden sm:inline">Download</span>
                      </Button>
                      <Button variant="outline" size="sm" className="border-gray-200 hover:bg-gray-50 flex-1 sm:flex-none">
                        <Eye className="h-4 w-4 mr-2" />
                        <span className="hidden sm:inline">View</span>
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
