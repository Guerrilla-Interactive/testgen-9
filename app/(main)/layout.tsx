
import { VisualEditing } from "next-sanity";
import { draftMode } from "next/headers";
import { SanityLive } from "@/sanity/lib/live";
import Header from "@/features/theme/header";
import { DisableDraftMode } from "@/features/unorganized-components/disable-draft-mode";
import Footer from "@/features/theme/footer/footer";


import { useGlobalContext } from "@/features/context/global-context";
import { fetchSettings } from "@/sanity/desk-organized-sanity-utilities/settings/settings.query";





export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await fetchSettings();
  
  return (
    <>
      <Header {...settings}/>
      <main>{children}</main>
      <SanityLive />
      {(await draftMode()).isEnabled && (
        <>
          <DisableDraftMode />
          <VisualEditing />
        </>
      )}
      <Footer />
    </>
  );
}
