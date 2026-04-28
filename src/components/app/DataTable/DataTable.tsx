import { cn } from '@/utils/cn'

export interface Column<T> {
  key: keyof T
  header: string
  render?: (value: T[keyof T], row: T) => React.ReactNode
  width?: string
  align?: 'left' | 'center' | 'right'
}

export interface DataTableProps<T> extends React.HTMLAttributes<HTMLTableElement> {
  columns: Column<T>[]
  data: T[]
  loading?: boolean
  emptyMessage?: string
  onRowClick?: (row: T) => void
  striped?: boolean
}

function SkeletonRow({ cols }: { cols: number }) {
  return (
    <tr>
      {Array.from({ length: cols }, (_, i) => (
        <td key={i} className="px-4 py-3">
          <div className="h-4 rounded bg-[var(--color-soft)] animate-pulse" />
        </td>
      ))}
    </tr>
  )
}

export function DataTable<T extends Record<string, unknown>>({
  className,
  columns,
  data,
  loading = false,
  emptyMessage = 'No data available',
  onRowClick,
  striped = false,
  ...props
}: DataTableProps<T>) {
  return (
    <div className="w-full overflow-x-auto">
      <table className={cn('w-full border-collapse', className)} {...props}>
        <thead>
          <tr className="bg-[var(--color-soft)]">
            {columns.map((col) => (
              <th
                key={String(col.key)}
                className={cn(
                  'px-4 py-3 text-left',
                  'text-[length:var(--font-size-small)] font-bold text-[var(--color-espresso)]',
                  col.align === 'center' && 'text-center',
                  col.align === 'right' && 'text-right'
                )}
                style={col.width ? { width: col.width } : undefined}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            Array.from({ length: 5 }, (_, i) => (
              <SkeletonRow key={i} cols={columns.length} />
            ))
          ) : data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-4 py-12 text-center text-[var(--color-muted)] text-[length:var(--font-size-body)]"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, rowIdx) => (
              <tr
                key={rowIdx}
                onClick={() => onRowClick?.(row)}
                className={cn(
                  'bg-[var(--color-warm-white)] border-b border-[var(--color-border-light)]',
                  'transition-colors duration-150',
                  'hover:bg-[var(--color-soft)]',
                  onRowClick && 'cursor-pointer',
                  striped && rowIdx % 2 === 1 && 'bg-[var(--color-soft)]'
                )}
              >
                {columns.map((col) => (
                  <td
                    key={String(col.key)}
                    className={cn(
                      'px-4 py-3 text-[length:var(--font-size-body)] text-[var(--color-espresso)]',
                      col.align === 'center' && 'text-center',
                      col.align === 'right' && 'text-right'
                    )}
                  >
                    {col.render
                      ? col.render(row[col.key], row)
                      : String(row[col.key] ?? '')}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

DataTable.displayName = 'DataTable'
