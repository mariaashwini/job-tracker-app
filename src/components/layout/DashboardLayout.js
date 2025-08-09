import { Outlet, useLocation, useNavigate } from "react-router-dom";
import DashboardCard from "../../components/dashboard/DashboardCard";

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  const navigate = useNavigate();
  const location = useLocation();

  const isDashboardHome = location.pathname === "/dashboard";
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="max-w-5xl mx-auto px-4 py-8">
        {isDashboardHome && (
          <div className="flex flex-col items-center mb-8">
            <div className="w-24 h-24 bg-blue-500 rounded-full text-white flex items-center justify-center text-3xl font-bold shadow-lg">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <h2 className="text-2xl font-bold mt-4">Hey there!</h2>
            <p className="text-gray-500">What would you like to do today?</p>
          </div>
        )}

        {/* <DashboardCard
            title="Wanna search for jobs?"
            description="Discover opportunities tailored just for you! Find your dream job today."
            color="bg-purple-100"
            icon="🔍" onClick={()=>navigate()}
          /> */}
        {isDashboardHome && (
          <div className="flex items-center gap-6">
            <DashboardCard
              title="Track and Search your applications"
              description="Stay organized! Keep tabs on where you’ve applied and what’s next."
              color="bg-green-100"
              icon="📝"
              onClick={() => navigate("/dashboard/jobs")}
            />
            <DashboardCard
              title="See your performance metrics"
              description="Track your progress and get insights on your job search journey!"
              color="bg-red-100"
              icon="📊"
            />
          </div>
        )}

        <Outlet />
      </main>
    </div>
  );
}
