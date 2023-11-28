// import Reviews from "@/components/Reviews";
import ImageFallback from "@/helpers/ImageFallback";
import { getListPage } from "@/lib/contentParser";
import { markdownify } from "@/lib/utils/textConverter";
// import CallToAction from "@/partials/CallToAction";
import Footer from "@/partials/Footer";
import SeoMeta from "@/partials/SeoMeta";
// import Testimonials from "@/partials/Testimonials";
import { Button, Feature } from "@/types";
import { FaCheck } from "react-icons/fa/index.js";
import Link from "next/link";
import Image from "next/image";

const Home = () => {
  const homepage = getListPage("_index.md");
  const { frontmatter } = homepage;
  const {
    banner,
    features,
  }: {
    banner: { title: string; image: string; content?: string; button?: Button };
    features: Feature[];
  } = frontmatter;

  return (
    <>
      <SeoMeta />
      <section className="section pt-7">
        <div className="container">
          <div className="row justify-center">
            <div className="mb-12 text-center lg:col-7">
              <h1 className="mb-6">כיף קוד</h1>
              <p dir="rtl"
                className="mb-4 text-justify text-lg"
                dangerouslySetInnerHTML={markdownify(banner.content ?? "")}
              />
                <Link className="btn btn-primary" href={banner.button!.link}>
                  {banner.button!.label}
                </Link>
            </div>
              <div className="col-12">
                <ImageFallback
                  src={banner.image}
                  className="mx-auto"
                  width="700"
                  height="330"
                  alt="banner image"
                  priority
                />
              </div>
          </div>
        </div>
      </section>

      {features.map((feature, index: number) => (
        <section
          key={index}
          className={`section-sm ${index % 2 === 0 && "bg-gradient"}`}
        >
          <div className="container">
            <div className="row items-center justify-between">
              <div
                className={`mb:md-0 mb-6 md:col-5 ${
                  index % 2 !== 0 && "md:order-2"
                }`}
              >
                <ImageFallback
                  src={feature.image}
                  height={480}
                  width={520}
                  alt={feature.title}
                />
              </div>
              <div
                className={`md:col-7 lg:col-6 ${
                  index % 2 !== 0 && "md:order-1"
                }`}
              >
                <h2
                  className="mb-4 text-center"
                  dangerouslySetInnerHTML={markdownify(feature.title)}
                />
                <p
                  className="mb-8 text-lg"
                  dangerouslySetInnerHTML={markdownify(feature.content)}
                />
                <ul>
                  {feature.bulletpoints.map((bullet: string) => (
                    <li className="relative mb-4 pr-6 text-right" key={bullet}>
                      <FaCheck className={"absolute right-0 top-1.5"} />
                      <span dangerouslySetInnerHTML={markdownify(bullet)} />
                    </li>
                  ))}
                </ul>
                {feature.button.enable && (
                  <div className="flex justify-center">
                    <a
                      className="btn inline-block btn-primary mt-5"
                      href={feature.button.link}
                    >
                      {feature.button.label}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      ))}
      <div className="mb-10">
        <h3 dir="rtl" className="flex justify-center">
          צרו איתנו קשר:
        </h3>
        <div className="flex justify-center">
        <Link
          href={"https://discord.gg/Mht9WcSKqp"}
          target="_blank"
          className="rounded-full w-36 bg-indigo-300 mt-4 items-center flex justify-center gap-2"
        >
          דיסקורד
          <Image
            src={"/images/discord.png"}
            alt="discord"
            width={20}
            height={20}
          />
        </Link>
        </div>
      </div>
      {/* <CallToAction data={callToAction} />  */}
      {/* <Reviews data={testimonial} /> */}

      <Footer />
    </>
  );
};

export default Home;
