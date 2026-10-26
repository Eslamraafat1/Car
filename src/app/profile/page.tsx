import type { Metadata } from "next";
import ProfileView from "@/components/pages/ProfileView";

export const metadata: Metadata = {
  title: "ملف الشركة · Company Profile",
  robots: { index: false, follow: true },
};

export default function ProfilePage() {
  return <ProfileView />;
}
