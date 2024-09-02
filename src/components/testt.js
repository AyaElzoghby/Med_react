import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
const Grid = ({ data, onEdit, onDelete, Columns = [] }) => {
  const [gridData, setGridData] = useState(data.data); // Initialize with data
  const [tableHeaders, setTableHeaders] = useState([]);
  const [editingRowIndex, setEditingRowIndex] = useState(-1);
  const [newItem, setNewItem] = useState({});
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [totalPagesNumber, setTotalPagesNumber] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Calculate paginated data based on current page and rows per page
  const startIndex = (currentPageNumber - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedData = gridData.slice(startIndex, endIndex);
  useEffect(() => {
    setGridData(data.data);
    // Extract headers based on the specified Columns
    const headers = data.data[0]
      .filter((item) => Columns.includes(item.header)) // Keep only headers in Columns
      .map((item) => item.header);

    setTableHeaders(headers);
    //analyze table headers from the first index
    setTotalPagesNumber(Math.ceil(data.length / rowsPerPage)); //calculats the total num of pages
  }, [data, rowsPerPage, Columns]);

  const handleEdit = (index) => {
    setEditingRowIndex(index);
  };

  // handel save function
  const handleSaveEdit = (index, item) => {
    const updatedData = [...gridData];
    updatedData[index] = item;
    setGridData(updatedData);
    setEditingRowIndex(-1);
    onEdit(updatedData[index]);
  };

  // handel delele function
  const handleDelete = (index) => {
    const updatedData = [...gridData];
    updatedData.splice(index, 1);
    setGridData(updatedData);
    onDelete(index);
    setTotalPagesNumber(Math.ceil(updatedData.length / rowsPerPage));
  };

  // handel Add function
  const handleAdd = () => {
    const updatedData = [...gridData];
    const newItem = {};
    tableHeaders.forEach((header) => {
      if (header !== "id" && header !== "الكود") {
        newItem[header] = "";
      }
    });
    if (tableHeaders.includes("id")) {
      newItem.id = gridData.length + 1;
    } else if (tableHeaders.includes("الكود")) {
      newItem["الكود"] = gridData.length + 1;
    }
    setNewItem(tableHeaders.map((header) => ({ header, value: "" }))); // Create a new item structure
    setEditingRowIndex(gridData.length);
    updatedData.push(newItem);
    setGridData(updatedData);
    setTotalPagesNumber(Math.ceil(updatedData.length / rowsPerPage));
  };

  const handleSaveNewItem = () => {
    const updatedData = [...gridData];
    if (newItem) {
      setGridData([...gridData, newItem]); // Add new item to gridData
      updatedData.push(newItem);
      setEditingRowIndex(-1); // Reset editing index
      setGridData(updatedData);
      setEditingRowIndex(-1);
      setTotalPagesNumber(Math.ceil(updatedData.length / rowsPerPage));
    }
  };

  const handlePageChange = (direction) => {
    if (direction === "prev" && currentPageNumber > 1) {
      setCurrentPageNumber(currentPageNumber - 1);
    } else if (direction === "next" && currentPageNumber < totalPagesNumber) {
      setCurrentPageNumber(currentPageNumber + 1);
    }
  };

  // handel months names & values
  const monthOptions = [
    { value: "0", label: "إختر الشهر" },
    { value: "1", label: "يناير" },
    { value: "2", label: "فبراير" },
    { value: "3", label: "مارس" },
    { value: "4", label: "إبريل" },
    { value: "5", label: "مايو" },
    { value: "6", label: "يونيو" },
    { value: "7", label: "يوليو" },
    { value: "8", label: "أغسطس" },
    { value: "9", label: "سبتمبر" },
    { value: "10", label: "أكتوبر" },
    { value: "11", label: "نوفمبر" },
    { value: "12", label: "ديسمبر" },
  ];

  const namesOptions = [
    { value: "0", label: "إختر لاسم" },
    { value: "1", label: "ايه" },
    { value: "2", label: "يويو" },
    // { value: "3", label: "يويا" },
  ];

  return (
    <div className="grid-component">
      <div className="">
        <div className="container grid p-0">
          <table>
            <thead>
              <tr>
                <th>
                  <button className="action-button Add" onClick={handleAdd}>
                    إضافه
                  </button>
                </th>
                {tableHeaders.map((header, index) => {
                  // Find the caption for the current header
                  const headerData = data.data[0].find(
                    (item) => item.header === header
                  );
                  return (
                    <th key={index}>
                      {headerData ? headerData.caption : header}{" "}
                    </th>
                  );
                })}
              </tr>
            </thead>
          
            <tbody>
              {paginatedData.map((item, index) => (
                <tr key={index}>
                  <td className="Actions">
                    <div className="action-cont">
                      {editingRowIndex === startIndex + index ? (
                        <button
                          className="action-button Save"
                          onClick={() =>
                            handleSaveEdit(startIndex + index, item)
                          }
                        >
                          حفظ
                        </button>
                      ) : (
                        <>
                          <button
                            className="action-button Edit"
                            onClick={() => handleEdit(startIndex + index)}
                          >
                            تعديل
                          </button>
                          <button
                            className="action-button Delete"
                            onClick={() => handleDelete(startIndex + index)}
                          >
                            حذف
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                  {tableHeaders.map((header, headerIndex) => {
                    // Ensure item is an array and log it for debugging
                    // console.log("Current item:", item); // Debugging line
                    const headerData = Array.isArray(item)
                      ? item.find((dataItem) => dataItem.header === header)
                      : null; // Check if item is an array
                    return (
                      <td key={headerIndex}>
                        {editingRowIndex === startIndex + index ? (
                          <input
                            type="text"
                            value={headerData ? headerData.value : item[header]}
                            onChange={(e) => {
                              if (header !== "id" && header !== "الكود") {
                                const updatedItem = {
                                  ...item,
                                  [header]: e.target.value,
                                };
                                const updatedData = [...gridData];
                                updatedData[startIndex + index] = updatedItem;
                                setGridData(updatedData);
                              }
                            }}
                          />
                        ) : headerData ? (
                          headerData.value
                        ) : (
                          item[header]
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pages Navigation  */}
        {gridData.length > rowsPerPage && (
          <div className="table-Navigation container-fliud col-12 bg-light row m-0">
            <div className="col-9 d-flex container">
              <div className="d-flex container p-0 m-0">
                <span className="my-auto text-center">
                  <b>الصفحه</b>
                </span>
                <FontAwesomeIcon
                  icon={faChevronRight}
                  className="next btn my-auto"
                  onClick={() => handlePageChange("prev")}
                />
                <input value={currentPageNumber} />
                <p className="my-auto">/</p>
                <input value={totalPagesNumber} />
                <FontAwesomeIcon
                  icon={faChevronLeft}
                  className="previous btn my-auto"
                  onClick={() => handlePageChange("next")}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Grid;

// import React, { useState, useEffect } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faChevronRight,
//   faChevronLeft,
// } from "@fortawesome/free-solid-svg-icons";
// const Grid = ({ data, onEdit, onDelete, Columns = [], dropList = [] }) => {
//   const [gridData, setGridData] = useState([]);
//   const [tableHeaders, setTableHeaders] = useState([]);
//   const [editingRowIndex, setEditingRowIndex] = useState(-1);
//   const [newItem, setNewItem] = useState({});
//   const [currentPageNumber, setCurrentPageNumber] = useState(1);
//   const [totalPagesNumber, setTotalPagesNumber] = useState(1);
//   const [rowsPerPage, setRowsPerPage] = useState(10);

//   // Calculate paginated data based on current page and rows per page
//   const startIndex = (currentPageNumber - 1) * rowsPerPage;
//   const endIndex = startIndex + rowsPerPage;
//   const paginatedData = gridData.slice(startIndex, endIndex);
//   useEffect(() => {
//     setGridData(data.data);
//     // Extract headers based on the specified Columns
//     const headers = data.data[0]
//       .filter((item) => Columns.includes(item.header)) // Keep only headers in Columns
//       .map((item) => item.header);

//     setTableHeaders(headers);
//     setTotalPagesNumber(Math.ceil(data.length / rowsPerPage)); //calculats the total num of pages
//   }, [data, rowsPerPage, Columns]);

//   const handleEdit = (index) => {
//     setEditingRowIndex(index);
//   };

//   // handel save function
//   const handleSaveEdit = (index, item) => {
//     const updatedData = [...gridData];
//     updatedData[index] = item;
//     setGridData(updatedData);
//     setEditingRowIndex(-1);
//     onEdit(updatedData[index]);
//   };

//   // handel delele function
//   const handleDelete = (index) => {
//     const updatedData = [...gridData];
//     updatedData.splice(index, 1);
//     setGridData(updatedData);
//     onDelete(index);
//     setTotalPagesNumber(Math.ceil(updatedData.length / rowsPerPage));
//   };

//   // handel Add function
//   const handleAdd = () => {
//     const updatedData = [...gridData];
//     const newItem = {};
//     tableHeaders.forEach((header) => {
//       if (header !== "id" && header !== "الكود") {
//         newItem[header] = "";
//       }
//     });
//     if (tableHeaders.includes("id")) {
//       newItem.id = gridData.length + 1;
//     } else if (tableHeaders.includes("الكود")) {
//       newItem["الكود"] = gridData.length + 1;
//     }
//     updatedData.push(newItem);
//     setGridData(updatedData);
//     setNewItem(newItem);
//     setEditingRowIndex(gridData.length);
//     setTotalPagesNumber(Math.ceil(updatedData.length / rowsPerPage));
//   };

//   //   const handleSaveNewItem = () => {
//   //     const updatedData = [...gridData];
//   //     updatedData.push(newItem);
//   //     setGridData(updatedData);
//   //     setNewItem({}); // reset the new item state
//   //     setEditingRowIndex(-1);
//   //     setTotalPagesNumber(Math.ceil(updatedData.length / rowsPerPage));
//   //   };
//   const handleSaveNewItem = () => {
//     const updatedData = [...gridData];
//     if (newItem) {
//       setGridData([...gridData, newItem]); // Add new item to gridData
//       updatedData.push(newItem);
//       setEditingRowIndex(-1); // Reset editing index
//       setGridData(updatedData);
//       setEditingRowIndex(-1);
//       setTotalPagesNumber(Math.ceil(updatedData.length / rowsPerPage));
//     }
//   };

//   const handlePageChange = (direction) => {
//     if (direction === "prev" && currentPageNumber > 1) {
//       setCurrentPageNumber(currentPageNumber - 1);
//     } else if (direction === "next" && currentPageNumber < totalPagesNumber) {
//       setCurrentPageNumber(currentPageNumber + 1);
//     }
//   };

//   // handel months names & values
//   const monthOptions = [
//     { value: "0", label: "إختر الشهر" },
//     { value: "1", label: "يناير" },
//     { value: "2", label: "فبراير" },
//     { value: "3", label: "مارس" },
//     { value: "4", label: "إبريل" },
//     { value: "5", label: "مايو" },
//     { value: "6", label: "يونيو" },
//     { value: "7", label: "يوليو" },
//     { value: "8", label: "أغسطس" },
//     { value: "9", label: "سبتمبر" },
//     { value: "10", label: "أكتوبر" },
//     { value: "11", label: "نوفمبر" },
//     { value: "12", label: "ديسمبر" },
//   ];

//   const namesOptions = [
//     { value: "0", label: "إختر لاسم" },
//     { value: "1", label: "ايه" },
//     { value: "2", label: "يويو" },
//     // { value: "3", label: "يويا" },
//   ];

//   return (
//     <div className="grid-component">
//       <div className="">
//         <div className="container grid p-0">
//           <table>
//             <thead>
//               <tr>
//                 <th>
//                   <button className="action-button Add" onClick={handleAdd}>
//                     إضافه
//                   </button>
//                 </th>
//                 {tableHeaders.map((header, index) => {
//                   // Find the caption for the current header
//                   const headerData = data.data[0].find(
//                     (item) => item.header === header
//                   );
//                   return (
//                     <th key={index}>
//                       {headerData ? headerData.caption : header}{" "}
//                     </th>
//                   );
//                 })}
//               </tr>
//             </thead>
//             <tbody>
//               {paginatedData.map((item, index) => (
//                 <tr key={index}>
//                   <td className="Actions">
//                     <div className="action-cont">
//                       {editingRowIndex === startIndex + index ? (
//                         <button
//                           className="action-button Save"
//                           onClick={() =>
//                             handleSaveEdit(startIndex + index, item)
//                           }
//                         >
//                           حفظ
//                         </button>
//                       ) : (
//                         <>
//                           <button
//                             className="action-button Edit"
//                             onClick={() => handleEdit(startIndex + index)}
//                           >
//                             تعديل
//                           </button>
//                           <button
//                             className="action-button Delete"
//                             onClick={() => handleDelete(startIndex + index)}
//                           >
//                             حذف
//                           </button>
//                         </>
//                       )}
//                     </div>
//                   </td>
//                   {tableHeaders.map((header, headerIndex) => {
//                     const headerData = Array.isArray(item)
//                       ? item.find((dataItem) => dataItem.header === header)
//                       : null; // Check if item is an array
//                     return (
//                       <td key={headerIndex}>
//                         {editingRowIndex === startIndex + index ? (
//                           <input
//                             type="text"
//                             value={item[header]}
//                             onChange={(e) => {
//                               if (header !== "id" && header !== "الكود") {
//                                 const updatedItem = {
//                                   ...item,
//                                   [header]: e.target.value,
//                                 };
//                                 const updatedData = [...gridData];
//                                 updatedData[startIndex + index] = updatedItem;
//                                 setGridData(updatedData);
//                               }
//                             }}
//                           />
//                         ) : (
//                           item[header]
//                         )}
//                       </td>
//                     );
//                   })}
//                 </tr>
//               ))}
//               {/* {editingRowIndex === gridData.length ? (
//                 <tr>
//                   {tableHeaders.map((header, headerIndex) => (
//                     <td key={headerIndex}>
//                       {header !== "id" && header !== "الكود" ? (
//                         header === "الشهر" || header === "month" ? (
//                           <select
//                             value={newItem[header]}
//                             onChange={(e) => {
//                               setNewItem({
//                                 ...newItem,
//                                 [header]: e.target.value,
//                               });
//                             }}
//                           >
//                             {monthOptions.map((option) => (
//                               <option key={option.value} value={option.label}>
//                                 {option.label}
//                               </option>
//                             ))}
//                           </select>
//                         ) : (
//                           <input
//                             type="text"
//                             value={newItem[header]}
//                             onChange={(e) => {
//                               setNewItem({
//                                 ...newItem,
//                                 [header]: e.target.value,
//                               });
//                             }}
//                           />
//                         )
//                       ) : (
//                         <span>{newItem[header] || ""}</span>
//                       )}
//                     </td>
//                   ))}
//                   <td className="Actions">
//                     <button
//                       className="action-button Save"
//                       onClick={handleSaveNewItem}
//                     >
//                       حفظ
//                     </button>
//                   </td>
//                 </tr>
//               ) : null} */}
//             </tbody>
//           </table>
//         </div>
//         {/* Pages Navigation  */}
//         {gridData.length > rowsPerPage && (
//           <div className="table-Navigation container-fliud col-12 bg-light row m-0">
//             <div className="col-9 d-flex container">
//               <div className="d-flex container p-0 m-0">
//                 <span className="my-auto text-center">
//                   <b>الصفحه</b>
//                 </span>
//                 <FontAwesomeIcon
//                   icon={faChevronRight}
//                   className="next btn my-auto"
//                   onClick={() => handlePageChange("prev")}
//                 />
//                 <input value={currentPageNumber} />
//                 <p className="my-auto">/</p>
//                 <input value={totalPagesNumber} />
//                 <FontAwesomeIcon
//                   icon={faChevronLeft}
//                   className="previous btn my-auto"
//                   onClick={() => handlePageChange("next")}
//                 />
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };
// export default Grid;
