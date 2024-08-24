/*final editttttttttttttttttttt*/

// import React, { useState, useEffect } from "react";

// const Grid = ({ data, onEdit, onDelete }) => {
//   const [gridData, setGridData] = useState([]);
//   const [tableHeaders, setTableHeaders] = useState([]);
//   const [editingRowIndex, setEditingRowIndex] = useState(-1);
//   const [newItem, setNewItem] = useState({});

//   useEffect(() => {
//     setGridData(data);
//     setTableHeaders(Object.keys(data[0]));
//   }, [data]);

//   const handleEdit = (index) => {
//     setEditingRowIndex(index);
//   };

//   const handleSaveEdit = (index, item) => {
//     const updatedData = [...gridData];
//     updatedData[index] = item;
//     setGridData(updatedData);
//     setEditingRowIndex(-1);
//     onEdit(updatedData[index]);
//   };

//   const handleDelete = (index) => {
//     const updatedData = [...gridData];
//     updatedData.splice(index, 1);
//     setGridData(updatedData);
//     onDelete(index);
//   };

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
//   };

//   const handleSaveNewItem = () => {
//     const updatedData = [...gridData];
//     updatedData.push(newItem);
//     setGridData(updatedData);
//     setNewItem({}); // reset the new item state
//     setEditingRowIndex(-1);
//   };

//   return (
//     <div className="container p-0">
//       <div className="">
//         <table className="">
//           <thead>
//             <tr>
//             <th>
//                 <button className="action-button Add" onClick={handleAdd}>
//                   Add Data
//                 </button>
//               </th>
//               {tableHeaders.map((header, index) => (
//                 <th key={index}>{header}</th>
//               ))}

//             </tr>
//           </thead>
//           <tbody>
//             {gridData.map((item, index) => (
//               <tr key={index}>
//                 <td className="Actions">
//                   <div className="action-cont">
//                     {editingRowIndex === index ? (
//                       <button
//                         className="action-button Save"
//                         onClick={() => handleSaveEdit(index, item)}
//                       >
//                         Save
//                       </button>
//                     ) : (
//                       <>
//                         <button
//                           className="action-button Edit"
//                           onClick={() => handleEdit(index)}
//                         >
//                           Edit
//                         </button>
//                         <button
//                           className="action-button Delete"
//                           onClick={() => handleDelete(index)}
//                         >
//                           Delete
//                         </button>
//                       </>
//                     )}
//                   </div>
//                 </td>
//                 {tableHeaders.map((header, headerIndex) => (
//                   <td key={headerIndex}>
//                     {editingRowIndex === index ? (
//                       <input
//                         type="text"
//                         value={item[header]}
//                         onChange={(e) => {
//                           if (header !== "id" && header !== "الكود") {
//                             const updatedItem = {
//                               ...item,
//                               [header]: e.target.value,
//                             };
//                             const updatedData = [...gridData];
//                             updatedData[index] = updatedItem;
//                             setGridData(updatedData);
//                           }
//                         }}
//                       />
//                     ) : (
//                       item[header]
//                     )}
//                   </td>
//                 ))}
//               </tr>
//             ))}
//             {editingRowIndex === gridData.length ? (
//               <tr>
//                 {tableHeaders.map((header, headerIndex) => (
//                   <td key={headerIndex}>
//                     {header !== "id" && header !== "الكود" ? (
//                       <input
//                         type="text"
//                         value={newItem[header]}
//                         onChange={(e) => {
//                           setNewItem({ ...newItem, [header]: e.target.value });
//                         }}
//                       />
//                     ) : (
//                       <span>{newItem[header] || ""}</span>
//                     )}
//                   </td>
//                 ))}
//                 <td className="Actions">
//                   <button
//                     className="action-button Save"
//                     onClick={handleSaveNewItem}
//                   >
//                     Save
//                   </button>
//                 </td>
//               </tr>
//             ) : null}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Grid;

