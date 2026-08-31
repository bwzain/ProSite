import type { ReactNode } from "react";
import type { NotionRichText, RenderBlock } from "@/lib/caseStudies/types";
import { cn } from "@/lib/cn";

function RichText({ segments }: { segments: NotionRichText[] | undefined }) {
  if (!segments?.length) return null;

  return (
    <>
      {segments.map((segment, index) => {
        const text = segment.plain_text ?? "";
        if (!text) return null;

        let node: ReactNode = text;
        const a = segment.annotations;

        if (a?.code) {
          node = (
            <code className="rounded bg-slate-200/80 px-1 py-0.5 text-sm dark:bg-slate-800">
              {node}
            </code>
          );
        }
        if (a?.bold) node = <strong>{node}</strong>;
        if (a?.italic) node = <em>{node}</em>;
        if (a?.underline) node = <span className="underline">{node}</span>;
        if (a?.strikethrough) node = <span className="line-through">{node}</span>;

        if (segment.href) {
          node = (
            <a
              href={segment.href}
              className="text-sky-600 underline underline-offset-2 hover:text-sky-500 dark:text-sky-400"
              target="_blank"
              rel="noopener noreferrer"
            >
              {node}
            </a>
          );
        }

        return <span key={`${index}-${text.slice(0, 12)}`}>{node}</span>;
      })}
    </>
  );
}

function BlockItem({ block }: { block: RenderBlock }) {
  switch (block.type) {
    case "heading_1":
      return (
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          <RichText segments={block.richText} />
        </h2>
      );
    case "heading_2":
      return (
        <h3 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
          <RichText segments={block.richText} />
        </h3>
      );
    case "heading_3":
      return (
        <h4 className="text-xl font-semibold text-slate-900 dark:text-white">
          <RichText segments={block.richText} />
        </h4>
      );
    case "bulleted_list_item":
      return (
        <li className="ml-5 list-disc text-slate-700 dark:text-slate-300">
          <RichText segments={block.richText} />
        </li>
      );
    case "numbered_list_item":
      return (
        <li className="ml-5 list-decimal text-slate-700 dark:text-slate-300">
          <RichText segments={block.richText} />
        </li>
      );
    case "quote":
      return (
        <blockquote className="border-l-4 border-sky-500 pl-4 italic text-slate-600 dark:text-slate-400">
          <RichText segments={block.richText} />
        </blockquote>
      );
    case "callout":
      return (
        <div className="flex gap-3 rounded-2xl border border-sky-200/60 bg-sky-50/80 p-4 dark:border-sky-900/50 dark:bg-sky-950/30">
          {block.calloutIcon ? (
            <span className="text-xl leading-none" aria-hidden>
              {block.calloutIcon}
            </span>
          ) : null}
          <div className="text-slate-700 dark:text-slate-300">
            <RichText segments={block.richText} />
          </div>
        </div>
      );
    case "image":
      if (!block.imageUrl) return null;
      return (
        <figure className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={block.imageUrl} alt={block.imageCaption || ""} className="w-full object-cover" />
          {block.imageCaption ? (
            <figcaption className="px-4 py-2 text-sm text-slate-500 dark:text-slate-400">
              {block.imageCaption}
            </figcaption>
          ) : null}
        </figure>
      );
    case "divider":
      return <hr className="border-slate-200 dark:border-slate-800" />;
    case "paragraph":
    default:
      return (
        <p className="leading-relaxed text-slate-700 dark:text-slate-300">
          <RichText segments={block.richText} />
        </p>
      );
  }
}

export function NotionBlocks({
  blocks,
  className,
}: {
  blocks: RenderBlock[];
  className?: string;
}) {
  const elements: ReactNode[] = [];
  let listType: "ul" | "ol" | null = null;
  let listItems: React.ReactNode[] = [];

  const flushList = () => {
    if (!listType || !listItems.length) return;
    if (listType === "ul") {
      elements.push(
        <ul key={`ul-${elements.length}`} className="space-y-2">
          {listItems}
        </ul>,
      );
    } else {
      elements.push(
        <ol key={`ol-${elements.length}`} className="space-y-2">
          {listItems}
        </ol>,
      );
    }
    listType = null;
    listItems = [];
  };

  for (const block of blocks) {
    if (block.type === "bulleted_list_item") {
      if (listType !== "ul") {
        flushList();
        listType = "ul";
      }
      listItems.push(<BlockItem key={block.id} block={block} />);
      continue;
    }

    if (block.type === "numbered_list_item") {
      if (listType !== "ol") {
        flushList();
        listType = "ol";
      }
      listItems.push(<BlockItem key={block.id} block={block} />);
      continue;
    }

    flushList();
    if (block.type === "child_page") continue;
    elements.push(
      <div key={block.id}>
        <BlockItem block={block} />
      </div>,
    );
  }

  flushList();

  return <div className={cn("space-y-4", className)}>{elements}</div>;
}
