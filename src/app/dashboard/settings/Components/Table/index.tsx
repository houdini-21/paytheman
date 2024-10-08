import { FaRegTrashAlt } from "react-icons/fa";

interface TableProps {
  id: number;
  companyName: string;
}

interface TablePropsList {
  tableItems: TableProps[];
  deleteItem: (id: number) => void;
}

export const Table = ({ tableItems, deleteItem }: TablePropsList) => {
  return (
    <div className="overflow-x-auto">
      <table className="border-collapse table-auto w-full mt-4">
        <thead>
          <tr>
            <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
              Company name
            </th>

            <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {tableItems.map((item: TableProps) => (
            <tr
              key={item.id}
              className="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0"
            >
              <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static before:content-[attr(data-label)] before:text-gray-500 before:absolute before:left-4 lg:before:content-none">
                <span className="lg:hidden font-bold">Company Name: </span>
                {item.companyName}
              </td>

              <td className="w-full lg:w-auto p-3 text-gray-800 border border-b text-center block lg:table-cell relative lg:static before:content-[attr(data-label)] before:text-gray-500 before:absolute before:left-4 lg:before:content-none">
                <span className="lg:hidden font-bold">Actions: </span>
                <button
                  type="button"
                  className="text-red-500 hover:text-red-600 text-xl"
                  onClick={() => deleteItem(item.id)}
                >
                  <FaRegTrashAlt />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
