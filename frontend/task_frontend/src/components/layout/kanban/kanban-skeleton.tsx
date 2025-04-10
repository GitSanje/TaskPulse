import { Skeleton } from "@/components/ui/skeleton"

export default function KanbanBoardSkeleton() {
  // Create an array of columns
  const columns = ["pending", "in_progress", "completed"]


  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <Skeleton className="h-7 w-32" />
        <Skeleton className="h-9 w-28" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {columns.map((status) => (
          <div
            key={status}
            className={`rounded-lg p-4 ${
              status === "pending" ? "bg-slate-50" : status === "in_progress" ? "bg-blue-50" : "bg-green-50"
            }`}
          >
            <div className="flex items-center mb-4">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-5 w-6 ml-1 rounded-full" />
            </div>

            <div className="space-y-3">
              {/* Generate random number of task skeletons per column */}
              {Array.from({ length: 2 + Math.floor(Math.random() * 3) }).map((_, index) => (
                <div key={index} className="bg-white rounded-lg p-4 shadow-sm border">
                  <div className="flex justify-between items-start mb-2">
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-6 w-6 rounded-full" />
                  </div>
                  <Skeleton className="h-4 w-full mb-3" />
                  <Skeleton className="h-4 w-5/6 mb-3" />
                  <div className="flex gap-2 mt-2">
                    <Skeleton className="h-5 w-16 rounded-full" />
                    <Skeleton className="h-5 w-24 rounded-full" />
                  </div>
                  <div className="mt-3">
                    <Skeleton className="h-3 w-28" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
