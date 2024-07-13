import React from 'react'
import { useReactTable, getCoreRowModel, flexRender, getPaginationRowModel, getSortedRowModel, getFilteredRowModel } from '@tanstack/react-table'
import { useState} from 'react'
import dayjs from 'dayjs'
function SimpleTable() {
    const columns = [
        {header:'ID',
        accessorKey:'id'},
        {header:'Primer_Nombre',
        accessorKey:'first_name'},
        {header:'Apellido',
        accessorKey:'last_name'},
        {header:'Email',
        accessorKey:'email'},
        {header:'Pais',
        accessorKey:'country'},
        {header:'Fecha_de_nacimiento',
        accessorKey:' birthday_date',
        cell: info => dayjs(info.getValue()).format('DD/MM/YYYY')
    }
    ];
    const[sorting,setSorting] = useState([]);
    const [filtering,setFiltering] = useState("")
    const table = useReactTable({data,columns, getCoreRowModel:getCoreRowModel(), getPaginationRowModel:getPaginationRowModel(),
    getSortedRowModel:getSortedRowModel(), state:{
        sorting,
        globalFilter: filtering,
    },
    onSortingChange:setSorting,
    onGlobalFilterChange:setFiltering,
    getFilteredRowModel:getFilteredRowModel()}
);
  return (
    <div>
        <input type="text" value={filtering} onChange={e=>setFiltering(e.target.value)} />
        <table>
            <thead>
                {table.getHeaderGroups().map(headerGroup =>(
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map(header =>(
                           <th key={header.id} onClick={header.column.getToggleSortingHandler()
                           }>
                            <div>
                                {flexRender(header.column.columnDef.header, header.getContext())}
                            {
                                {'asc':"⬆️", 'dec':"⬇️" }
                                [header.column.getIsSorted() ?? null]
                            }   
                            </div>
                           </th> 
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody>
                {
                    table.getRowModel().rows.map((row) =>(
                        <tr key={row.id}>
                            {row.getVisibleCells().map((cell) =>(
                                <td key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))
                }
            </tbody>
            <tfoot></tfoot>
        </table>
        <button onClick={()=> table.setPageIndex(0)}>
            Primer Pagina
        </button>
        <button onClick={()=> table.nextPage()}>
            Pagina Siguiente
        </button>
        <button onClick={()=> table.previousPage()}>
            Pagina anterior
        </button>
        <button onClick={()=> table.setPageIndex(table.getPageCount()-1)}>
            Ultima Pagina
        </button>
    </div>
  )
}

export default SimpleTable