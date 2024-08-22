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
//       newItem[header] = "";
//     });
//     newItem.id = gridData.length + 1;
//     updatedData.push(newItem);
//     setGridData(updatedData);
//     setNewItem({}); // reset the new item state
//   };

//   return (
//     <div className="container p-0">
//       <div className="">
//         <table className="">
//           <thead>
//             <tr>
//               {tableHeaders.map((header, index) => (
//                 <th key={index}>{header}</th>
//               ))}
//               <th>
//                 <button className="action-button Add" onClick={handleAdd}>
//                   Add Data
//                 </button>
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {gridData.map((item, index) => (
//               <tr key={index}>
//                 {tableHeaders.map((header, headerIndex) => (
//                   <td key={headerIndex}>
//                     {editingRowIndex === index ? (
//                       <input
//                         type="text"
//                         value={item[header]}
//                         onChange={(e) => {
//                           const updatedItem = {
//                             ...item,
//                             [header]: e.target.value,
//                           };
//                           const updatedData = [...gridData];
//                           updatedData[index] = updatedItem;
//                           setGridData(updatedData);
//                         }}
//                       />
//                     ) : (
//                       item[header]
//                     )}
//                   </td>
//                 ))}
//                 <td className="Actions">
//                     <div className="action-cont">
//                     {editingRowIndex === index ? (
//                     <button
//                       className="action-button Save"
//                       onClick={() => handleSaveEdit(index, item)}
//                     >
//                       Save
//                     </button>
//                   ) : (
//                     <>
//                       <button
//                         className="action-button Edit"
//                         onClick={() => handleEdit(index)}
//                       >
//                         Edit
//                       </button>
//                       <button
//                         className="action-button Delete"
//                         onClick={() => handleDelete(index)}
//                       >
//                         Delete
//                       </button>
//                     </>
//                   )}
//                     </div>
//                 </td>
//               </tr>
//             ))}
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
//       if (header !== "id") {
//         newItem[header] = "";
//       }
//     });
//     newItem.id = gridData.length + 1;
//     updatedData.push(newItem);
//     setGridData(updatedData);
//     setNewItem(newItem);
//   };

//   const handleSaveNewItem = () => {
//     const updatedData = [...gridData];
//     updatedData.push(newItem);
//     setGridData(updatedData);
//     setNewItem({}); // reset the new item state
//   };

//   return (
//     <div className="container p-0">
//       <div className="">
//         <table className="">
//           <thead>
//             <tr>
//               {tableHeaders.map((header, index) => (
//                 <th key={index}>{header}</th>
//               ))}
//               <th>
//                 <button className="action-button Add" onClick={() => setEditingRowIndex(gridData.length)}>
//                   Add Data
//                 </button>
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {gridData.map((item, index) => (
//               <tr key={index}>
//                 {tableHeaders.map((header, headerIndex) => (
//                   <td key={headerIndex}>
//                     {editingRowIndex === index ? (
//                       <input
//                         type="text"
//                         value={item[header]}
//                         onChange={(e) => {
//                           if (header !== "id") {
//                             const updatedItem = { ...item, [header]: e.target.value };
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
//                 <td className="Actions">
//                   {editingRowIndex === index ? (
//                     <button
//                       className="action-button Save"
//                       onClick={() => handleSaveEdit(index, item)}
//                     >
//                       Save
//                     </button>
//                   ) : (
//                     <>
//                       <button
//                         className="action-button Edit"
//                         onClick={() => handleEdit(index)}
//                       >
//                         Edit
//                       </button>
//                       <button
//                         className="action-button Delete"
//                         onClick={() => handleDelete(index)}
//                       >
//                         Delete
//                       </button>
//                     </>
//                   )}
//                 </td>
//               </tr>
//             ))}
//             {editingRowIndex === gridData.length ? (
//               <tr>
//                 {tableHeaders.map((header, headerIndex) => (
//                   <td key={headerIndex}>
//                     {header !== "id" ? (
//                       <input
//                         type="text"
//                         value={newItem[header]}
//                         onChange={(e) => {
//                           setNewItem({ ...newItem, [header]: e.target.value });
//                         }}
//                       />
//                     ) : (
//                       <span>{newItem.id}</span>
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

import React, { useState, useEffect } from "react";

const Grid = ({ data, onEdit, onDelete }) => {
  const [gridData, setGridData] = useState([]);
  const [tableHeaders, setTableHeaders] = useState([]);
  const [editingRowIndex, setEditingRowIndex] = useState(-1);
  const [newItem, setNewItem] = useState({});

  useEffect(() => {
    setGridData(data);
    setTableHeaders(Object.keys(data[0]));
  }, [data]);

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
  };

  const handleAdd = () => {
    const updatedData = [...gridData];
    const newItem = {};
    tableHeaders.forEach((header) => {
      if (header !== "id") {
        newItem[header] = "";
      }
    });
    newItem.id = JSON.parse(JSON.stringify(data)).length + 1;
    updatedData.push(newItem);
    setGridData(updatedData);
    setNewItem(newItem);
    setEditingRowIndex(gridData.length);
  };

  const handleSaveNewItem = () => {
    const updatedData = [...gridData];
    updatedData.push(newItem);
    setGridData(updatedData);
    setNewItem({}); // reset the new item state
    setEditingRowIndex(-1);
  };

  return (
    <div className="container p-0">
      <div className="">
        <table className="">
          <thead>
            <tr>
              {tableHeaders.map((header, index) => (
                <th key={index}>{header}</th>
              ))}
              <th>
                <button className="action-button Add" onClick={handleAdd}>
                  Add Data
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {gridData.map((item, index) => (
              <tr key={index}>
                {tableHeaders.map((header, headerIndex) => (
                  <td key={headerIndex}>
                    {editingRowIndex === index ? (
                      <input
                        type="text"
                        value={item[header]}
                        onChange={(e) => {
                          if (header !== "id") {
                            const updatedItem = { ...item, [header]: e.target.value };
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
                <td className="Actions">
                  {editingRowIndex === index ? (
                    <button
                      className="action-button Save"
                      onClick={() => handleSaveEdit(index, item)}
                    >
                      Save
                    </button>
                  ) : (
                    <>
                      <button
                        className="action-button Edit"
                        onClick={() => handleEdit(index)}
                      >
                        Edit
                      </button>
                      <button
                        className="action-button Delete"
                        onClick={() => handleDelete(index)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
            {editingRowIndex === gridData.length ? (
              <tr>
                {tableHeaders.map((header, headerIndex) => (
                  <td key={headerIndex}>
                    {header !== "id" ? (
                      <input
                        type="text"
                        value={newItem[header]}
                        onChange={(e) => {
                          setNewItem({ ...newItem, [header]: e.target.value });
                        }}
                      />
                    ) : (
                      <span>{newItem.id}</span>
                    )}
                  </td>
                ))}
                <td className="Actions">
                  <button
                    className="action-button Save"
                    onClick={handleSaveNewItem}
                  >
                    Save
                  </button>
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Grid;