// import React, { useState, useEffect } from "react";

// const Grid = ({ data, onEdit, onDelete }) => {
//   const [gridData, setGridData] = useState([]);
//   const [tableHeaders, setTableHeaders] = useState([]);
//   const [editingRowIndex, setEditingRowIndex] = useState(-1);
//   const [newItem, setNewItem] = useState({});

//   useEffect(() => {
//     setGridData(data);
//     setTableHeaders(Object.keys(data[0]));
//   }, [data]);

//   const handleEdit = (index) => {
//     setEditingRowIndex(index);
//   };

//   const handleSaveEdit = (index, item) => {
//     const updatedData = [...gridData];
//     updatedData[index] = item;
//     setGridData(updatedData);
//     setEditingRowIndex(-1);
//     onEdit(updatedData[index]);
//   };

//   const handleDelete = (index) => {
//     const updatedData = [...gridData];
//     updatedData.splice(index, 1);
//     setGridData(updatedData);
//     onDelete(index);
//   };

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
//   };

//   const handleSaveNewItem = () => {
//     const updatedData = [...gridData];
//     updatedData.push(newItem);
//     setGridData(updatedData);
//     setNewItem({}); // reset the new item state
//     setEditingRowIndex(-1);
//   };

//   return (
//     <div className="container p-0">
//       <div className="">
//         <table className="">
//           <thead>
//             <tr>
//               <th>
//                 <button className="action-button Add" onClick={handleAdd}>
//                   إضافه بيانات
//                 </button>
//               </th>
//               {tableHeaders.map((header, index) => (
//                 <th key={index}>{header}</th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {gridData.map((item, index) => (
//               <tr key={index}>
//                 <td className="Actions">
//                   <div className="action-cont">
//                     {editingRowIndex === index ? (
//                       <button
//                         className="action-button Save"
//                         onClick={() => handleSaveEdit(index, item)}
//                       >
//                         حفظ
//                       </button>
//                     ) : (
//                       <>
//                         <button
//                           className="action-button Edit"
//                           onClick={() => handleEdit(index)}
//                         >
//                           تعديل
//                         </button>
//                         <button
//                           className="action-button Delete"
//                           onClick={() => handleDelete(index)}
//                         >
//                           حذف
//                         </button>
//                       </>
//                     )}
//                   </div>
//                 </td>
//                 {tableHeaders.map((header, headerIndex) => (
//                   <td key={headerIndex}>
//                     {editingRowIndex === index ? (
//                       header === "الشهر" || header === "month" ? (
//                         <select
//                           value={item[header]}
//                           onChange={(e) => {
//                             const updatedItem = {
//                               ...item,
//                               [header]: e.target.value,
//                             };
//                             const updatedData = [...gridData];
//                             updatedData[index] = updatedItem;
//                             setGridData(updatedData);
//                           }}
//                         >
//                           <option value="">إختر الشهر</option>
//                           <option value="January">يناير</option>
//                           <option value="February">فبراير</option>
//                           <option value="March">مارس</option>
//                           <option value="April">إبريل</option>
//                           <option value="May">مايو</option>
//                           <option value="June">يونيو</option>
//                           <option value="July">يوليو</option>
//                           <option value="August">أغسطس</option>
//                           <option value="September">سبتمبر</option>
//                           <option value="October">أكتوبر</option>
//                           <option value="November">نوفمبر</option>
//                           <option value="December">ديسمبر</option>
//                         </select>
//                       ) : (
//                         <input
//                           type="text"
//                           value={item[header]}
//                           onChange={(e) => {
//                             if (header !== "id" && header !== "الكود") {
//                               const updatedItem = {
//                                 ...item,
//                                 [header]: e.target.value,
//                               };
//                               const updatedData = [...gridData];
//                               updatedData[index] = updatedItem;
//                               setGridData(updatedData);
//                             }
//                           }}
//                         />
//                       )
//                     ) : (
//                       item[header]
//                     )}
//                   </td>
//                 ))}
//               </tr>
//             ))}
//             {editingRowIndex === gridData.length ? (
//               <tr>
//                 {tableHeaders.map((header, headerIndex) => (
//                   <td key={headerIndex}>
//                     {header !== "id" && header !== "الكود" ? (
//                       header === "الشهر" || header === "month" ? (
//                         <select
//                           value={newItem[header]}
//                           onChange={(e) => {
//                             setNewItem({ ...newItem, [header]: e.target.value });
//                           }}
//                         >
//                          <option value="">إختر الشهر</option>
//                           <option value="January">يناير</option>
//                           <option value="February">فبراير</option>
//                           <option value="March">مارس</option>
//                           <option value="April">إبريل</option>
//                           <option value="May">مايو</option>
//                           <option value="June">يونيو</option>
//                           <option value="July">يوليو</option>
//                           <option value="August">أغسطس</option>
//                           <option value="September">سبتمبر</option>
//                           <option value="October">أكتوبر</option>
//                           <option value="November">نوفمبر</option>
//                           <option value="December">ديسمبر</option>
//                         </select>
//                       ) : (
//                         <input
//                           type="text"
//                           value={newItem[header]}
//                           onChange={(e) => {
//                             setNewItem({ ...newItem, [header]: e.target.value });
//                           }}
//                         />
//                       )
//                     ) : (
//                       <span>{newItem[header] || ""}</span>
//                     )}
//                   </td>
//                 ))}
//                 <td className="Actions">
//                   <button
//                     className="action-button Save"
//                     onClick={handleSaveNewItem}
//                   >
//                     حفظ
//                   </button>
//                 </td>
//               </tr>
//             ) : null}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Grid;

