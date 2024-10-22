import { fetchAllUsers, fetchTopUsers } from "@/features/UserSlice";
import { AppDispatch, RootState } from "@/store/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { fetchAddPoints } from "@/features/PointSlice";
import { toast } from "sonner";
import { ChevronDown } from "lucide-react";

type User = {
  _id: string;
  name: string;
  avatar: string;
  totalPoints: number;
  __v: number;
  updatedAt: string;
  createdAt: string;
};

function HomePage() {
  const dispatch = useDispatch<AppDispatch>();

  const allUsers = useSelector((state: RootState) => state.user.allUsers);
  const allUserData = allUsers.data || [];

  const topUsers = useSelector((state: RootState) => state.user.topUsers);
  const topUserData: User[] = topUsers.data || [];
  const topUsersStatus = useSelector(
    (state: RootState) => state.user.topUsersStatus
  );

  useEffect(() => {
    dispatch(fetchAllUsers());
    dispatch(fetchTopUsers());
  }, []);

  const handleAddPoints = (userId: string) => {
    const addPointsPromise = dispatch(fetchAddPoints(userId)).unwrap();

    toast.promise(addPointsPromise, {
      loading: "Adding points...",
      success: (data: any) => {
        return data.message || "Points added successfully";
      },
      error: (error: any) => {
        return error || error.message;
      },
    });
  };

  return (
    <>
      {topUsersStatus === "loading" ? (
        <p>Loading...</p>
      ) : topUsersStatus === "failed" ? (
        <p>Error...</p>
      ) : topUsersStatus === "succeeded" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 w-[98%] gap-4 mx-auto my-6">
          <div className="w-full rounded-lg border-2 p-2 md:p-4 flex flex-col space-y-4">
            <h1 className="text-xl md:text-3xl text-center font-semibold mb-4">
              Leader Board
            </h1>
            <div className="w-full min-h-64 relative">
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <img
                  className="w-14 h-14 mx-auto animate-[bounce_2s_infinite_ease-in-out]"
                  src="https://img.icons8.com/?size=100&id=13728&format=png&color=000000"
                  alt=""
                />
                <Avatar className="w-28 h-28 outline outline-4 outline-primary">
                  <AvatarImage
                    src={topUserData[0].avatar ? topUserData[0].avatar : ""}
                  />
                  <AvatarFallback>{topUserData[0].name || "A"}</AvatarFallback>
                </Avatar>
                <p className="text-center mt-0.5">
                  {topUserData[0].name || ""}
                </p>
                <p className="text-center">
                  {topUserData[0].totalPoints || ""}
                </p>
              </div>
              <div className="absolute left-3/4 top-1/2 -translate-x-1/2 -translate-y-1/2 bottom-0 -z-10">
                <p className="text-center">2</p>
                <ChevronDown className="w-5 h-5 mx-auto" />
                <Avatar className="w-24 h-24 opacity-80">
                  <AvatarImage
                    src={topUserData[1].avatar ? topUserData[1].avatar : ""}
                  />
                  <AvatarFallback>{topUserData[1].name || "A"}</AvatarFallback>
                </Avatar>
                <p className="text-center">{topUserData[1].name || ""}</p>
                <p className="text-center">
                  {topUserData[1].totalPoints || ""}
                </p>
              </div>
              <div className="absolute left-1/4 top-1/2 -translate-x-1/2 -translate-y-1/2 bottom-0 -z-10">
                <p className="text-center">3</p>
                <ChevronDown className="w-5 h-5 mx-auto" />
                <Avatar className="w-24 h-24 opacity-80">
                  <AvatarImage
                    src={topUserData[2].avatar ? topUserData[2].avatar : ""}
                  />
                  <AvatarFallback>{topUserData[2].name || "A"}</AvatarFallback>
                </Avatar>
                <p className="text-center">{topUserData[2].name || ""}</p>
                <p className="text-center">
                  {topUserData[2].totalPoints || ""}
                </p>
              </div>
            </div>
            {topUserData.slice(3).map((user: User, index: number) => (
              <div
                key={user._id}
                className="flex justify-between space-x-2 p-2 bg-muted rounded-lg text-sm md:text-base"
              >
                <div className="flex space-x-2 my-auto">
                  <Avatar>
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>
                      {user.name[0] ? user.name[0].toUpperCase() : "A"}
                    </AvatarFallback>
                  </Avatar>

                  <p>{user.name}</p>
                </div>
                <div className="flex flex-col my-auto">
                  <p>Rank</p>
                  <p className="text-center">{index + 4}</p>
                </div>
                <div className="flex flex-col my-auto">
                  <p>Total Points</p>
                  <p className="text-center">{user.totalPoints}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="w-full rounded-lg border-2 p-2 md:p-4 flex flex-col space-y-4">
            <h1 className="text-xl md:text-3xl text-center font-semibold mb-4">
              All Users
            </h1>
            {allUserData.map((user: User) => (
              <div
                key={user._id}
                className="flex justify-between space-x-2 p-2 bg-muted rounded-lg text-sm md:text-base"
              >
                <div className="flex space-x-2 my-auto">
                  <Avatar>
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>
                      {user.name[0] ? user.name[0].toUpperCase() : "A"}
                    </AvatarFallback>
                  </Avatar>

                  <p>{user.name}</p>
                </div>
                <div className="flex flex-col my-auto">
                  <p>Total Points</p>
                  <p className="text-center">{user.totalPoints}</p>
                </div>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button size="sm" className="my-auto">
                      Claim
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to claim all points?
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleAddPoints(user._id)}
                      >
                        Claim
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
}
export default HomePage;
