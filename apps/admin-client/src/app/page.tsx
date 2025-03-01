"use client";
import { DashboardLayout } from "@/components/layout/DashoardLayout";
import { useQuery } from "@tanstack/react-query";

export default function Dashboard() {
  const fetchSessions = async () => {
    const response = await fetch("http://localhost:8000/sessions");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  };

  // const sessions = await fetchSessions();

  const { data } = useQuery({
    queryKey: ["sessions"],
    queryFn: fetchSessions,
    // initialData: sessions
  });

  return <div>This is content for sessions</div>;
}
