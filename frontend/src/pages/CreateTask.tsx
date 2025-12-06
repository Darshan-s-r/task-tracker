import React, { useState, useRef, useEffect } from "react";
import type { TaskType } from "../types/TaskType";
import { toast } from "react-toastify/unstyled";
import { useDispatch } from "react-redux";
import { addTask } from "../reduxStore/TaskSlice";

export default function Task() {
  const dispatch = useDispatch();

  const recognitionRef = useRef<any>(null);
  const [listening, setListening] = useState(false);
  const [rawTest, setRawTest] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    dueDate: "",
    priority: "medium" as TaskType["priority"],
    status: "todo" as TaskType["status"],
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  function initRecognition() {
    if (recognitionRef.current) return;

    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      toast.error("Speech recognition not supported");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = (event: any) => {
      const transcript = Array.from(event.results)
        .map((result: any) => result[0].transcript)
        .join("");

      setRawTest(transcript);
    };

    recognition.onerror = () => {
      toast.error("Speech recognition error");
      setListening(false);
    };

    recognitionRef.current = recognition;
  }

  const startListening = () => {
    initRecognition();
    try {
      recognitionRef.current?.start();
      setListening(true);
    } catch {}
  };

  const handleListeningComplete = async () => {
    try {
      const res = await fetch(
        import.meta.env.VITE_SERVER_URL + "ai/extract-data",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ rawText: rawTest }),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Failed to extract task");
        return;
      }
      const task = JSON.parse(data.task);
      console.log("Extracted Task:", task);
      setFormData({
        title: task.title || "",
        dueDate:task.dueDate.includes("T")
  ? task.dueDate.split("T")[0].trim()
  : task.dueDate.split(" ")[0].trim() || "",
        priority: task.priority || "medium",
        status: task.status || "todo",
      });
    } catch {
      toast.error("Failed to extract task data");
    }
  };

  const stopListening = () => {
    try {
      recognitionRef.current?.stop();
    } catch {}
    setListening(false);

    if (rawTest.trim() !== "") {
      setTimeout(() => handleListeningComplete(), 100);
    }
  };

  useEffect(() => {
    return () => {
      try {
        recognitionRef.current?.stop();
      } catch {}
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(import.meta.env.VITE_SERVER_URL + "addtodo", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Failed to create task");
        return;
      }

      toast.success(data.message || "Task created");
      dispatch(addTask(data.task));

      setFormData({
        title: "",
        dueDate: "",
        priority: "medium",
        status: "todo",
      });
    } catch {}
  };

  function handlereset() {
    setFormData({
      title: "",
      dueDate: "",
      priority: "medium",
      status: "todo",
    });
  }

  return (
<div className="min-h-screen bg-gradient-to-br from-indigo-200 via-blue-200 to-sky-200 dark:bg-slate-900 py-8 px-4">
      <div className="max-w-2xl mx-auto">

        <h1 className="text-3xl sm:text-4xl font-bold text-indigo-900 dark:text-indigo-300 mb-8">
          Create Task
        </h1>

        <form
          onSubmit={handleSubmit}
 className="bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg shadow-md p-6 sm:p-8">
        
          <p className="text-slate-900 dark:text-rose-200 pb-6">{rawTest}</p>

          {/* Title */}
          <div className="mb-6">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-slate-900 dark:text-rose-200 mb-2"
            >
              Task Title <span className="text-rose-400">*</span>
            </label>

            <div className="flex items-center gap-2">
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="Enter task title"
className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-200 focus:ring-2 focus:ring-indigo-500"              />

              <button
                type="button"
                onClick={() => (listening ? stopListening() : startListening())}
                className={`px-3 py-2 rounded-md border-2 ${
                  listening
                    ? "bg-rose-400 text-white border-slate-900"
                    : "bg-rose-200 text-slate-900 border-slate-900"
                }`}
              >
                {listening ? "🎤 Listening" : "🎤"}
              </button>
            </div>
          </div>

          {/* Due Date */}
          <div className="mb-6">
            <label
              htmlFor="dueDate"
              className="block text-sm font-medium text-slate-900 dark:text-rose-200 mb-2"
            >
              Due Date <span className="text-rose-400">*</span>
            </label>
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              required
className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-200 focus:ring-2 focus:ring-indigo-500"            />
          </div>

          {/* Priority */}
          <div className="mb-6">
            <label
              htmlFor="priority"
              className="block text-sm font-medium text-slate-900 dark:text-rose-200 mb-2"
            >
              Priority <span className="text-rose-400">*</span>
            </label>

            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-200 focus:ring-2 focus:ring-indigo-500"              >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          {/* Status */}
          <div className="mb-6">
            <label
              htmlFor="status"
              className="block text-sm font-medium text-slate-900 dark:text-rose-200 mb-2"
            >
              Status <span className="text-rose-400">*</span>
            </label>

            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-200 focus:ring-2 focus:ring-indigo-500"              >
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          {/* BUTTONS */}
          <div className="flex gap-4 justify-end">
            <button
              type="reset"
              onClick={handlereset}
              className="px-6 py-2 border-2 border-slate-900 dark:border-purple-400 rounded-md text-slate-900 dark:text-rose-200 hover:bg-rose-200 hover:text-slate-900 transition"
            >
              Reset
            </button>

            <button
              type="submit"
  className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
            >
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
