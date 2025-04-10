import { Loader2 } from "lucide-react"

interface TaskLoadingOverlayProps {
  message?: string
}

export default function TaskLoadingOverlay({ message = "Processing..." }: TaskLoadingOverlayProps) {
  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 shadow-xl max-w-sm w-full">
        <div className="flex flex-col items-center">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p className="mt-4 text-center font-medium">{message}</p>
        </div>
      </div>
    </div>
  )
}
