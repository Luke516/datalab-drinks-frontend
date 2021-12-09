import React, { useEffect, useContext, useState } from "react";
import DrinkSection from "../components/DrinkSection";
import { useLocation, useParams } from "react-router-dom";
import { Modal, Button, Alert } from "react-bootstrap";
import BTable from 'react-bootstrap/Table';
import { CSSTransition } from "react-transition-group";
import { useTable, useRowSelect, useSortBy } from 'react-table'
import { AppContext } from "../App";
import "./AllDrink.css";
import LoadingSpinner from "./LoadingSpinner";
import styled from 'styled-components'
import axios from 'axios';

const Styles = styled.div`
  /* This is required to make the table full-width */
  display: block;
  max-width: 100%;

  /* This will make the table scrollable when it gets too small */
  .tableWrap {
    display: block;
    max-width: 100%;
    overflow-x: scroll;
    overflow-y: hidden;
    border-bottom: 1px solid black;
  }

  table {
    /* Make sure the inner table is always as wide as needed */
    width: 100%;
    border-spacing: 0;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      /* The secret sauce */
      /* Each cell should grow equally */
      width: 1%;
      /* But "collapsed" cells should be as small as possible */
      &.collapse {
        width: 0.0000000001%;
      }

      :last-child {
        border-right: 0;
      }
    }
  }

  .pagination {
    padding: 0.5rem;
  }
`

const IndeterminateCheckbox = React.forwardRef(
    ({ indeterminate, ...rest }, ref) => {
      const defaultRef = React.useRef()
      const resolvedRef = ref || defaultRef
  
      React.useEffect(() => {
        resolvedRef.current.indeterminate = indeterminate
      }, [resolvedRef, indeterminate])
  
      return (
        <>
          <input type="checkbox" ref={resolvedRef} {...rest} />
        </>
      )
    }
)

function Table({ columns, data }) {
    // Use the state and functions returned from useTable to build your UI
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        selectedFlatRows,
        state: { selectedRowIds },
    } = useTable(
        {
            columns,
            data,
            initialState: {
                sortBy: [
                    {
                        id: '組別',
                        desc: true
                    }
                ]
            }
        },
        useSortBy,
        useRowSelect,
        hooks => {
            hooks.visibleColumns.push(columns => [
                // Let's make a column for selection
                {
                    id: 'selection',
                    // The header can use the table's getToggleAllRowsSelectedProps method
                    // to render a checkbox
                    Header: ({ getToggleAllRowsSelectedProps }) => (
                        <div>
                            <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
                        </div>
                    ),
                    // The cell can use the individual row's getToggleRowSelectedProps method
                    // to the render a checkbox
                    Cell: ({ row }) => (
                        <div>
                            <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
                        </div>
                    ),
                },
                ...columns,
            ])
        }
    )

    // Render the UI for your table
    return (
        <Styles>
            <BTable striped bordered hover size="sm" {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    {column.render('Header')}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row, i) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return <td {...cell.getCellProps()}>
                                        {cell.render('Cell')}
                                    </td>
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </BTable>
            {/* <p>Selected Rows: {Object.keys(selectedRowIds).length}</p>
            <pre>
                <code>
                    {JSON.stringify(
                        {
                            selectedRowIds: selectedRowIds,
                            'selectedFlatRows[].original': selectedFlatRows.map(
                                d => d.original
                            ),
                        },
                        null,
                        2
                    )}
                </code>
            </pre> */}
        </Styles>
    )
}

export default function GroupSetting(props) {
    const [loading, setLoading] = useState(true);
    const appContext = useContext(AppContext);
    const { groupData, participantData } = appContext;

    let location = useLocation();
    let param = useParams();

    const nodeRef = React.useRef(null)

    const importToDatabase = async () => {
        console.log("import QWQ!");
        console.log(groupData);
        console.log(participantData);
        let payload = [];
        let dataDict = {};
        for(let i=0; i<participantData.rows.length; i++) {
            let row1 = participantData.rows[i];
            if(row1["ID"]){
                dataDict[row1["ID"]] = row1;
            }
        }
        for(let i=0; i<groupData.rows.length; i++) {
            let row2 = groupData.rows[i];
            if(dataDict[row2["ID"]]){
                let row1 = dataDict[row2["ID"]];
                if (!row2["組別"]) {
                    console.log("ERROR QWQ:");
                    console.log(row2);
                    continue;
                }
                if (row2["組別"].length < 1) {
                    console.log("ERROR QWQ:");
                    console.log(row2);
                    continue;
                }
                payload.push(
                    {
                        data: row1,
                        group: row2["組別"]
                    }
                )
            }
            else {
                console.log("ERROR QWQ:");
                console.log(row2);
            }
        }
        console.log(payload);

        for(let data of payload){
            axios.post("http://localhost:5000/api/import", data)
            .then((res)=> {
                console.log(res);
            });
        }
    }

    const deleteTestersFromDatabase = async () => {
        axios.post("http://localhost:5000/api/clear")
        .then((res)=> {
            console.log(res);
        });
    }

    useEffect(() => {
        // setTimeout(() => {
        //     if (window._jf) window._jf.flush();
        // }, 500)

    }, []);

    // useEffect(() => {
    //     if (participantData && participantData.menu) {
    //         setLoading(false);
    //     }
    // }, [participantData])

    if(groupData.columns.length == 0){
        return <LoadingSpinner />
    }
    return (
        <React.Fragment>
            <div className="my-2">
                <Button onClick = {()=>{deleteTestersFromDatabase()}}>(刪除現有資料)</Button>
                <Button onClick = {()=>{importToDatabase()}}>匯入資料庫(覆寫現有資料)</Button>
            </div>
            <div /*className="container tab-content" data-aos="fade-in" data-aos-duration="300"*/ id="nav-tabContent">
                <Table columns={groupData.columns} data={groupData.rows} />
            </div>
        </React.Fragment>

    )
}