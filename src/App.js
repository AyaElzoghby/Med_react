import "./App.css";
import React from "react";
import Grid from "./components/gridTable";
import data from "./data/checkData.json";
import "bootstrap/dist/css/bootstrap.min.css";

const handleEdit = (updatedItem) => {
  console.log("Updated item:", updatedItem);
};

const handleDelete = (index) => {
  console.log("Deleted item at index:", index);
};

const App = () => {
  return (
    <div className="d-flex container-fluid row my-5 m-0">
      <div className="col-12">
        <h2 className="text-center mb-3">Grid Component</h2>
        <Grid
          data={data}
          onEdit={handleEdit}
          onDelete={handleDelete}
         
          Columns={["DepartmentID","Genertate","AssetList","IsGenerated","TimeStamp"]} 
        />
      </div>
    </div>
  );
};

export default App;