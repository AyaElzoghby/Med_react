// import React, { useState, useEffect } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faChevronRight,
//   faChevronLeft,
// } from "@fortawesome/free-solid-svg-icons";

// const Grid = ({ data = {}, onEdit, onDelete, Columns = [] }) => {
//   const [gridData, setGridData] = useState([]);
//   const [tableHeaders, setTableHeaders] = useState([]);
//   const [editingRowIndex, setEditingRowIndex] = useState(-1);
//   const [newItem, setNewItem] = useState({});
//   const [currentPageNumber, setCurrentPageNumber] = useState(1);
//   const [totalPagesNumber, setTotalPagesNumber] = useState(1);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [activeRow, setActiveRow] = useState({});

//   useEffect(() => {
//     if (data.data && data.data.length > 0) {
//       setGridData(data.data); // Initialize grid data

//       // Extract headers based on the specified Columns
//       const headers = data.data[0]
//         .filter((item) => Columns.includes(item.header)) // Keep only headers in Columns
//         .map((item) => item.header);

//       setTableHeaders(headers);
//       setTotalPagesNumber(Math.ceil(data.data.length / rowsPerPage));
//     }
//   }, [data, rowsPerPage, Columns]);

//   const handleEdit = (index) => {
//     const itemToEdit = gridData[index];
//     setEditingRowIndex(index);
//     setNewItem(itemToEdit);
//   };
//   const handleAdd = () => {
//     const updatedData = [...gridData];
//     const newRow = { ...activeRow }; // use activeRow as the new row
//     updatedData.push(newRow);
//     setGridData(updatedData);
//     setNewItem(newRow);
//     setEditingRowIndex(gridData.length - 1);
//     setTotalPagesNumber(Math.ceil(updatedData.length / rowsPerPage));
//   };

//   const handleSaveEdit = (index) => {
//     const updatedData = [...gridData];
//     updatedData[index] = newItem;
//     setGridData(updatedData);
//     setEditingRowIndex(-1);
//     onEdit(updatedData[index]);
//   };

//   const handleDelete = (index) => {
//     const updatedData = [...gridData];
//     updatedData.splice(index, 1);
//     setGridData(updatedData);
//     onDelete(index);
//     setTotalPagesNumber(Math.ceil(updatedData.length / rowsPerPage));
//   };

//   const handlePageChange = (direction) => {
//     if (direction === "prev" && currentPageNumber > 1) {
//       setCurrentPageNumber(currentPageNumber - 1);
//     } else if (direction === "next" && currentPageNumber < totalPagesNumber) {
//       setCurrentPageNumber(currentPageNumber + 1);
//     }
//   };

//   const startIndex = (currentPageNumber - 1) * rowsPerPage;
//   const endIndex = startIndex + rowsPerPage;
//   const paginatedData = gridData.slice(startIndex, endIndex);

