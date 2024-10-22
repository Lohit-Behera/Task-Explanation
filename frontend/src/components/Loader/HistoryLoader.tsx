import { Skeleton } from "../ui/skeleton";

function HistoryLoader() {
  return (
    <div className="grid gap-4">
      <div className="flex space-x-2">
        <Skeleton className="w-12 h-12 rounded-full" />
        <Skeleton className="w-28 h-4 mt-1" />
      </div>
      <div className="grid gap-2">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="flex justify-between">
            <Skeleton className="w-20 h-4 my-auto" />
            <Skeleton className="w-32 h-4 my-auto" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default HistoryLoader;
