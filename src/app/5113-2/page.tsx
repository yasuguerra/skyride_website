import { redirect } from "next/navigation";

// Phantom WordPress page — redirect to homepage
export default function Page() {
  redirect("/");
}
