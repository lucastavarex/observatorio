import { InputWithIcon } from "@/components/ui/input"
import { Search } from "lucide-react"

interface FilterSearchProps {
  searchFilter: string
  onSearchChange: (value: string) => void
}

export function FilterSearch({ searchFilter, onSearchChange }: FilterSearchProps) {
  return (
    <div className="px-4 mb-[1px]">
    <InputWithIcon
      placeholder="Buscar por variável..."
      value={searchFilter}
      onChange={(e) => onSearchChange(e.target.value)}
      className="h-14 p-0 border-none shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 text-black"
      icon={<Search className="h-5 w-5 -mr-2.5" />}
      iconPosition="right"
    />
    </div>
  )
} 