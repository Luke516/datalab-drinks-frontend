import React, { useEffect, useContext, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import BTable from 'react-bootstrap/Table';
import { CSSTransition } from "react-transition-group";
import { useTable, useRowSelect } from 'react-table'
import { AppContext } from "../App";
import LoadingSpinner from "./LoadingSpinner";
import styled from 'styled-components'

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
        },
        useRowSelect,
        hooks => {
            hooks.visibleColumns.push(columns => [
                ...columns,
            ])
        }
    )

    // Render the UI for your table
    return (
        <Styles>
            {/* <div className="tableWrap"> */}
                <BTable striped bordered hover size="sm" {...getTableProps()}>
                    <thead>
                        {headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column => (
                                    <th style={{minWidth: "5rem", maxWidth: "12rem"}} {...column.getHeaderProps()}>{column.render('Header')}</th>
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
            {/* </div> */}
        </Styles>
    )
}

export default function ParticipantList(props) {
    const [loading, setLoading] = useState(true);
    const appContext = useContext(AppContext);
    const { participantData } = appContext;

    let location = useLocation();
    let param = useParams();

    const nodeRef = React.useRef(null)

    useEffect(() => {
        // setTimeout(() => {
        //     if (window._jf) window._jf.flush();
        // }, 500)

    }, []);

    useEffect(() => {
        if (participantData && participantData.menu) {
            setLoading(false);
        }
    }, [participantData])

    if(participantData.columns.length == 0){
        return <LoadingSpinner />
    }
    return (
        <React.Fragment>
            <div>
            </div>
            <div /*className="container tab-content" data-aos="fade-in" data-aos-duration="300"*/ id="nav-tabContent">
                <Table columns={participantData.columns} data={participantData.rows} />
            </div>
        </React.Fragment>

    )
}