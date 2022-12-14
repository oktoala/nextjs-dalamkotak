import { useMDXComponent } from 'next-contentlayer/hooks';
import { getTweets } from 'lib/twitter';
import components from 'components/MDXComponents';
import Tweet from 'components/Tweet';
import { allProjects } from 'contentlayer/generated';
import type { Project } from 'contentlayer/generated';
import ProjectLayout from 'layouts/project';

export default function Project({
  post,
  tweets
}: {
  post: Project;
  tweets: any[];
}) {
  const Component = useMDXComponent(post.body.code);
  const StaticTweet = ({ id }) => {
    const tweet = tweets.find((tweet) => tweet.id === id);
    return <Tweet {...tweet} />;
  };

  return (
    <ProjectLayout post={post}>
      <Component
        components={
          {
            ...components,
            StaticTweet
          } as any
        }
      />
    </ProjectLayout>
  );
}

export async function getStaticPaths() {
  return {
    paths: allProjects.map((p) => ({ params: { slug: p.slug } })),
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const post = allProjects.find((post) => post.slug === params.slug);
  const tweets = await getTweets(post.tweetIds);

  return { props: { post, tweets } };
}