//   return (
//     <div className="grid-component">
//       <div className="container grid p-0">
//         <table>
//           <thead>
//             <tr>
//               <th>
//                 <button
//                   className="action-button Save"
//                   onClick={() => handleAdd()}
//                 >
//                   اضافه
//                 </button>
//               </th>
//               {tableHeaders.map((header, index) => {
//                 // Find the caption for the current header
//                 const headerData = data.data[0].find(
//                   (item) => item.header === header
//                 );
//                 return (
//                   <th key={index}>
//                     {headerData ? headerData.caption : header}{" "}
//                   </th>
//                 );
//               })}
//             </tr>
//           </thead>
//           <tbody>
//             {paginatedData.forEach((row, index) => (
//               <tr key={index}>
//                 <td className="Actions"><div className="action-cont">
//                     {editingRowIndex === index ? (
//                       <button
//                         className="action-button Save"
//                         onClick={() => handleSaveEdit(index)}
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
//                   </div></td>
//                 {row.forEach((cell, cellIndex) => {
//                   if (tableHeaders.includes(cell.header)) {
//                     return <td key={cellIndex}>{editingRowIndex === index ? (
//                       <input
//                         // type={cell.type === "number" ? "number" : "text"}
//                         type={
//                           cell.type ==="button"
//                             ? "button"
//                             : cell.type === "dropdown"
//                             ? "select"
//                             : cell.type === "checkbox"
//                             ? "checkbox"
//                             : cell.type === "integer"
//                             ? "number"
//                             : "text"
//                         }
//                         value={newItem[cell.header]?.value || ""}
//                         onChange={(e) => {
//                           const updatedItem = {
//                             ...newItem,
//                             [cell.header]: {
//                               ...cell,
//                               value: e.target.value,
//                             },
//                           };
//                           setNewItem(updatedItem);
//                         }}
//                       />
//                     ) : (
//                       cell.value || ""
//                     )}</td>;
//                   }
//                   return null; // Don't render anything if the header is not included
//                 })}
//               </tr>
//             ))}
//           </tbody>
//           {/* <tbody>
//             {paginatedData.map((row, index) => (
//               <tr key={index}>
//                 <td className="Actions">
//                   <div className="action-cont">
//                     {editingRowIndex === index ? (
//                       <button
//                         className="action-button Save"
//                         onClick={() => handleSaveEdit(index)}
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
//                 {row.map((cell, cellIndex) => {
//                   if (tableHeaders.includes(cell.header)) {
//                     return (
//                       <td key={cellIndex}>
//                         {editingRowIndex === index ? (
//                           <input
//                             // type={cell.type === "number" ? "number" : "text"}
//                             type={
//                               cell.type ==="button"
//                                 ? "button"
//                                 : cell.type === "dropdown"
//                                 ? "select"
//                                 : cell.type === "checkbox"
//                                 ? "checkbox"
//                                 : cell.type === "integer"
//                                 ? "number"
//                                 : "text"
//                             }
//                             value={newItem[cell.header]?.value || ""}
//                             onChange={(e) => {
//                               const updatedItem = {
//                                 ...newItem,
//                                 [cell.header]: {
//                                   ...cell,
//                                   value: e.target.value,
//                                 },
//                               };
//                               setNewItem(updatedItem);
//                             }}
//                           />
//                         ) : (
//                           cell.value || ""
//                         )}
//                       </td>
//                     );
//                   }
//                   return null; // Don't render anything if the header is not included
//                 })}
//               </tr>
//             ))}
//           </tbody> */}
//         </table>
//         {gridData.length > rowsPerPage && (
//           <div className="table-navigation">
//             <FontAwesomeIcon
//               icon={faChevronLeft}
//               className="previous btn"
//               onClick={() => handlePageChange("prev")}
//             />
//             <span>
//               {currentPageNumber} / {totalPagesNumber}
//             </span>
//             <FontAwesomeIcon
//               icon={faChevronRight}
//               className="next btn"
//               onClick={() => handlePageChange("next")}
//             />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Grid;
// import React, { useState, useEffect } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faChevronRight,
//   faChevronLeft,
// } from "@fortawesome/free-solid-svg-icons";

// const Grid = ({ data = [], onEdit, onDelete, Columns = [] }) => {
//   const [gridData, setGridData] = useState([]);
//   const [tableHeaders, setTableHeaders] = useState([]);
//   const [editingRowIndex, setEditingRowIndex] = useState(-1);
//   const [newItem, setNewItem] = useState({});
//   const [currentPageNumber, setCurrentPageNumber] = useState(1);
//   const [totalPagesNumber, setTotalPagesNumber] = useState(1);
//   const [rowsPerPage, setRowsPerPage] = useState(10);

//   useEffect(() => {
//     const filteredData = gridData.filter((item) => {
//       setTableHeaders(
//         Object.keys(data.data[0]).filter((item) => {
//           return !Columns.find((excluedHeader) => excluedHeader == item);
//         })
//       );
//     });

//     setTableHeaders();
//     setTotalPagesNumber(Math.ceil(data.data.length / rowsPerPage));
//   }, [data, rowsPerPage, Columns]);

