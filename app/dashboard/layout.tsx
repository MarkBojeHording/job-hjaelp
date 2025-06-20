import { Header } from '@/components/Header';

export default function DashboardSectionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
