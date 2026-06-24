import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import AdminSidebar from "./AdminSidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user: authUser } } = await supabase.auth.getUser();

  let dbUser = null;
  if (authUser?.email) {
    dbUser = await prisma.user.findUnique({
      where: { email: authUser.email },
      select: { fullName: true, email: true }
    });
  }

  return (
    <div className="flex h-screen bg-[#F5F5F7] p-4 gap-4 overflow-hidden">
      {/* Floating Glassmorphic Sidebar */}
      <AdminSidebar user={dbUser || { email: 'admin@pureplast.co.ke', fullName: 'Admin' }} />

      {/* Main Content Area */}
      <main className="flex-1 bg-white rounded-[2rem] shadow-sm border border-[#E5E5E5] overflow-y-auto relative z-10">
        {children}
      </main>
    </div>
  );
}