//   const handleEdit = (index) => {
//     const itemToEdit = gridData[index];
//     setEditingRowIndex(index);
//     setNewItem(itemToEdit);
//   };

//   const handleSaveEdit = (index) => {
//     const updatedData = [...gridData];
//     updatedData[index] = newItem;
//     setGridData(updatedData);
//     setEditingRowIndex(-1);
//     onEdit(updatedData[index]);
//   };

//   const handleDelete = (index) => {
//     const updatedData = [...gridData];
//     updatedData.splice(index, 1);
//     setGridData(updatedData);
//     onDelete(index);
//     setTotalPagesNumber(Math.ceil(updatedData.length / rowsPerPage));
//   };

//   const handlePageChange = (direction) => {
//     if (direction === "prev" && currentPageNumber > 1) {
//       setCurrentPageNumber(currentPageNumber - 1);
//     } else if (direction === "next" && currentPageNumber < totalPagesNumber) {
//       setCurrentPageNumber(currentPageNumber + 1);
//     }
//   };

//   const startIndex = (currentPageNumber - 1) * rowsPerPage;
//   const endIndex = startIndex + rowsPerPage;
//   const paginatedData = gridData.slice(startIndex, endIndex);

//   return (
//     <div className="grid-component">
//       <div className="container grid p-0">
//         <table>
//           <thead>
//             <tr>
//               <th>Actions</th>
//               {tableHeaders.map((headerObj, index) => (
//                 <th key={index}>{headerObj.caption}</th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {paginatedData.map((row, rowIndex) => (
//               <tr key={rowIndex}>
//                 <td className="Actions">
//                   <div className="action-cont">
//                     {editingRowIndex === rowIndex ? (
//                       <button
//                         className="action-button Save"
//                         onClick={() => handleSaveEdit(rowIndex)}
//                       >
//                         Save
//                       </button>
//                     ) : (
//                       <>
//                         <button
//                           className="action-button Edit"
//                           onClick={() => handleEdit(rowIndex)}
//                         >
//                           Edit
//                         </button>
//                         <button
//                           className="action-button Delete"
//                           onClick={() => handleDelete(rowIndex)}
//                         >
//                           Delete
//                         </button>
//                       </>
//                     )}
//                   </div>
//                 </td>
//                 {row.map((cell, cellIndex) => (
//                   <td key={cellIndex}>
//                     {editingRowIndex === rowIndex ? (
//                       cell.type === "button" ? (
//                         <button
//                           className="btn btn-info"
//                           onClick={() =>
//                             console.log(`Button clicked: ${cell.caption}`)
//                           }
//                         >
//                           {cell.caption}
//                         </button>
//                       ) : (
//                         <input
//                           type={cell.type === "number" ? "number" : "text"}
//                           value={cell.value || ""}
//                           onChange={(e) => {
//                             const updatedItem = {
//                               ...row[cellIndex],
//                               value: e.target.value,
//                             };
//                             const updatedData = [...gridData];
//                             updatedData[rowIndex][cellIndex] = updatedItem;
//                             setGridData(updatedData);
//                           }}
//                         />
//                       )
//                     ) : (
//                       cell.value || ""
//                     )}
//                   </td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         {gridData.length > rowsPerPage && (
//           <div className="table-navigation">
//             <FontAwesomeIcon
//               icon={faChevronLeft}
//               className="previous btn"
//               onClick={() => handlePageChange("prev")}
//             />
//             <span>
//               {currentPageNumber} / {totalPagesNumber}
//             </span>
//             <FontAwesomeIcon
//               icon={faChevronRight}
//               className="next btn"
//               onClick={() => handlePageChange("next")}
//             />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Grid;
/////////////////////////////////////////////////////////////////////////

// import React, { useState, useEffect } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons";

