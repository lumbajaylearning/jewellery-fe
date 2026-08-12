import HeroBanner from "./HeroBanner";
import CategorySection from "./CategorySection";
import HomeTrial from "./HomeTrial";
import FeaturedJewellery from "./FeaturedJewellery";
import HowItWorks from "./HowItWorks";
import Testimonials from "./Testimonials";
import FinalCTA from "./FinalCTA";
import { Section } from "@/app/types/homepage";


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
                    case "homepage.hero-banner": {
                        const { id, __component, ...props } = section;
                        return <HeroBanner key={id} {...props} />;
                    }

                    case "homepage.category-section": {
                        const { id, __component, ...props } = section;
                        return <CategorySection key={id} {...props} />;
                    }

                    case "homepage.home-trial": {
                        const { id, __component, ...props } = section;
                        return <HomeTrial key={id} {...props} />;
                    }

                    case "homepage.featured-jewellery": {
                        const { id, __component, ...props } = section;
                        return (
                            <FeaturedJewellery key={id} {...props} />
                        );
                    }

                    case "homepage.how-it-works": {
                        const { id, __component, ...props } = section;
                        return <HowItWorks key={id} {...props} />;
                    }

                    case "homepage.testimonials": {
                        const { id, __component, ...props } = section;
                        return <Testimonials key={id} {...props} />;
                    }

                    case "homepage.final-cta": {
                        const { id, __component, ...props } = section;
                        return <FinalCTA key={id} {...props} />;
                    }

                    default:
                        console.warn(
                            `Unknown Strapi component: ${(section as { __component: string }).__component}`
                        );

                        return null;
                }
            })}
        </>
    );
}