import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Loader from 'react-loader-spinner'
import { itemsSelector, fetchItems, clearState } from './ItemsSlice'

import { Table, Thead, Tbody, Tr, Th, Td, chakra } from "@chakra-ui/react"
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons"
import { useTable, useSortBy } from "react-table"

import Header from '../../helpers/Header'

const ItemsView = () => {
  const dispatch = useDispatch()
  const { isFetching, isError, list } = useSelector(itemsSelector)
  useEffect(() => {
    dispatch(fetchItems({ token: localStorage.getItem('token') }))
  }, [])

  useEffect(() => {
    if (isError) {
      dispatch(clearState())
    }
  }, [isError])

  const data = list

  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Into",
        accessor: "category",
      },
      {
        Header: "Amount",
        accessor: "amount",
        isNumeric: true,
      },
      {
        Header: "Unit",
        accessor: "unit",
      },
      {
        Header: "Days Per Unit",
        accessor: "daysPerUnit",
        isNumeric: true,
      },
      {
        Header: "Last Price",
        accessor: "lastPrice",
        isNumeric: true,
      },
      {
        Header: "Purchase Amount",
        accessor: "purchaseAmount",
        isNumeric: true,
      },
      {
        Header: "Purchase Date",
        accessor: "purchaseDate",
      },
      {
        Header: "Store",
        accessor: "store",
      },
      {
        Header: "Tax",
        accessor: "tax",
      },
    ],
    [],
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data }, useSortBy)

  return (
    <React.Fragment>
      <Header />
      {isFetching ? (
        <Loader type="Puff" color="#00BFFF" height={100} width={100} />
      ) : (
        <Table {...getTableProps()}>
          <Thead>
            {headerGroups.map((headerGroup) => (
              <Tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <Th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    isNumeric={column.isNumeric}
                  >
                    {column.render("Header")}
                    <chakra.span pl="4">
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <TriangleDownIcon aria-label="sorted descending" />
                        ) : (
                          <TriangleUpIcon aria-label="sorted ascending" />
                        )
                      ) : null}
                    </chakra.span>
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row)
              return (
                <Tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <Td {...cell.getCellProps()} isNumeric={cell.column.isNumeric}>
                      {cell.render("Cell")}
                    </Td>
                  ))}
                </Tr>
              )
            })}
          </Tbody>
        </Table>
      )}
    </React.Fragment>
  )
}

export default ItemsView
