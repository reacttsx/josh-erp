import React, { memo, useEffect, useMemo, useState } from 'react'

import { CSpinner, CTable } from '@coreui/react'
import PropTypes from 'prop-types'
import { useFilters, useTable } from 'react-table'
import CIcon from '@coreui/icons-react'
import {
  cilChevronDoubleLeft,
  cilChevronDoubleRight,
  cilChevronLeft,
  cilChevronRight,
} from '@coreui/icons'

const Table = ({
  list,
  columns,
  pageOffset,
  page,
  pageCount,
  rowProps,
  fetchDataFunction,
  pageLimit,
  enablePagination,
  isLoading,
  outsideTblContent,
}) => {
  const data = useMemo(() => (Array.isArray(list) ? list : []), [list])
  const column = useMemo(() => columns, [columns])
  const [totalColspan, setTotalColspan] = useState(1)
  const { getTableBodyProps, headerGroups, rows, prepareRow, footerGroups } = useTable(
    { columns, data },
    useFilters,
  )

  useEffect(() => {
    getTblColspan()
  }, [])

  const canPreviousPage = () => (pageOffset - 1 < 0 ? false : true)

  const canNextPage = () => (parseInt(pageOffset) + 1 > parseInt(pageCount) - 1 ? false : true)

  const getTblColspan = () => {
    const colCount = column.reduce((total, item) => {
      const itemCount = 1 + (Array.isArray(item.column) ? item.column.length : 0)
      return total + itemCount
    }, 0)
    setTotalColspan(colCount)
  }

  return (
    <>
      <div className="table-responsive">
        <CTable>
          <thead>
            {headerGroups.map((headerGroup, i) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={`index${i}`}>
                {headerGroup.headers.map((column, j) => {
                  const customCellProps =
                    column && column.customeColThProps ? column.customeColThProps : {}
                  return (
                    <th
                      scope="col"
                      {...column.getHeaderProps({ ...customCellProps })}
                      key={`index${j}`}
                    >
                      {column.render('Header')}
                      {column.canFilter ? (
                        <div className="search-table-item">
                          {column.canFilter ? column.render('Filter') : null}
                        </div>
                      ) : (
                        <></>
                      )}
                    </th>
                  )
                })}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {!isLoading &&
              rows.length > 0 &&
              rows.map((row, i) => {
                prepareRow(row)
                const tblRowAttr = rowProps && rowProps.getRowAttr ? rowProps.getRowAttr(row) : {}

                return (
                  <tr {...row.getRowProps({ ...tblRowAttr })} key={`index${i}`}>
                    {row.cells.map((cell, j) => {
                      const tblColAttr =
                        cell && cell.column && cell.column.columnProps
                          ? cell.column.columnProps
                          : {}
                      const cutomeCellProps =
                        cell &&
                        cell.column &&
                        cell.column.customeColTdProps &&
                        cell.column.customeColTdProps
                          ? cell && cell.column.customeColTdProps
                          : {}

                      return (
                        <td
                          {...cell.getCellProps({
                            ...tblColAttr,
                            ...cutomeCellProps,
                          })}
                          key={`index${j}`}
                        >
                          {cell.render('Cell')}
                        </td>
                      )
                    })}
                  </tr>
                )
              })}
            {!isLoading && rows.length === 0 ? (
              <tr>
                <td className="text-center" colSpan={totalColspan}>
                  No Data
                </td>
              </tr>
            ) : (
              <></>
            )}
            {isLoading && (
              <tr>
                <td className="text-center" colSpan={totalColspan} style={{ height: '170px' }}>
                  <CSpinner size="sm" color="primary" />
                </td>
              </tr>
            )}
          </tbody>
          {!isLoading && rows.length > 0 && (
            <tfoot>
              {footerGroups.map((group, i) => (
                <tr {...group.getFooterGroupProps()} key={`index${i}`}>
                  {group.headers.map((column, j) => {
                    const customFooterTdProps =
                      column && column.customFooterTdProps ? column.customFooterTdProps : {}

                    return (
                      <th {...column.getFooterProps({ ...customFooterTdProps })} key={`index${j}`}>
                        {column.render('Header')}
                      </th>
                    )
                  })}
                </tr>
              ))}
            </tfoot>
          )}
        </CTable>
      </div>
      {outsideTblContent && outsideTblContent}
      {enablePagination && rows.length > 0 && (
        <div className="row">
          <div className="col-md-12 d-flex flex-wrap justify-content-end align-items-center mt-2">
            <ul className="pagination mb-0 me-4 ">
              <li
                className={`page-item ${!canPreviousPage() ? 'disabled' : ''}`}
                onClick={(event) => {
                  event.preventDefault()
                  if (!canPreviousPage()) {
                    return false
                  }
                  fetchDataFunction(0, pageLimit)
                }}
              >
                <a className="page-link border-0" href="'#'">
                  <CIcon icon={cilChevronDoubleLeft} />
                </a>
              </li>
              <li
                className={`page-item ${!canPreviousPage() ? 'disabled' : ''}`}
                onClick={(event) => {
                  event.preventDefault()
                  if (!canPreviousPage()) {
                    return false
                  }
                  fetchDataFunction(page - 1, pageLimit)
                }}
              >
                <a className="page-link border-0" href="'#'">
                  <CIcon icon={cilChevronLeft} />
                </a>
              </li>
              <li className="px-1 d-flex align-items-center">
                <span className="centervalue d-flex align-items-center">
                  <span className="mx-2">{pageOffset + 1}</span>
                  <b>of</b>
                  <span className="mx-2">
                    {(parseInt(pageCount) > 0 ? parseInt(pageCount) : 1) - 1 > 0
                      ? parseInt(pageCount) > 0
                        ? parseInt(pageCount)
                        : 1
                      : 1}
                  </span>
                </span>
              </li>
              <li
                className={`page-item ${!canNextPage() ? 'disabled' : ''}`}
                onClick={(event) => {
                  event.preventDefault()
                  if (!canNextPage()) {
                    return false
                  }
                  fetchDataFunction(page + 1, parseInt(pageLimit))
                }}
              >
                <a className="page-link border-0" href="'#'">
                  <CIcon icon={cilChevronRight} />
                </a>
              </li>
              <li
                className={`page-item ${!canNextPage() ? 'disabled' : ''}`}
                onClick={(event) => {
                  event.preventDefault()
                  if (!canNextPage()) {
                    return false
                  }
                  fetchDataFunction(pageCount, pageLimit)
                }}
              >
                <a className="page-link border-0" href="'#'">
                  <CIcon icon={cilChevronDoubleRight} />
                </a>
              </li>
            </ul>
            <div className="pages-total d-flex align-items-center">
              <div className="d-inline me-2">
                <b>Show by</b>
              </div>
              <div className="d-inline">
                <select
                  className="form-select cs-select page-select form-control me-3 my-2"
                  value={pageLimit}
                  onChange={(event) => {
                    fetchDataFunction(0, parseInt(event.target.value))
                  }}
                >
                  {[10, 20, 30, 40, 50, 100].map((item) => (
                    <option key={`Pagination${item}`} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

Table.propTypes = {
  list: PropTypes.any.isRequired,
  columns: PropTypes.array.isRequired,
  pageOffset: PropTypes.number,
  page: PropTypes.number,
  pageCount: PropTypes.number,
  rowProps: PropTypes.any,
  fetchDataFunction: PropTypes.func,
  pageLimit: PropTypes.number,
  enablePagination: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  outsideTblContent: PropTypes.any,
}

export default memo(Table)
