export default function CatalogoDeDadosPage() {
  return (
    <>
    <div className="container mx-auto p-6">
      {/* Mobile-first responsive layout */}
      <div className="flex flex-col gap-6 lg:flex-row min-h-[600px]">
        {/* Red section - always min 350px width */}
        <div className="bg-red-500 min-w-[350px] lg:w-[350px] lg:flex-shrink-0 rounded-lg min-h-[200px] lg:min-h-full"></div>
        
        {/* Container for green and blue on desktop */}
        <div className="flex flex-col gap-6 lg:flex-1">
          {/* Green section */}
          <div className="bg-green-500 rounded-lg h-16"></div>
          
          {/* Blue section */}
          <div className="bg-blue-500 rounded-lg min-h-[200px] lg:flex-1"></div>
        </div>
      </div>
    </div>
    </>
  )
}
