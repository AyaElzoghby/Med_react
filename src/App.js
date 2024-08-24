import "./App.css";
import React from "react";
import Grid from "./components/grid";
import data from "./data/names.json";
import "bootstrap/dist/css/bootstrap.min.css";

// In your App.js
const updateData = (updatedItem) => {
  // Implement the logic to update the data in  application
};

const deleteData = (index) => {
  // Implement the logic to remove the data from  application
};

const handleEdit = (updatedItem) => {
  updateData(updatedItem);
};

const handleDelete = (index) => {
  deleteData(index);
};

const App = () => {
  return (
    <div className="d-flex container-fluid row my-5 m-0">
      <div className="col-12">
        <h2 className="text-center mb-3">Grid Component</h2>
        <Grid data={data} onEdit={handleEdit} onDelete={handleDelete} />
      </div>
    </div>
  );
};

export default App;
