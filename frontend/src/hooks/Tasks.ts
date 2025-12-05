import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setTasks } from "../reduxStore/TaskSlice";

export default function useTasks() {
  const tasks = useSelector((state: any) => state.tasks);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchTasks = async () => {
      try{
        console.log("server url", import.meta.env.VITE_SERVER_URL)
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}todos`);
      const data = await response.json();
      dispatch(setTasks(data));
      }catch(err){
        console.error("Failed to fetch tasks:", err);
      }
    }
    if(tasks.tasks.length === 0){
      fetchTasks();
    }
  }, [dispatch, tasks]);
}