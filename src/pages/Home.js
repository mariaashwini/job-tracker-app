import { useNavigate } from "react-router-dom"

export default function Home() {

   const navigate =  useNavigate();
    return <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
  <div className="w-full max-w-[400px] bg-white p-6 rounded-lg shadow-lg">
    <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">
      Job Tracker App
    </h1>

    <p className="text-gray-600 mb-3 text-center">
      ✅ <strong>Stay Focused. Stay Hired.</strong><br />
      Organize your job search like a pro.
    </p>

    <ul className="text-gray-700 text-sm mb-4 list-disc pl-5 space-y-1">
      <li>📄 Track job applications</li>
      <li>🕒 Manage job status: Applied, Interviewing, Offered, etc.</li>
      <li>📝 Add notes for each opportunity</li>
      <li>🔍 Filter and search easily</li>
    </ul>

    <p className="text-gray-600 text-sm mb-4 text-center">
      No sign-up needed. Everything is stored locally in your browser.
    </p>

    <div className="flex gap-3 mx-autoflex items-center justify-center gap-3">
      <button onClick={()=>navigate('/register')} className="bg-blue-600 text-white hover:border hover:border-blue-600 hover:bg-white hover:text-blue-600 px-4 py-2 rounded-md transition">
       Register
      </button>
      <button onClick={()=>navigate('/login')}  className="bg-blue-600 text-white hover:border hover:border-blue-600 hover:bg-white hover:text-blue-600 px-4 py-2 rounded-md transition">
        Login
      </button>
    </div>
  </div>
</div>

    
}
