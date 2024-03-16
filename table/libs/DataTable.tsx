/**
 * Created by ssaboo on 4/2/16.
 */
import * as React from "react";
import merge from "lodash/merge";
import { DataTable as PrimeDataTable } from "primereact/datatable";
import { Column } from "primereact/column";

class DataTable extends React.Component<any, any> {
    constructor(props) {
        super(props);

        this.state = {
            rows: props.dataSource,
        };
    }

    static getDerivedStateFromProps(props) {
        return {
            rows: props.dataSource,
        };
    }

    collect() {
        return this.state.rows;
    }

    handleGridRowsUpdated = (updatedRowData) => {
        const rows = this.state.rows;

        for (let i = updatedRowData.fromRow; i <= updatedRowData.toRow; i++) {
            const rowToUpdate = rows[i];
            const updatedRow = merge(rowToUpdate, updatedRowData.updated);
            updatedRow.dirty = true;
            rows[i] = updatedRow;
        }

        this.setState({ rows });
    };

    getSize = () => {
        return this.state.rows?.length;
    };
    handleAddRow = () => {
        /*  const newRow = {
            value: e.newRowIndex,
            userStory: "",
            developer: "",
            epic: ""
        }; */
        //  TODO TS const rows = React.addons.update(this.state.rows, { $push: [newRow] });
        // TODO TS  this.setState({ rows });
    };

    getRowAt = (index) => {
        if (index < 0 || index > this.getSize()) {
            return undefined;
        }
        return this.state.rows[index];
    };

    render() {
        const { dataSource } = this.props;
        if (dataSource === null) return <div></div>;
        return (
            <PrimeDataTable
                {...this.props}
                //rowGetter={this.getRowAt}
                //rowsCount={this.getSize()}
                //onGridRowsUpdated={this.handleGridRowsUpdated}
                //rowHeight={50}
                //rowScrollTimeout={120}
                showGridlines
                stripedRows
                dataKey="id"
                paginator
                rows={10}
                rowsPerPageOptions={[5, 10, 25]}
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} --"
                // globalFilter={globalFilter}
                // header={header}
                responsiveLayout="scroll"
            >
                {this.props.columns.map((col, i) => (
                    <Column
                        key={i}
                        field={col.field}
                        header={col.name}
                        body={col.formatterEasy}
                    />
                ))}
            </PrimeDataTable>
        );
    }
}

/*
Table.propTypes = {
    className: PropTypes.string,
    title: PropTypes.string,
};
*/

export default DataTable;
