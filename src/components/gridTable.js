import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";

const Grid = ({ data, onEdit, onDelete, Columns = [] }) => {
  const [gridData, setGridData] = useState(data.data);
  const [tableHeaders, setTableHeaders] = useState([]);
  const [editingRowIndex, setEditingRowIndex] = useState(-1);
  const [newItem, setNewItem] = useState({});
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [totalPagesNumber, setTotalPagesNumber] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [editedData, setEditedData] = useState({});

  const startIndex = (currentPageNumber - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedData = gridData.slice(startIndex, endIndex);

  useEffect(() => {
    setGridData(data.data);
    const headers = data.data[0]
      .filter((item) => Columns.includes(item.header))
      .map((item) => item.header);
    setTableHeaders(headers);
    setTotalPagesNumber(Math.ceil(gridData.length / rowsPerPage));
    if (Object.keys(editedData).length > 0) {
      const updatedData = [...gridData];
      Object.keys(editedData).forEach((key) => {
        updatedData[key] = editedData[key];
      });
      setGridData(updatedData);
      setEditedData({}); // Clear editedData state
    }
  }, [data, rowsPerPage, Columns, editedData]);

  const handleEdit = (index) => {
    setEditingRowIndex(index);
  };

  // const handleSaveEdit = (index, item) => {
  //   const updatedData = [...gridData];
  //   updatedData[index] = item;
  //   setGridData(updatedData);
  //   setEditingRowIndex(-1);
  //   onEdit(updatedData[index]);
  // };

  const handleSaveEdit = (index, item) => {
    const updatedData = [...gridData];
    updatedData[index] = item;
    setEditedData({ ...editedData, [index]: item }); // Update editedData state
    setGridData(updatedData);
    setEditingRowIndex(-1); // Reset editingRowIndex to -1
    onEdit(updatedData[index]);
  };

  // const handleEdit = (index) => {
  //   setEditingRowIndex(index);
  // };

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

    setNewItem(newItem);
    setEditingRowIndex(gridData.length);
    updatedData.push(newItem);
    setGridData(updatedData);
    setTotalPagesNumber(Math.ceil(updatedData.length / rowsPerPage));
  };

  const handleSaveNewItem = () => {
    const updatedData = [...gridData];
    setEditedData({ ...editedData, [gridData.length]: newItem }); // Update editedData state

    // Ensure newItem is properly structured
    updatedData.push(newItem); // Add the new item to the grid data
    setGridData(updatedData);
    localStorage.setItem("gridData", JSON.stringify(updatedData)); // Persist to local storage
    setEditingRowIndex(-1); // Exit editing mode
    setNewItem({}); // Clear new item state if necessary
  };

  // const handleSaveNewItem = () => {
  //   const updatedData = [...gridData];
  //   updatedData.push(newItem); // Add the new item to the grid data
  //   setGridData(updatedData);
  //   setEditingRowIndex(-1); // Reset editingRowIndex to -1
  //   setNewItem({}); // Clear new item state if necessary
  // };

  const handlePageChange = (direction) => {
    if (direction === "prev" && currentPageNumber > 1) {
      setCurrentPageNumber(currentPageNumber - 1);
    } else if (direction === "next" && currentPageNumber < totalPagesNumber) {
      setCurrentPageNumber(currentPageNumber + 1);
    }
  };

  const getFieldType = (type) => {
    switch (type) {
      case "check":
        return "checkbox";
      case "dropdown":
        return "select";
      default:
        return "text";
    }
  };

  const getInputType = (type) => {
    switch (type) {
      case "text":
        return "text";
      case "number":
        return "number";
      case "date":
        return "date";
      case "checkbox":
        return "checkbox";
      case "select":
        return "select";
      default:
        return "text";
    }
  };

  return (
    <div className="grid-component">
      <div className="">
        <div className="container grid p-0">
          <table>
            <thead>
              <tr>
                <th>
                  <button className="action-button Add" onClick={handleAdd}>
                    {"إضافه"}
                  </button>
                </th>
                {tableHeaders.map((header, index) => {
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
                  {/* Action Buttons */}
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
                    const item = gridData[startIndex + index] || {}; // Ensure item exists
                    const headerData = Array.isArray(item)
                      ? item.find((dataItem) => dataItem.header === header)
                      : null;

                    return (
                      <td key={headerIndex}>
                        {editingRowIndex === startIndex + index ? (
                          // Input for editing
                          headerData?.type === "dropdown" ? (
                            <select
                              value={item[header] || ""} // Use item[header] or empty string
                              onChange={(e) => {
                                const updatedItem = {
                                  ...item,
                                  [header]: e.target.value,
                                }; // Create a new item object
                                const updatedData = [...gridData];
                                updatedData[startIndex + index] = updatedItem; // Update the specific item
                                setGridData(updatedData);
                                localStorage.setItem(
                                  "gridData",
                                  JSON.stringify(updatedData)
                                ); // Persist changes to local storage
                              }}
                            >
                              {data.dropdownList.list.map((option) => (
                                <option key={option.value} value={option.name}>
                                  {option.name}
                                </option>
                              ))}
                            </select>
                          ) : (
                            <input
                              type={
                                headerData?.type
                                  ? getInputType(headerData.type)
                                  : "text"
                              }
                              value={item[header] || ""} // Use item[header] or empty string
                              onChange={(e) => {
                                const updatedItem = {
                                  ...item,
                                  [header]: e.target.value,
                                }; // Create a new item object
                                const updatedData = [...gridData];
                                updatedData[startIndex + index] = updatedItem; // Update the specific item
                                setGridData(updatedData);
                                localStorage.setItem(
                                  "gridData",
                                  JSON.stringify(updatedData)
                                ); // Persist changes to local storage
                              }}
                              disabled={
                                headerData?.type === "button" ||
                                headerData?.type === "check"
                              }
                            />
                          )
                        ) : (
                          // Display value when not editing
                          <div>
                            {headerData ? (
                              headerData.type === "button" ? (
                                <button className="btn btn-danger">{headerData.caption}</button>
                              ) : headerData.type === "check" ? (
                                <input
                                  type="checkbox"
                                  checked={headerData.value}
                                  readOnly
                                />
                              ) : headerData.type === "dropdown" ? (
                                <input
                                  type="text"
                                  value={headerData.CurrentName}
                                  disabled
                                />
                              ) : (
                                headerData.value
                              )
                            ) : (
                              ""
                            )}
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
