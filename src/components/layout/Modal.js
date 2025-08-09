export default function Modal({isOpen,onClose,title,children}){
    if(!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-opaity-40 flex items-center justify-center z-50" style={{ backgroundColor: "rgba(0, 0, 0, 0.9)"}}>
            {/* <div onClick={(e)=>e.stopPropagation()} className="bg-white rounded-xl shadow-lg w-[90%] max-w-md p-6 relative"> */}
                <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-4xl font-bold">
                    &times;
                </button>
                {children}
            {/* </div> */}
        </div>
    );
}