// const Grid = ({ data = [], onEdit, onDelete, Coulmns = [], dropList = [] }) => {
//   const [gridData, setGridData] = useState([]);
//   const [tableHeaders, setTableHeaders] = useState([]);
//   const [editingRowIndex, setEditingRowIndex] = useState(-1);
//   const [newItem, setNewItem] = useState({});
//   const [currentPageNumber, setCurrentPageNumber] = useState(1);
//   const [totalPagesNumber, setTotalPagesNumber] = useState(1);
//   const [rowsPerPage, setRowsPerPage] = useState(10);

//   useEffect(() => {
//     setGridData(data);
//     // setTableHeaders(Object.keys(data[0]).filter((item) => {
//     //   return Coulmns.find((excluedHeader) => excluedHeader === item);
//     // }));
//      setTableHeaders();
//     setTotalPagesNumber(Math.ceil(data.length / rowsPerPage));
//   }, [data, rowsPerPage]);

// //   const handleEdit = (index) => {
// //     setEditingRowIndex(index);
// //   };

// const handleEdit = (index) => {
//     const itemToEdit = gridData[index];
//     setEditingRowIndex(index);

//     // Assuming you have a way to set the new item state for editing
//     setNewItem(itemToEdit); // Populate the new item state with the selected item
//   };

//   const handleAdd = () => {
//     const updatedData = [...gridData];
//     const newItem = {};

//     tableHeaders.forEach((header) => {
//       if (header !== "id" && header !== "الكود") {
//         const field = data.find((field) => field.field === header);
//         if (field) {
//           if (field.type === "button") {
//             newItem[header] = (
//               <button onClick={() => console.log(`Button clicked: ${header}`)}>
//                 {field.caption}
//               </button>
//             );
//           } else if (field.type === "dropdown") {
//             newItem[header] = (
//               <select>
//                 {field.options.map((option) => (
//                   <option key={option} value={option}>
//                     {option}
//                   </option>
//                 ))}
//               </select>
//             );
//           } else if (field.type === "checkbox") {
//             newItem[header] = (
//               <input
//                 type="checkbox"
//                 checked={false} // Default unchecked
//                 onChange={(e) => {
//                   const updatedData = [...gridData];
//                   updatedData[editingRowIndex][header] = e.target.checked;
//                   setGridData(updatedData);
//                 }}
//               />
//             );
//           } else if (field.type === "integer") {
//             newItem[header] = (
//               <input
//                 type="number"
//                 value={0} // Default value
//                 onChange={(e) => {
//                   const updatedData = [...gridData];
//                   updatedData[editingRowIndex][header] = parseInt(e.target.value);
//                   setGridData(updatedData);
//                 }}
//               />
//             );
//           } else {
//             newItem[header] = (
//               <input
//                 type="text"
//                 value=""
//                 onChange={(e) => {
//                   const updatedData = [...gridData];
//                   updatedData[editingRowIndex][header] = e.target.value;
//                   setGridData(updatedData);
//                 }}
//               />
//             );
//           }
//         }
//       }
//     });

//     updatedData.push(newItem);
//     setGridData(updatedData);
//     setNewItem(newItem);
//     setEditingRowIndex(updatedData.length - 1);
//     setTotalPagesNumber(Math.ceil(updatedData.length / rowsPerPage));
//   };

