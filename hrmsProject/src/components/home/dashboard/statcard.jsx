export default function Statcard({ title, count, icon, color }) {
  return (
    <div className="flex  items-center justify-between p-3 rounded-lg shadow-md bg-white  gap-3">
      <div>
        <h5 className="text-md text-gray-400">{title}</h5>
        <span />
        <h6 className="text-xs font-bold">{count}</h6>
      </div>
      <div
        className={`${color} flex items-center justify-center h-14 w-18 text-3xl rounded`}
      >
        {icon}
      </div>
    </div>
  );
}