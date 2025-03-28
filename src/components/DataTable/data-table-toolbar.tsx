import { Input } from '@/components/ui/input';
import { Column, Table } from '@tanstack/react-table';
import { DataTableViewOptions } from './data-table-view-options';
import { DataTableFacetedFilter } from './data-table-faceted-filter';
import { UserStatuses, ItemRequestStatuses } from './filters';
import { Button } from '@/components/ui/button';
import { Icons } from '../ui/icons';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  searchKey: string;
  dataType?: string;
  placeholder?: string;
  data: TData[];
  onFilterChange?: (filters: string[]) => void; // Nhận prop mới
}

// interface FilterOption {
//   label: string;
//   value: string;
// }

export function DataTableToolbar<TData>({
  table,
  searchKey,
  dataType,
  placeholder,
  // data,
  onFilterChange,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  const getColumnSafely = (
    columnId: string,
  ): Column<TData, unknown> | undefined =>
    table.getColumn(columnId) || undefined;

  const statusColumn = getColumnSafely('status');

  const statusOptions =
    dataType === 'itemRequests' ? ItemRequestStatuses : UserStatuses;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder={placeholder}
          value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn(searchKey)?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />

        {statusColumn && (
          <DataTableFacetedFilter
            column={statusColumn}
            title="Status"
            options={statusOptions}
            onFilterChange={onFilterChange}
          />
        )}

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Icons.cancel className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