// //   const handleAdd = () => {
// //     const updatedData = [...gridData, {}];
// //     setGridData(updatedData);
// //     setNewItem(updatedData[updatedData.length - 1]);
// //     setEditingRowIndex(updatedData.length - 1);
// //     setTotalPagesNumber(Math.ceil(updatedData.length / rowsPerPage));
// //   };
// //   const handleAdd = () => {
// //         const updatedData = [...gridData];
// //         const newItem = {};
// //         tableHeaders.forEach((header) => {
// //           if (header !== "id" && header !== "الكود") {
// //             const field = data.find((field) => field.field === header);
// //             if (field) {
// //               if (field.type === "button") {
// //                 newItem[header] = <button onClick={() => console.log(`Button clicked: ${header}`)}>{field.caption}</button>;
// //               } else if (field.type === "dropdown") {
// //                 newItem[header] = <select>
// //                   {field.options.map((option) => <option value={option}>{option}</option>)}
// //                 </select>;
// //               } else if (field.type === "checkbox") {
// //                 newItem[header] = <input type="checkbox" checked={gridData.find((item) => item[header])} onChange={(e) => {
// //                   const updatedData = [...gridData];
// //                   updatedData[editingRowIndex][header] = e.target.checked;
// //                   setGridData(updatedData);
// //                 }} />;
// //               } else if (field.type === "integer") {
// //                 newItem[header] = <input type="number" value={gridData.find((item) => item[header])} onChange={(e) => {
// //                   const updatedData = [...gridData];
// //                   updatedData[editingRowIndex][header] = parseInt(e.target.value);
// //                   setGridData(updatedData);
// //                 }} />;
// //               } else {
// //                 newItem[header] = <input type="text" value={gridData.find((item) => item[header])} onChange={(e) => {
// //                   const updatedData = [...gridData];
// //                   updatedData[editingRowIndex][header] = e.target.value;
// //                   setGridData(updatedData);
// //                 }} />;
// //               }
// //             }
// //           }
// //         });

//   const handleSaveEdit = (index, item) => {
//     const updatedData = [...gridData];
//     updatedData[index] = item;
//     setGridData(updatedData);
//     setEditingRowIndex(-1);
//     onEdit(updatedData[index]);
//   };

//   const handleSaveNewItem = () => {
//     const updatedData = [...gridData];
//     updatedData[updatedData.length - 1] = newItem;
//     setGridData(updatedData);
//     setNewItem({}); // reset the new item state
//     setEditingRowIndex(-1);
//     setTotalPagesNumber(Math.ceil(updatedData.length / rowsPerPage));
//   };

//   const handleDelete = (index) => {
//     const updatedData = [...gridData];
//     updatedData.splice(index, 1);
//     setGridData(updatedData);
//     onDelete(index);
//     setTotalPagesNumber(Math.ceil(updatedData.length / rowsPerPage));
//   };

//   const handlePageChange = (direction) => {
//     if (direction === "prev" && currentPageNumber > 1) {
//       setCurrentPageNumber(currentPageNumber - 1);
//     } else if (direction === "next" && currentPageNumber < totalPagesNumber) {
//       setCurrentPageNumber(currentPageNumber + 1);
//     }
//   };

//   const startIndex = (currentPageNumber - 1) * rowsPerPage;
//   const endIndex = startIndex + rowsPerPage;
//   const paginatedData = gridData.slice(startIndex, endIndex);

//   return (
//     <div className="grid-component">
//       <div className="container grid p-0">
//         <table>
//           <thead>
//             <tr>
//               <th>
//                 <button className="action-button Add" onClick={handleAdd}>
//                   إضAFE
//                 </button>
//               </th>
//               {tableHeaders.map((header, index) => (
//                 <th key={index}>{header}</th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {paginatedData.map((item, index) => (
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
//                       <input
//                         type={
//                           data.find((field) => field.field === header).type ===
//                           "button"
//                             ? "button"
//                             : data.find((field) => field.field === header).type ===
//                               "dropdown"
//                             ? "select"
//                             : data.find((field) => field.field === header).type ===
//                               "checkbox"
//                             ? "checkbox"
//                             : data.find((field) => field.field === header).type ===
//                               "integer"
//                             ? "number"
//                             : "text"
//                         }
//                         value={item[header]}
//                         onChange={(e) => {
//                           if (
//                             data.find((field) => field.field === header).type ===
//                             "dropdown"
//                           ) {
//                             const updatedItem = {
//                               ...item,
//                               [header]: e.target.value,
//                             };
//                             const updatedData = [...gridData];
//                             updatedData[index] = updatedItem;
//                             setGridData(updatedData);
//                           } else if (
//                             data.find((field) => field.field === header).type ===
//                             "checkbox"
//                           ) {
//                             const updatedItem = {
//                               ...item,
//                               [header]: e.target.checked,
//                             };
//                             const updatedData = [...gridData];
//                             updatedData[index] = updatedItem;
//                             setGridData(updatedData);
//                           } else if (
//                             data.find((field) => field.field === header).type ===
//                             "integer"
//                           ) {
//                             const updatedItem = {
//                               ...item,
//                               [header]: parseInt(e.target.value),
//                             };
//                             const updatedData = [...gridData];
//                             updatedData[index] = updatedItem;
//                             setGridData(updatedData);
//                           } else {
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
//           </tbody>
//         </table>
//         {gridData.length > rowsPerPage && (
//           <div className="table-Navigation container-fliud col-12 bg-light row m-0">
//             <div className="col-9 d-flex container p-0 m-0">
//               <div className="d-flex container p-0 m-0">
//                 <span className="my-auto text-center">
//                   <b>الصفحه</b>
//                 </span>
//                 <FontAwesomeIcon
//                   icon={faChevronRight}
//                   className="next btn my-auto"
//                   onClick={() => handlePageChange("next")}
//                 />
//                 <input value={currentPageNumber} />
//                 <p className="my-auto">/</p>
//                 <input value={totalPagesNumber} />
//                 <FontAwesomeIcon
//                   icon={faChevronLeft}
//                   className="previous btn my-auto"
//                   onClick={() => handlePageChange("prev")}
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

