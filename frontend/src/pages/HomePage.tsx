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
import History from "@/components/History";
import UserLoader from "@/components/Loader/UserLoader";
import { ScrollArea } from "@/components/ui/scroll-area";
import crown from "@/assets/crown.png";
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
  const allUsersStatus = useSelector(
    (state: RootState) => state.user.allUsersStatus
  );
  const topUsers = useSelector((state: RootState) => state.user.topUsers);
  const topUserData: User[] = topUsers.data || [];
  const rankOne = topUserData[0] || {};
  const rankTwo = topUserData[1] || {};
  const rankThree = topUserData[2] || {};

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
        dispatch(fetchAllUsers());
        dispatch(fetchTopUsers());
        return data.message || "Points added successfully";
      },
      error: (error: any) => {
        return error || error.message;
      },
    });
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 w-[98%] gap-4 mx-auto my-6">
        <div className="w-full rounded-lg border-2 p-2 md:p-4 flex-col space-y-4">
          <h1 className="text-xl md:text-3xl text-center font-semibold mb-4">
            Leader Board
          </h1>
          {topUsersStatus === "loading" ? (
            <UserLoader />
          ) : topUsersStatus === "failed" ? (
            <p className="text-center text-xl font-semibold">
              Something went wrong Try Reloading
            </p>
          ) : topUsersStatus === "succeeded" ? (
            <>
              <div className="w-full min-h-64 relative">
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <img
                    className="w-14 h-14 mx-auto animate-[bounce_2s_infinite_ease-in-out]"
                    src={crown}
                    alt="crown"
                  />
                  <Avatar className="w-28 h-28 outline outline-4 outline-primary">
                    <AvatarImage src={rankOne?.avatar ? rankOne.avatar : ""} />
                    <AvatarFallback>
                      {rankOne.name ? rankOne.name : "A"}
                    </AvatarFallback>
                  </Avatar>
                  <p className="text-center mt-0.5">
                    {rankOne.name ? rankOne.name : ""}
                  </p>
                  <p className="text-center">
                    {rankOne.totalPoints ? rankOne.totalPoints : ""}
                  </p>
                </div>
                <div className="absolute left-3/4 top-1/2 -translate-x-1/2 -translate-y-1/2 bottom-0 -z-10">
                  <p className="text-center">2</p>
                  <ChevronDown className="w-5 h-5 mx-auto" />
                  <Avatar className="w-24 h-24 opacity-80">
                    <AvatarImage src={rankTwo.avatar ? rankTwo.avatar : ""} />
                    <AvatarFallback>
                      {rankTwo.name ? rankTwo.name : "A"}
                    </AvatarFallback>
                  </Avatar>
                  <p className="text-center">
                    {rankTwo.name ? rankTwo.name : ""}
                  </p>
                  <p className="text-center">
                    {rankTwo.totalPoints ? rankTwo.totalPoints : ""}
                  </p>
                </div>
                <div className="absolute left-1/4 top-1/2 -translate-x-1/2 -translate-y-1/2 bottom-0 -z-10">
                  <p className="text-center">3</p>
                  <ChevronDown className="w-5 h-5 mx-auto" />
                  <Avatar className="w-24 h-24 opacity-80">
                    <AvatarImage
                      src={rankThree.avatar ? rankThree.avatar : ""}
                    />
                    <AvatarFallback>
                      {rankThree.name ? rankThree.name : "A"}
                    </AvatarFallback>
                  </Avatar>
                  <p className="text-center">
                    {rankThree.name ? rankThree.name : ""}
                  </p>
                  <p className="text-center">
                    {rankThree.totalPoints ? rankThree.totalPoints : ""}
                  </p>
                </div>
              </div>
              <ScrollArea className="max-h-[340px] h-full w-full overflow-y-auto p-4">
                <div className="grid gap-4">
                  {topUserData.slice(3).map((user: User, index: number) => (
                    <div
                      key={user._id}
                      className="flex justify-between space-x-2 p-2 bg-muted rounded-lg text-sm md:text-base"
                    >
                      <div className="flex space-x-2 my-auto w-1/2">
                        <Avatar>
                          <AvatarImage src={user.avatar ? user.avatar : ""} />
                          <AvatarFallback>
                            {user.name[0] ? user.name[0].toUpperCase() : "A"}
                          </AvatarFallback>
                        </Avatar>

                        <p>{user.name}</p>
                      </div>
                      <div className="flex justify-between w-1/2">
                        <div className="flex flex-col my-auto">
                          <p>Rank</p>
                          <p className="text-center">{index + 4}</p>
                        </div>
                        <div className="flex flex-col my-auto">
                          <p>Total Points</p>
                          <p className="text-center">{user.totalPoints}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </>
          ) : null}
        </div>
        <div className="w-full rounded-lg border-2">
          <h1 className="text-xl md:text-3xl text-center font-semibold my-2">
            All Users
          </h1>
          {allUsersStatus === "loading" ? (
            <UserLoader />
          ) : allUsersStatus === "failed" ? (
            <p className="text-center text-xl font-semibold">
              Something went wrong Try Reloading
            </p>
          ) : allUsersStatus === "succeeded" ? (
            <ScrollArea className="max-h-[600px] md:max-h-[640px] h-full w-full overflow-y-auto p-4">
              <div className="grid gap-4">
                {allUserData.map((user: User) => (
                  <div
                    key={user._id}
                    className="flex justify-between space-x-2 p-2 bg-muted rounded-lg text-sm md:text-base"
                  >
                    <div className="flex space-x-2 my-auto w-1/2">
                      <History
                        trigger={
                          <Avatar className="outline-primary hover:outline outline-offset-2">
                            <AvatarImage src={user.avatar ? user.avatar : ""} />
                            <AvatarFallback>
                              {user.name[0] ? user.name[0].toUpperCase() : "A"}
                            </AvatarFallback>
                          </Avatar>
                        }
                        userId={user._id}
                      />
                      <History
                        trigger={<p className="hover:underline">{user.name}</p>}
                        userId={user._id}
                      />
                    </div>
                    <div className="flex justify-between w-1/2">
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
                  </div>
                ))}
              </div>
            </ScrollArea>
          ) : null}
        </div>
      </div>
    </>
  );
}
export default HomePage;