// import React, { useState, useEffect } from "react";

// const Grid = ({ data, onEdit, onDelete }) => {
//   const [gridData, setGridData] = useState([]);
//   const [tableHeaders, setTableHeaders] = useState([]);
//   const [editingRowIndex, setEditingRowIndex] = useState(-1);
//   const [newItem, setNewItem] = useState({});

//   useEffect(() => {
//     setGridData(data);
//     setTableHeaders(Object.keys(data[0]));
//   }, [data]);

//   const handleEdit = (index) => {
//     setEditingRowIndex(index);
//   };

//   const handleSaveEdit = (index, item) => {
//     const updatedData = [...gridData];
//     updatedData[index] = item;
//     setGridData(updatedData);
//     setEditingRowIndex(-1);
//     onEdit(updatedData[index]);
//   };

//   const handleDelete = (index) => {
//     const updatedData = [...gridData];
//     updatedData.splice(index, 1);
//     setGridData(updatedData);
//     onDelete(index);
//   };

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
//   };

//   const handleSaveNewItem = () => {
//     const updatedData = [...gridData];
//     updatedData.push(newItem);
//     setGridData(updatedData);
//     setNewItem({}); // reset the new item state
//     setEditingRowIndex(-1);
//   };

//   const monthOptions = [
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

//   return (
//     <div className="container p-0">
//       <div className="">
//         <table className="">
//           <thead>
//             <tr>
//               <th>
//                 <button className="action-button Add" onClick={handleAdd}>
//                   إضافه بيانات
//                 </button>
//               </th>
//               {tableHeaders.map((header, index) => (
//                 <th key={index}>{header}</th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {gridData.map((item, index) => (
//               <tr key={index}>
//                 <td className="Actions">
//                   <div className="action-cont">
//                     {editingRowIndex === index ? (
//                       <button
//                         className="action-button Save"
//                         onClick={() => handleSaveEdit(index, item)}
//                       >
//                         حفظ
//                       </button>
//                     ) : (
//                       <>
//                         <button
//                           className="action-button Edit"
//                           onClick={() => handleEdit(index)}
//                         >
//                           تعديل
//                         </button>
//                         <button
//                           className="action-button Delete"
//                           onClick={() => handleDelete(index)}
//                         >
//                           حذف
//                         </button>
//                       </>
//                     )}
//                   </div>
//                 </td>
//                 {tableHeaders.map((header, headerIndex) => (
//                   <td key={headerIndex}>
//                     {editingRowIndex === index ? (
//                       header === "الشهر" || header === "month" ? (
//                         <select
//                           value={item[header]}
//                           onChange={(e) => {
//                             const updatedItem = {
//                               ...item,
//                               [header]: e.target.value,
//                             };
//                             const updatedData = [...gridData];
//                             updatedData[index] = updatedItem;
//                             setGridData(updatedData);
//                           }}
//                         >
//                           <option value="">إختر الشهر</option>
//                           {monthOptions.map((option) => (
//                             <option key={option.value} value={option.label}>
//                               {option.label}
//                             </option>
//                           ))}
//                         </select>
//                       ) : (
//                         <input
//                           type="text"
//                           value={item[header]}
//                           onChange={(e) => {
//                             if (header !== "id" && header !== "الكود") {
//                               const updatedItem = {
//                                 ...item,
//                                 [header]: e.target.value,
//                               };
//                               const updatedData = [...gridData];
//                               updatedData[index] = updatedItem;
//                               setGridData(updatedData);
//                             }
//                           }}
//                         />
//                       )
//                     ) : (
//                       item[header]
//                     )}
//                   </td>
//                 ))}
//               </tr>
//             ))}
//             {editingRowIndex === gridData.length ? (
//               <tr>
//                 {tableHeaders.map((header, headerIndex) => (
//                   <td key={headerIndex}>
//                     {header !== "id" && header !== "الكود" ? (
//                       header === "الشهر" || header === "month" ? (
//                         <select
//                           value={newItem[header]}
//                           onChange={(e) => {
//                             setNewItem({
//                               ...newItem,
//                               [header]: e.target.value,
//                             });
//                           }}
//                         >
//                           <option value="">إختر الشهر</option>
//                           {monthOptions.map((option) => (
//                             <option key={option.value} value={option.label}>
//                               {option.label}
//                             </option>
//                           ))}
//                         </select>
//                       ) : (
//                         <input
//                           type="text"
//                           value={newItem[header]}
//                           onChange={(e) => {
//                             setNewItem({
//                               ...newItem,
//                               [header]: e.target.value,
//                             });
//                           }}
//                         />
//                       )
//                     ) : (
//                       <span>{newItem[header] || ""}</span>
//                     )}
//                   </td>
//                 ))}
//                 <td className="Actions">
//                   <button
//                     className="action-button Save"
//                     onClick={handleSaveNewItem}
//                   >
//                     حفظ
//                   </button>
//                 </td>
//               </tr>
//             ) : null}
//           </tbody>
//         </table>
//         <div className="table-Navigation container-fliud col-12 row">
//           <p>الصفحه</p>
//           <div>
//             <i className="fas fa-angle-left previous"></i>
//             <input>{currentPageNumber}</input>
//             <p>/</p>
//             <input>{totalPagesNumber}</input>
//             <i className="fas fa-angle-right next"></i>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Grid;

