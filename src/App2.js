import React from "react";
import "devextreme/dist/css/dx.common.css";
import "devextreme/dist/css/dx.material.blue.light.compact.css";
import {
  DataGrid,
  Column,
  Paging,
  Scrolling,
} from "devextreme-react/data-grid";
import "devextreme/data/odata/store";
import DataSource from "devextreme/data/data_source";
import ArrayStore from "devextreme/data/array_store";
import service from "./data.js";

const employeesStore = new ArrayStore({
  data: service.getEmployees(),
  key: "OrderNumber",
});
const employeesDataSource = new DataSource({
  store: employeesStore,
});
function App (){
  const onFocusedRowChanging=(e)=> {
    const rowsCount = e.component.getVisibleRows().length;
    const pageCount = e.component.pageCount();
    const pageIndex = e.component.pageIndex();
    const key = e.event && e.event.key;

    if (key && e.prevRowIndex === e.newRowIndex) {
      if (e.newRowIndex === rowsCount - 1 && pageIndex < pageCount - 1) {
        e.component.pageIndex(pageIndex + 1).done(() => {
          e.component.option("focusedRowIndex", 0);
        });
      } else if (e.newRowIndex === 0 && pageIndex > 0) {
        e.component.pageIndex(pageIndex - 1).done(() => {
          e.component.option("focusedRowIndex", rowsCount - 1);
        });
      }
    }
  }

    return (
      <div>
        <DataGrid
          id="gridContainer"
          dataSource={employeesDataSource}
          focusedRowEnabled={true}
          // focusedRowKey={this.state.focusedRowKey}
          // onFocusedRowChanging={onFocusedRowChanging}
          showBorders={true}>
          <Paging pageSize={5} />
          <Scrolling mode="virtual" />
          <Column dataField="OrderNumber" width={80} />
          <Column caption="Sale Amount" dataField="SaleAmount" />
          <Column
            caption="Store City"
            dataField="StoreCity"
            allowSorting={false}
          />
          <Column caption="Store State" dataField="StoreState" width={350} />
          <Column caption="Employee" dataField="Employee" />
        </DataGrid>
      </div>
    );
  
}

export default App;
