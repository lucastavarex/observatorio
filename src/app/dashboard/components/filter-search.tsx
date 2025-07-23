import { InputWithIcon } from "@/components/ui/input"
import { Search } from "lucide-react"

interface FilterSearchProps {
  searchFilter: string
  onSearchChange: (value: string) => void
}

export function FilterSearch({ searchFilter, onSearchChange }: FilterSearchProps) {
  return (
    <>
    <InputWithIcon
      placeholder="Buscar por variável..."
      value={searchFilter}
      onChange={(e) => onSearchChange(e.target.value)}
      className="h-14 p-0 border-0 -mb-2 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 text-black"
      icon={<Search className="h-5 w-5" />}
      iconPosition="right"
    />
    <div className="h-[0.5px] w-full bg-gray-300"/>
    </>
  )
} 