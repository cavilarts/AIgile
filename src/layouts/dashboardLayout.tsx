"use client";

import DashBoardMenu from "@/components/DashBoardMenu/DashBoardMenu";

export const DashboardLayout: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  return (
    <div className="relative flex flex-col h-screen">
      <DashBoardMenu />
      <main className="relative container mx-auto max-w-7xl z-10 px-6 min-h-[calc(100vh_-_64px_-_108px)] mb-12 flex-grow">
        {children}
      </main>
      <footer className="w-full flex items-center justify-center py-3" />
    </div>
  );
};
