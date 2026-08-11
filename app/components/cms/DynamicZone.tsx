import HeroBanner from "./HeroBanner";
import CategorySection from "./CategorySection";
import HomeTrial from "./HomeTrial";
import FeaturedJewellery from "./FeaturedJewellery";
import HowItWorks from "./HowItWorks";
import Testimonials from "./Testimonials";
import FinalCTA from "./FinalCTA";

type Section = {
    id: number;
    __component: string;
    [key: string]: unknown;
};

type DynamicZoneProps = {
    sections: Section[];
};

export default function DynamicZone({
    sections,
}: DynamicZoneProps) {
    return (
        <>
            {sections.map((section) => {
                switch (section.__component) {
                    case "homepage.hero-banner":
                        return <HeroBanner key={section.id} {...section} />;

                    case "homepage.category-section":
                        return <CategorySection key={section.id} {...section} />;

                    case "homepage.home-trial":
                        return <HomeTrial key={section.id} {...section} />;

                    case "homepage.featured-jewellery":
                        return (
                            <FeaturedJewellery key={section.id} {...section} />
                        );

                    case "homepage.how-it-works":
                        return <HowItWorks key={section.id} {...section} />;

                    case "homepage.testimonials":
                        return <Testimonials key={section.id} {...section} />;

                    case "homepage.final-cta":
                        return <FinalCTA key={section.id} {...section} />;

                    default:
                        console.warn(
                            `Unknown Strapi component: ${section.__component}`
                        );

                        return null;
                }
            })}
        </>
    );
}