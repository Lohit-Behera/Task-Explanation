import { fetchAllUsers } from "@/features/UserSlice";
import { AppDispatch, RootState } from "@/store/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
function HomePage() {
  const dispatch = useDispatch<AppDispatch>();

  const allUsers = useSelector((state: RootState) => state.user.allUsers);

  console.log(allUsers);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, []);

  return (
    <div>
      <h1>Home page</h1>
    </div>
  );
}
export default HomePage;
