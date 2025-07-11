import { FaSearch } from "react-icons/fa";

export default function SearchSelect() {
  return (
    <div className="p-1 bg-white mt-3">
      <div className="grid grid-cols-12 gap-4 items-center">
        
        <div className="col-span-10 flex items-center border border-gray-300 rounded-md px-3 py-2 bg-gray-50">
          <FaSearch className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search employees..."
            className="w-full bg-transparent outline-none text-sm"
          />
        </div>

        <div className="col-span-2 flex items-center border border-gray-300 rounded-md px-3 py-2 bg-white">
          <select
            className="w-full h-full text-sm bg-white text-gray-700 outline-none"
            defaultValue=""
          >
            <option value="" disabled>
              Select
            </option>
            <option value="marketing">Marketing</option>
            <option value="sales">Sales</option>
            <option value="hr">HR</option>
            <option value="engineering">Engineering</option>
          </select>
        </div>
      </div>
    </div>
  );
}