
import { VisualEditing } from "next-sanity";
import { draftMode } from "next/headers";
import { SanityLive } from "@/sanity/lib/live";
import Header from "@/features/theme/header";
import { DisableDraftMode } from "@/features/unorganized-components/disable-draft-mode";
<<<<<<< Updated upstream
import Footer from "@/features/theme/footer";
=======
import Footer from "@/features/theme/footer/footer";
// get isTopDark from context
import { useGlobalContext } from "@/features/context/global-context";
import { fetchSettings } from "@/sanity/desk-organized-sanity-utilities/settings/settings.query";



>>>>>>> Stashed changes

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
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
