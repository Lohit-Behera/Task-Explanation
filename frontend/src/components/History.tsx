import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { fetchHistory } from "@/features/UserSlice";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import React from "react";
import HistoryLoader from "./Loader/HistoryLoader";
import { ScrollArea } from "@/components/ui/scroll-area";

type claim = {
  _id: string;
  user: string;
  points: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

function History({
  trigger,
  userId,
}: {
  trigger: React.ReactNode;
  userId: string;
}) {
  const dispatch = useDispatch<AppDispatch>();
  const history = useSelector((state: RootState) => state.user.history);
  const historyStatus = useSelector(
    (state: RootState) => state.user.historyStatus
  );

  const user: any = history.data.user || {};
  const claimHistory = history.data.claimHistory || [];

  const handleFetchHistory = () => {
    dispatch(fetchHistory(userId));
  };

  return (
    <Dialog>
      <DialogTrigger onClick={handleFetchHistory}>{trigger}</DialogTrigger>
      <DialogContent>
        <ScrollArea className="max-h-[50vh] w-full h-full p-4">
          <DialogHeader>
            <DialogTitle>Points History</DialogTitle>
          </DialogHeader>
          {historyStatus === "loading" ? (
            <HistoryLoader />
          ) : historyStatus === "failed" ? (
            <p>Error</p>
          ) : historyStatus === "succeeded" ? (
            <>
              <div className="flex space-x-2 bg-muted rounded-lg p-2 my-4">
                <Avatar>
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback>A</AvatarFallback>
                </Avatar>
                <p>{user.name}</p>
              </div>
              <div className="grid gap-2">
                {claimHistory.length === 0 ? (
                  <p className="text-center font-semibold">No claim history</p>
                ) : null}
                {claimHistory.map((claim: claim, index: number) => (
                  <div
                    key={index}
                    className="flex justify-between p-2 bg-muted rounded-lg text-sm md:text-base"
                  >
                    <p>Points: {claim.points}</p>
                    <p>{format(new Date(claim.createdAt), "PPP")}</p>
                  </div>
                ))}
              </div>
            </>
          ) : null}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

export default History;
