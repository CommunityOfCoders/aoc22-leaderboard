const TableRow = ({ item, idx, i }) => {
  return (
    <>
      <tr
        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
        key={idx}
      >
        <th
          scope="row"
          className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          {i + idx + 1}
        </th>
        <th
          scope="row"
          className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          {item.name ? item.name : "Annonymous User"}
        </th>
        <td className="py-4 px-6">
          {item.stars && (
            <div className="flex flex-row justify-start items-center">
              {item.stars}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#FFD700"
                viewBox="0 0 24 24"
                strokeWidth={0}
                stroke="#FFd700"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                />
              </svg>
            </div>
          )}
        </td>
        <td className="py-4 px-6">
          {new Date(item.last_star_ts * 1000).toLocaleString()}
        </td>
        <td className="py-4 px-6">{item.local_score}</td>
      </tr>
    </>
  );
};

export default TableRow;
