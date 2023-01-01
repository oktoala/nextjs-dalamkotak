/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import useSWR from 'swr';

import fetcher from 'lib/fetcher';
import { Views } from 'lib/types';
import type { Project } from 'contentlayer/generated';
import Image from 'next/image';

export default function ProjectPost({
  title,
  summary,
  slug,
  logo
}: Pick<Project, 'title' | 'summary' | 'slug' | 'logo'>) {
  const { data } = useSWR<Views>(`/api/views/${slug}`, fetcher);
  const views = data?.total;

  return (
    <Link href={`/project/${slug}`}>
      <a className="w-full">
        <div className="w-full mb-8">
          <div className="flex flex-col justify-between md:flex-row">
            <div className="flex items-center justify-center mb-2">
              <img width={32} height={32} src={logo} alt={title} />
              <h4 className="w-full ml-1 text-lg font-medium text-gray-900 md:text-xl dark:text-gray-100">
                {title}
              </h4>
            </div>
            <p className="w-32 mb-4 text-left text-gray-500 md:text-right md:mb-0">
              {`${views ? new Number(views).toLocaleString() : '–––'} views`}
            </p>
          </div>
          <p className="text-gray-600 dark:text-gray-400">{summary}</p>
        </div>
      </a>
    </Link>
  );
}
