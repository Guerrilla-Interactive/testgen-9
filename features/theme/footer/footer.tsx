

import Link from "next/link";
import Logo from "../logo";

import RepeatingSvgBanner from "../../unorganized-components/repeating-svg-banner";
import { Facebook, LinkedIn, Instagram } from "@mui/icons-material";
import { Container, FlexCol, FlexRow, InnerSection, Section } from "@/features/unorganized-components/nextgen-core-ui";
import { MultipleArrowSVGAnimated } from "@/features/unorganized-components/arrow-svg/multiple-arrow-svg-animated.component";
import { MultipleArrowSVG } from "@/features/unorganized-components/arrow-svg/multiple-arrow-svg.component";
import { CoverMapBlockComponent } from "@/features/page-builder-blocks/blocks/cover-map-block";
import { FooterSettingsQueryResult } from "@/sanity.types";
import { Blocks } from "@/features/page-builder-blocks/block-component-exporter";


const navItems = [
  {
    label: "Home",
    href: "/",
    target: false,
  },
  {
    label: "Blog",
    href: "/blog",
    target: false,
  },
  {
    label: "About",
    href: "/about",
    target: false,
  },
];

export default function Footer(props: FooterSettingsQueryResult) {
  const getCurrentYear = () => {
    return new Date().getFullYear();
  };

  return (

    <>
    <Blocks blocks={props.blocks} />
        <CoverMapBlockComponent 
    center={{
      lat: 60.0093439,
      lng: 10.9797227,
      _type: "geopoint",
    }}
    
    />
    <footer>
      <RepeatingSvgBanner />
      <Section className="py-12 bg-[#D76B01]">
        {/* Kom i kontakt */}
        <InnerSection id="Kom i kontakt">
          <Container>
            <FlexRow  notAuto className="gap-x-12 justify-between border-b py-4 border-black border-opacity-30 ">
              <FlexCol>
                <h4 className="text-black text-[4rem] md:text-[6rem] uppercase font-bold">
                  Kom i kontakt
                </h4>
              </FlexCol>
              <FlexCol className="justify-self-end self-center">
                <MultipleArrowSVG className="h-[4rem] md:h-[6rem]" amount={3} />
              </FlexCol>
            </FlexRow>
          </Container>
        </InnerSection>
  
        <InnerSection id="Kontakt">
          <Container>
            <FlexRow className="justify-between py-32">
              <FlexCol className="max-w-screen-xs gap-y-4">
                <Logo className="max-w-64" orangeColor="#fff" />
                <p>
                  Veitrygghet ble grunnlagt med mål om å tilby sikkerhet og
                  trygghet på arbeidsplasser langs veiene. Møt vårt team av
                  erfarne fagfolk som brenner for sikkerhet og kvalitet. Vi
                  verdsetter sikkerhet, pålitelighet og profesjonalisme i alt vi
                  gjør.
                </p>
                <FlexRow notAuto className="mt-4 space-x-4 pb-12">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Facebook"
                  >
                    <Facebook className="text-black hover:text-white w-7 h-7" />
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="LinkedIn"
                  >
                    <LinkedIn className="text-black hover:text-white w-7 h-7" />
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Instagram"
                  >
                <Instagram className="text-black hover:text-white w-7 h-7" />
                  </a>
                </FlexRow>
              </FlexCol>

              <FlexCol>
                <FlexRow notAuto className="justify-between gap-x-24">
                  {/* Lenker */}
                  <FlexCol>
                    <h4 className="font-sans uppercase font-bold text-black tracking-tight text-base mb-3">
                      Lenker
                    </h4>
                    <ul className="flex flex-col gap-y-1">
                      <li>
                        <Link href="/tjenester">Tjenester</Link>
                      </li>
                      <li>
                        <Link href="#kurs">Kurs</Link>
                      </li>
                      <li>
                        <Link href="/karriere">Karriere</Link>
                      </li>
                      <li>
                        <Link href="/om-veitrygghet">Om Veitrygghet</Link>
                      </li>
                      <li>
                        <Link href="/kontakt">Kontakt</Link>
                      </li>
                    </ul>
                  </FlexCol>

                  {/* Kontakt */}
                  <FlexCol>
                    <h4 className="font-sans uppercase font-bold text-black tracking-tight text-base mb-3">
                      Kontakt
                    </h4>
                    <ul className="space-y-1">
                      <li>
                        
                        <a
                          href="mailto:info@veitrygghet.no"
                          className=" hover:text-gray-700"
                        >
                          info@veitrygghet.no
                        </a>
                      </li>
                      <li>
                        
                        Bølerveien 84, 2020 Skedsmokorset
                      </li>
                      <li>
                        
                        <a
                          href="tel:+4722300200"
                          className=" hover:text-gray-700"
                        >
                          +47 22 300 200
                        </a>
                      </li>
                      
                      <li>
                        <p>Org.nr:
                        928 409 074</p>
                      </li>
                    </ul>

                  </FlexCol>
                </FlexRow>
              </FlexCol>
            </FlexRow>
          </Container>
        </InnerSection>

        <InnerSection className="">
          <Container>
            <FlexRow className="justify-between py-4 border-t border-b  border-black border-opacity-30 my-6">
              <FlexCol>
              © 2024 Veitrygghet
              </FlexCol>
              <FlexCol>
              Nettside designet og utviklet av Frikk Jarl
              </FlexCol>
            </FlexRow>
          </Container>
        </InnerSection>
      </Section>
    </footer>
    </>
  );
}