/////////////////////////////////////////////////////////////////////////////////////

import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons";

const Grid = ({ data = [], onEdit, onDelete, Coulmns = [] }) => {
    const [gridData, setGridData] = useState([]);
    const [tableHeaders, setTableHeaders] = useState([]);
    const [editingRowIndex, setEditingRowIndex] = useState(-1);
    const [newItem, setNewItem] = useState({});
    const [currentPageNumber, setCurrentPageNumber] = useState(1);
    const [totalPagesNumber, setTotalPagesNumber] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    useEffect(() => {
      setGridData(data.data);
      setTableHeaders(gridData[0].filter((item) => {
        return Coulmns.find((excluedHeader) => excluedHeader === item);
      }));
      setTotalPagesNumber(Math.ceil(data.length / rowsPerPage));
    }, [data, rowsPerPage]);

    const handleEdit = (index) => {
      const itemToEdit = gridData[index];
      setEditingRowIndex(index);
      setNewItem(itemToEdit);
    };

    const handleSaveEdit = (index, item) => {
      const updatedData = [...gridData];
      updatedData[index] = item;
      setGridData(updatedData);
      setEditingRowIndex(-1);
      onEdit(updatedData[index]);
    };

    const handleSaveNewItem = () => {
      const updatedData = [...gridData];
      updatedData[updatedData.length - 1] = newItem;
      setGridData(updatedData);
      setNewItem({}); // reset the new item state
      setEditingRowIndex(-1);
      setTotalPagesNumber(Math.ceil(updatedData.length / rowsPerPage));
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
                const field = data.find((field) => field.field === header);
                if (field) {
                  if (field.type === "button") {
                    newItem[header] = <button onClick={() => console.log(`Button clicked: ${header}`)}>{field.caption}</button>;
                  } else if (field.type === "dropdown") {
                    newItem[header] = <select>
                      {field.options.map((option) => <option value={option}>{option}</option>)}
                    </select>;
                  } else if (field.type === "checkbox") {
                    newItem[header] = <input type="checkbox" checked={gridData.find((item) => item[header])} onChange={(e) => {
                      const updatedData = [...gridData];
                      updatedData[editingRowIndex][header] = e.target.checked;
                      setGridData(updatedData);
                    }} />;
                  } else if (field.type === "integer") {
                    newItem[header] = <input type="number" value={gridData.find((item) => item[header])} onChange={(e) => {
                      const updatedData = [...gridData];
                      updatedData[editingRowIndex][header] = parseInt(e.target.value);
                      setGridData(updatedData);
                    }} />;
                  } else {
                    newItem[header] = <input type="text" value={gridData.find((item) => item[header])} onChange={(e) => {
                      const updatedData = [...gridData];
                      updatedData[editingRowIndex][header] = e.target.value;
                      setGridData(updatedData);
                    }} />;
                  }
                }
              }
            });

    const handlePageChange = (direction) => {
      if (direction === "prev" && currentPageNumber > 1) {
        setCurrentPageNumber(currentPageNumber - 1);
      } else if (direction === "next" && currentPageNumber < totalPagesNumber) {
        setCurrentPageNumber(currentPageNumber + 1);
      }
    };

    const startIndex = (currentPageNumber - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const paginatedData = gridData.slice(startIndex, endIndex);

    return (
      <div className="grid-component">
        <div className="container grid p-0">
          <table>
            <thead>
              <tr>
                <th>
                  <button className="action-button Add" onClick={handleAdd}>اضافه
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
                      {editingRowIndex === index ? (
                        <button
                          className="action-button Save"
                          onClick={() => handleSaveEdit(index, item)}
                        >
                          حفظ
                        </button>
                      ) : (
                        <>
                          <button
                            className="action-button Edit"
                            onClick={() => handleEdit(index)}
                          >
                            تعديل
                          </button>
                          <button
                            className="action-button Delete"
                            onClick={() => handleDelete(index)}
                          >
                            حذف
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                  {tableHeaders.map((header, headerIndex) => (
                    <td key={headerIndex}>
                      {editingRowIndex === index ? (
                        <input
                          type={
                            Coulmns.find((field) => field === header).type ===
                            "button"
                              ? "button"
                              : Coulmns.find((field) => field === header).type ===
                                "dropdown"
                              ? "select"
                              : Coulmns.find((field) => field === header).type ===
                                "checkbox"
                              ? "checkbox"
                              : Coulmns.find((field) => field === header).type ===
                                "integer"
                              ? "number"
                              : "text"
                          }
                          value={item[header]}
                          onChange={(e) => {
                            if (
                              Coulmns.find((field) => field === header).type ===
                              "dropdown"
                            ) {
                              const updatedItem = {
                                ...item,
                                [header]: e.target.value,
                              };
                              const updatedData = [...gridData];
                              updatedData[index] = updatedItem;
                              setGridData(updatedData);
                            } else if (
                              Coulmns.find((field) => field === header).type ===
                              "checkbox"
                            ) {
                              const updatedItem = {
                                ...item,
                                [header]: e.target.checked,
                              };
                              const updatedData = [...gridData];
                              updatedData[index] = updatedItem;
                              setGridData(updatedData);
                            } else if (
                              Coulmns.find((field) => field === header).type ===
                              "integer"
                            ) {
                              const updatedItem = {
                                ...item,
                                [header]: parseInt(e.target.value),
                              };
                              const updatedData = [...gridData];
                              updatedData[index] = updatedItem;
                              setGridData(updatedData);
                            } else {
                              const updatedItem = {
                                ...item,
                                [header]: e.target.value,
                              };
                              const updatedData = [...gridData];
                              updatedData[index] = updatedItem;
                              setGridData(updatedData);
                            }
                          }}
                        />
                      ) : (
                        item[header]
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {gridData.length > rowsPerPage && (
            <div className="table-Navigation container-fliud col-12 bg-light row m-0">
              <div className="col-9 d-flex container p-0 m-0">
                <div className="d-flex container p-0 m-0">
                  <span className="my-auto text-center">
                    <b>الصفحه</b>
                  </span>
                  <FontAwesomeIcon
                    icon={faChevronRight}
                    className="next btn my-auto"
                    onClick={() => handlePageChange("next")}
                  />
                  <input value={currentPageNumber} />
                  <p className="my-auto">/</p>
                  <input value={totalPagesNumber} />
                  <FontAwesomeIcon
                    icon={faChevronLeft}
                    className="previous btn my-auto"
                    onClick={() => handlePageChange("prev")}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
};
};
  export default Grid
