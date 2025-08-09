export default function FormWrapper({title,children}) {
  return (
    <div
      className="bg-opacity-40 text-white p-8 rounded-xl w-full max-w-md shadow-lg"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.9)", minHeight: "520px" }}
    >
      <h2 className="text-2xl font-bold text-center">{title}</h2>
      <div className="w-12 h-1 bg-blue-500 mx-auto mt-2 mb-4"></div>
      {children}
    </div>
  );
}
