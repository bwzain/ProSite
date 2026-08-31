import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCaseStudyBySlug, getCaseStudySlugs } from "@/lib/caseStudies/caseStudies";
import { CaseStudyDetailView } from "@/components/case-studies/CaseStudyDetail";

export const revalidate = 300;

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getCaseStudySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = await getCaseStudyBySlug(slug);
  if (!study) {
    return { title: "Case study not found" };
  }
  return {
    title: `${study.title} | Case Studies`,
    description: study.blocks[0]?.richText?.[0]?.plain_text ?? study.title,
  };
}

export default async function CaseStudyDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const study = await getCaseStudyBySlug(slug);

  if (!study) {
    notFound();
  }

  return (
    <div className="pt-16">
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <CaseStudyDetailView study={study} />
      </div>
    </div>
  );
}
