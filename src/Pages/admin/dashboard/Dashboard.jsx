import { useState, useEffect } from "react";
import {
  Home,
  BookOpen,
  FileText,
  Users,
  ChevronDown,
  Menu,
  Settings,
  HelpCircle,
  DollarSign,
  BarChart3,
} from "lucide-react";
import ManageTicket from "../tickets/MangeTicket";
import ManageReliefCase from "../relief-cases/ManageReliefCase";
import ManageUsers from "../user/ManageUser";
import CreatePostAdmin from "../posts/CreatePostAdmin";
import ManagePost from "../posts/ManagePost";
import SentimentStatistics from "../sentiment-statistics/SentimentStatistics";
import { getAllTickets } from "../../../apis/services/TicketService";
import { getAllReliefCases } from "../../../apis/services/ReliefCaseService";
import { getAllUsers } from "../../../apis/services/UserService";
import { getFund } from "../../../apis/services/DonationService";
import { useNavigate } from "react-router-dom";
import DonationMoneyManagement from "../donation/DonationMoneyManagement";
import ManageOrders from "../orders/ManageOrders";
import AdminDonationItems from "../DonationItems/AdminDonationItems";

export default function AdminDashboard() {
  const [activeMenu, setActiveMenu] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activePath, setActivePath] = useState("/dashboard");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [totalTickets, setTotalTickets] = useState(0);
  const [totalReliefCases, setTotalReliefCases] = useState(0);
  const [totalUser, setTotalUsers] = useState(0);
  const [fund, setFund] = useState(0);
  const naviage = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchAllTicket = async () => {
      const res = await getAllTickets({ isAll: true });
      setTotalTickets(res.data.items.length);
    };

    const fetchAllReliefCases = async () => {
      const res = await getAllReliefCases({ isAll: true });
      setTotalReliefCases(res.data.items.length);
    };

    const fetchAllUsers = async () => {
      const res = await getAllUsers({ isAll: true });
      setTotalUsers(res.data.items.length);
    };

    const fetchFund = async () => {
      const res = await getFund();
      setFund(res.data.currentAmount);
    };

    fetchAllTicket();
    fetchAllReliefCases();
    fetchAllUsers();
    fetchFund();
  }, []);

  const formattedDate = currentTime.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleMenu = (menu) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  const menuItems = [
    {
      title: "Dashboard",
      icon: <Home size={20} />,
      path: "/dashboard",
      submenu: false,
    },
    {
      title: "Tickets & Relief",
      icon: <BookOpen size={20} />,
      submenu: true,
      submenuItems: [
        { title: "Manage Tickets", path: "/manage-support-tickets" },
        { title: "Manage Relief Cases", path: "/manage-relief-cases" },
      ],
    },
    {
      title: "Donations",
      icon: <DollarSign size={20} />,
      submenu: true,
      submenuItems: [
        { title: "Manage money Donations", path: "/manage-donation-money" },
        { title: "Manage Item Donations", path: "/manage-donation-item" },
      ],
    },
    {
      title: "Content",
      icon: <FileText size={20} />,
      submenu: true,
      submenuItems: [
        { title: "Create Posts", path: "/create-post" },
        { title: "Manage Posts", path: "/manage-post" },
      ],
    },
    {
      title: "User Management",
      icon: <Users size={20} />,
      submenu: true,
      submenuItems: [{ title: "Manage Users", path: "/manage-users" }],
    },
    {
      title: "Analytics",
      icon: <BarChart3 size={20} />,
      submenu: true,
      submenuItems: [
        { title: "Sentiment Analytics", path: "/sentiment-statistics" },
      ],
    },
    {
      title: "Orders",
      icon: <FileText size={20} />,
      submenu: true,
      submenuItems: [{ title: "Manage Orders", path: "/manage-orders" }],
    },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "w-64" : "w-20"
        } bg-indigo-900 text-white transition-all duration-300 ease-in-out flex flex-col shadow-xl`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-4 py-4 bg-indigo-950">
          {isSidebarOpen && (
            <span className="text-xl font-bold flex items-center">
              <span className="bg-white text-indigo-900 p-1 rounded-md mr-2">
                AP
              </span>
              Admin Panel
            </span>
          )}
          <button
            onClick={toggleSidebar}
            className="p-1 rounded-lg hover:bg-indigo-800 transition-colors"
          >
            <Menu size={20} />
          </button>
        </div>

        {/* Menu Items */}
        <div className="py-2 flex-1 overflow-y-auto">
          {menuItems.map((item, index) => (
            <div key={index}>
              <div
                className={`flex items-center px-4 py-3 cursor-pointer hover:bg-indigo-800 transition-colors ${
                  activePath === item.path ||
                  (item.submenu &&
                    item.submenuItems.some(
                      (subItem) => subItem.path === activePath
                    ))
                    ? "bg-indigo-800 border-l-4 border-white"
                    : ""
                }`}
                onClick={() =>
                  item.submenu
                    ? toggleMenu(item.title)
                    : setActivePath(item.path)
                }
              >
                <span className={`mr-3 ${!isSidebarOpen ? "mx-auto" : ""}`}>
                  {item.icon}
                </span>
                {isSidebarOpen && (
                  <>
                    <span className="flex-1 font-medium">{item.title}</span>
                    {item.submenu && (
                      <ChevronDown
                        size={16}
                        className={`transform transition-transform ${
                          activeMenu === item.title ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </>
                )}
              </div>

              {/* Submenu */}
              {item.submenu && activeMenu === item.title && isSidebarOpen && (
                <div className="bg-indigo-800 pl-12 py-1">
                  {item.submenuItems.map((subItem, subIndex) => (
                    <div
                      key={subIndex}
                      className={`py-2 px-2 cursor-pointer hover:bg-indigo-700 transition-colors ${
                        activePath === subItem.path
                          ? "text-white font-medium"
                          : "text-indigo-200"
                      }`}
                      onClick={() => setActivePath(subItem.path)}
                    >
                      {subItem.title}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom Links */}
        {isSidebarOpen && (
          <div className="mt-auto border-t border-indigo-800 py-3">
            <div className="px-4 py-2 flex items-center hover:bg-indigo-800 cursor-pointer transition-colors">
              <Settings size={18} className="mr-3" />
              <span>Settings</span>
            </div>
            <div className="px-4 py-2 flex items-center hover:bg-indigo-800 cursor-pointer transition-colors">
              <HelpCircle size={18} className="mr-3" />
              <span>Help & Support</span>
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 z-10">
          <div className="flex items-center justify-between px-6 py-3">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-800">
                {menuItems.find(
                  (item) =>
                    item.path === activePath ||
                    (item.submenu &&
                      item.submenuItems.some((sub) => sub.path === activePath))
                )?.title ||
                  menuItems
                    .find(
                      (item) =>
                        item.submenu &&
                        item.submenuItems.some((sub) => sub.path === activePath)
                    )
                    ?.submenuItems.find((sub) => sub.path === activePath)
                    ?.title ||
                  "Dashboard"}
              </h1>
              <span className="text-gray-400 text-sm ml-4">
                {formattedDate}
              </span>
            </div>
          </div>

          {/* Breadcrumb */}
          <div className="px-6 py-2 flex items-center text-sm text-gray-600">
            <span className="font-medium hover:text-indigo-600 cursor-pointer">
              Home
            </span>
            <span className="mx-2">/</span>
            {activePath !== "/dashboard" && (
              <>
                <span className="hover:text-indigo-600 cursor-pointer">
                  {menuItems.find(
                    (item) =>
                      item.submenu &&
                      item.submenuItems.some((sub) => sub.path === activePath)
                  )?.title || "Dashboard"}
                </span>
                <span className="mx-2">/</span>
              </>
            )}
            <span className="text-gray-500">
              {activePath === "/dashboard"
                ? "Dashboard"
                : menuItems
                    .find(
                      (item) =>
                        item.submenu &&
                        item.submenuItems.some((sub) => sub.path === activePath)
                    )
                    ?.submenuItems.find((sub) => sub.path === activePath)
                    ?.title || activePath}
            </span>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          {/* Dashboard Content */}
          {activePath === "/dashboard" && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 transition-transform hover:transform hover:scale-105">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Total Tickets
                      </p>
                      <h3 className="text-3xl font-bold mt-2 text-gray-800">
                        {totalTickets}
                      </h3>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                      <BookOpen size={24} className="text-blue-600" />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 transition-transform hover:transform hover:scale-105">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Relief Cases
                      </p>
                      <h3 className="text-3xl font-bold mt-2 text-gray-800">
                        {totalReliefCases}
                      </h3>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                      <FileText size={24} className="text-green-600" />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 transition-transform hover:transform hover:scale-105">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Total Users
                      </p>
                      <h3 className="text-3xl font-bold mt-2 text-gray-800">
                        {totalUser}
                      </h3>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                      <Users size={24} className="text-purple-600" />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 transition-transform hover:transform hover:scale-105">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Donations
                      </p>
                      <h3 className="text-3xl font-bold mt-2 text-gray-800">
                        ${fund}
                      </h3>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
                      <DollarSign size={24} className="text-yellow-600" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Page-specific content */}
          {activePath !== "/dashboard" && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              {activePath === "/manage-support-tickets" && <ManageTicket />}
              {activePath === "/manage-relief-cases" && <ManageReliefCase />}
              {activePath === "/manage-users" && <ManageUsers />}
              {activePath === "/create-post" && <CreatePostAdmin />}
              {activePath === "/manage-post" && <ManagePost />}
              {activePath === "/sentiment-statistics" && (
                <SentimentStatistics />
              )}
              {activePath === "/manage-donation-money" && (
                <DonationMoneyManagement />
              )}
              {activePath === "/manage-orders" && <ManageOrders />}
              {activePath === "/manage-donation-item" && <AdminDonationItems />}
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 py-3 px-6 text-center text-sm text-gray-500">
          <p>© 2025 Admin Panel. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
