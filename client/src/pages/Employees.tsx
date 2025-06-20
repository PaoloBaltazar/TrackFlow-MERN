import React, { useEffect, useState } from "react";
import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Users, Mail, User } from "lucide-react";
import api from "@/services/api";
import { DashboardHeader } from "@/components/DashboardHeader";

interface Employee {
  _id: string;
  name: string;
  email: string;
  role: string;
  department: string;
}

const Employees = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await api.get("/api/user/employees");
        if (res.data.success && res.data.users) {
          setEmployees(res.data.users);
        }
      } catch (error) {
        console.error("Error fetching employees:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getDepartmentColor = (department: string) => {
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
    <Layout>
      <div className="min-h-screen bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
          {/* Dashboard Header */}
          <DashboardHeader />

          {/* Header */}
          <div className="mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
                  Employees
                </h1>
                <p className="text-gray-600 mt-2 text-sm sm:text-base">
                  Manage your team members and their information
                </p>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700 shadow-sm w-full sm:w-auto">
                <Users className="mr-2 h-4 w-4" />
                Add Employee
              </Button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mb-6 sm:mb-8">
            <Card className="p-4 bg-white border border-gray-200 shadow-sm">
              <Input
                placeholder="Search employees by name, role, or department..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:max-w-md border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </Card>
          </div>

          {/* Content */}
          {loading ? (
            <div className="text-center text-gray-500 py-10">
              Loading employees...
            </div>
          ) : filteredEmployees.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredEmployees.map((employee) => (
                <Card
                  key={employee._id}
                  className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200"
                >
                  <div className="p-6 sm:p-8">
                    {/* Header */}
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-blue-600 font-semibold text-lg sm:text-xl">
                          {employee.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1 truncate">
                          {employee.name}
                        </h3>
                        <p className="text-gray-600 text-sm truncate">
                          {employee.role}
                        </p>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-gray-100 mb-6"></div>

                    {/* Contact Info */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 text-gray-600">
                        <Mail className="h-4 w-4 flex-shrink-0" />
                        <span className="text-sm truncate">
                          {employee.email}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 text-gray-600">
                        <User className="h-4 w-4 flex-shrink-0" />
                        <Badge
                          className={`${getDepartmentColor(
                            employee.department
                          )} text-xs font-medium border-0`}
                        >
                          {employee.department}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Users className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No employees found
              </h3>
              <p className="text-gray-600">
                Try adjusting your search criteria
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Employees;
