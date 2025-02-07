import { Models } from "appwrite";
import { Link } from "react-router-dom";

import { PostStats } from "@/components/shared";
import { multiFormatDateString } from "@/lib/utils";
import { useUserContext } from "@/context/AuthContext";

type NewsCardProps = {
  post: Models.Document;
};

const NewsCard = ({ post }: NewsCardProps) => {
  const { user } = useUserContext();

  if (!post.creator) return;

  return (
    <div className="news-card">
      <div className="flex-between">
        <div className="flex items-center gap-3">
          <Link to={`/profile/${post.creator.$id}`}>
            {/* <img
              src={
                post.creator?.imageUrl ||
                "/assets/icons/profile-placeholder.svg"
              }
              alt="creator"
              className="w-12 lg:h-12 rounded-full"
            /> */}
            <span className="inline-flex justify-center items-center w-12 h-12 rounded-full bg-light-4">
              📰
            </span>
          </Link>

          <div className="flex flex-col">
            <Link to={`/profile/${post.creator.$id}`}>
              <p className="base-medium lg:body-bold text-light-1">
                {post.location}
              </p>
            </Link>
            <div className="gap-2 text-light-3">
              <p className="subtle-semibold lg:small-regular ">
                {multiFormatDateString(post.$createdAt)}
              </p>
            </div>
          </div>
        </div>

        <Link
          to={`/update-post/${post.$id}`}
          className={`${user.id !== post.creator.$id && "hidden"}`}>
          <img
            src={"/assets/icons/edit.svg"}
            alt="edit"
            width={20}
            height={20}
          />
        </Link>
      </div>

      <div className="py-5 break-all">
        <Link to={`/posts/${post.$id}`}>
          <div>
            <h3 className="base-semibold lg:body-semibold mb-2 break-keep">
              {post.title}
            </h3>
            <div className="xs:flex xs:flex-row gap-3">
              <div className="w-full h-48 xs:h-32 xs:w-32 lg:h-48 lg:w-48">
                <img
                  src={post.imageUrl || "/assets/icons/profile-placeholder.svg"}
                  alt="news image"
                  className="news-card_img"
                />
              </div>
              <div className="small-medium lg:base-medium xs:flex-1 w-full">
                <p className="text-light-2">{post.caption}</p>
              </div>
            </div>
          </div>
        </Link>
        <div className="mt-4">
          <a
            href={post.originalUrl}
            className="text-light-4 hover:text-light-3 hover:transition-all">
            {post.originalUrl}
          </a>
          <ul className="flex gap-1 mt-2">
            {post.tags.map((tag: string, index: string) => (
              <li key={`${tag}${index}`} className="text-light-3 small-regular">
                {tag != "" && `#${tag}`}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <PostStats post={post} userId={user.id} />
    </div>
  );
};

export default NewsCard;
