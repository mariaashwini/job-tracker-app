export default function DashboardCard({ title, description, color, icon, onClick }) {
  return (
    <div className={`w-full flex items-center justify-center rounded-xl shadow-md p-8 ${color} gap-4 `} onClick={onClick}>
      <div className="text-2xl">{icon}</div>
      <div>
        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="text-sm text-gray-700">{description}</p>
      </div>
    </div>
  )};