import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";

const Grid = ({ data, onEdit, onDelete }) => {
  const [gridData, setGridData] = useState([]);
  const [tableHeaders, setTableHeaders] = useState([]);
  const [editingRowIndex, setEditingRowIndex] = useState(-1);
  const [newItem, setNewItem] = useState({});
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [totalPagesNumber, setTotalPagesNumber] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    setGridData(data);
    setTableHeaders(Object.keys(data[0]));
    setTotalPagesNumber(Math.ceil(data.length / rowsPerPage));
  }, [data, rowsPerPage]);

  const handleEdit = (index) => {
    setEditingRowIndex(index);
  };

  const handleSaveEdit = (index, item) => {
    const updatedData = [...gridData];
    updatedData[index] = item;
    setGridData(updatedData);
    setEditingRowIndex(-1);
    onEdit(updatedData[index]);
  };

  const handleDelete = (index) => {
    const updatedData = [...gridData];
    updatedData.splice(index, 1);
    setGridData(updatedData);
    onDelete(index);
    setTotalPagesNumber(Math.ceil(updatedData.length / rowsPerPage));
  };

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
    updatedData.push(newItem);
    setGridData(updatedData);
    setNewItem(newItem);
    setEditingRowIndex(gridData.length);
    setTotalPagesNumber(Math.ceil(updatedData.length / rowsPerPage));
  };

  const handleSaveNewItem = () => {
    const updatedData = [...gridData];
    updatedData.push(newItem);
    setGridData(updatedData);
    setNewItem({}); // reset the new item state
    setEditingRowIndex(-1);
    setTotalPagesNumber(Math.ceil(updatedData.length / rowsPerPage));
  };

  const handlePageChange = (direction) => {
    if (direction === "prev" && currentPageNumber > 1) {
      setCurrentPageNumber(currentPageNumber - 1);
    } else if (direction === "next" && currentPageNumber < totalPagesNumber) {
      setCurrentPageNumber(currentPageNumber + 1);
    }
  };

  const monthOptions = [
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

  const startIndex = (currentPageNumber - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedData = gridData.slice(startIndex, endIndex);

  return (
    <div className="container grid p-0">
      <div className="">
        <table className="">
          <thead>
            <tr>
              <th>
                <button className="action-button Add" onClick={handleAdd}>
                  إضافه
                </button>
              </th>
              {tableHeaders.map((header, index) => (
                <th key={index}>{header}</th>
              ))}
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
                        onClick={() => handleSaveEdit(startIndex + index, item)}
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
                {tableHeaders.map((header, headerIndex) => (
                  <td key={headerIndex}>
                    {editingRowIndex === startIndex + index ? (
                      header === "الشهر" || header === "month" ? (
                        <select
                          value={item[header]}
                          onChange={(e) => {
                            const updatedItem = {
                              ...item,
                              [header]: e.target.value,
                            };
                            const updatedData = [...gridData];
                            updatedData[startIndex + index] = updatedItem;
                            setGridData(updatedData);
                          }}
                        >
                          <option value="">إختر الشهر</option>
                          {monthOptions.map((option) => (
                            <option key={option.value} value={option.label}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type="text"
                          value={item[header]}
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
                      )
                    ) : (
                      item[header]
                    )}
                  </td>
                ))}
              </tr>
            ))}
            {editingRowIndex === gridData.length ? (
              <tr>
                {tableHeaders.map((header, headerIndex) => (
                  <td key={headerIndex}>
                    {header !== "id" && header !== "الكود" ? (
                      header === "الشهر" || header === "month" ? (
                        <select
                          value={newItem[header]}
                          onChange={(e) => {
                            setNewItem({
                              ...newItem,
                              [header]: e.target.value,
                            });
                          }}
                        >
                          <option value="">إختر الشهر</option>
                          {monthOptions.map((option) => (
                            <option key={option.value} value={option.label}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type="text"
                          value={newItem[header]}
                          onChange={(e) => {
                            setNewItem({
                              ...newItem,
                              [header]: e.target.value,
                            });
                          }}
                        />
                      )
                    ) : (
                      <span>{newItem[header] || ""}</span>
                    )}
                  </td>
                ))}
                <td className="Actions">
                  <button
                    className="action-button Save"
                    onClick={handleSaveNewItem}
                  >
                    حفظ
                  </button>
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
      {gridData.length > rowsPerPage && (
          <div className="table-Navigation container-fliud col-12 bg-light row m-0">
            <div className="col-9 d-flex container">
              <span className="my-auto text-center">الصفحه</span>
              <div className="d-flex container">
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
  );
};

export default Grid;
