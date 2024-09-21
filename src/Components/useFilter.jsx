import { useState } from 'react'

export function useFilter(dataList, callback) {
  const [query, setQuery] = useState('')

  const filteredData = dataList.filter((data) =>
    callback(data).toLowerCase().includes(query)
  )

  return [filteredData, setQuery]
}


// import { useState } from "react";

// export function useFilter(dataList, filterProperty) {

//   const [filterData, setFilterData] = useState(dataList);

//   const handleFilterChange = (e) => {
//     let value = e.target.value.toLowerCase();
//     const newFilteredData = dataList.filter((data) => {
//       if (value === "") {
//         return true;
//       } else {
//         return  data[filterProperty].toLowerCase() === value;
//       }
//     });
//     setFilterData(newFilteredData);
//   };

//   return [filterData, handleFilterChange];
// }

