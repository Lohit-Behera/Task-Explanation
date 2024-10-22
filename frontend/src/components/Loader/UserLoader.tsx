import { Skeleton } from "../ui/skeleton";

function UserLoader() {
  return (
    <>
      {Array.from({ length: 9 }).map((_, i) => (
        <div className="grid gap-4" key={i}>
          <div className="flex justify-between">
            <div className="flex space-x-2">
              <Skeleton className="w-12 h-12 rounded-full" />
              <Skeleton className="w-24 h-4 mt-2" />
            </div>
            <div className="flex flex-col justify-center items-center">
              <Skeleton className="w-20 h-4 rounded-full" />
              <Skeleton className="w-12 h-4 mt-2" />
            </div>
            <Skeleton className="w-16 h-8 my-auto" />
          </div>
        </div>
      ))}
    </>
  );
}

export default UserLoader;
