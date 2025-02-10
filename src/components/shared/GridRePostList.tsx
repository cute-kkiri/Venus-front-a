import { Models } from "appwrite";

import { PostStats } from "@/components/shared";
import { useUserContext } from "@/context/AuthContext";
import { Button } from "../ui";
import React from "react";
import RepostDetailModal from "./RepostDetailModal";

type GridPostListProps = {
  posts: Models.Document[];
  showUser?: boolean;
  showStats?: boolean;
};

const GridPostList = ({
  posts,
  showUser = true,
  showStats = true,
}: GridPostListProps) => {
  const { user } = useUserContext();

  const [selectedRepost, setSelectedRepost] =
    React.useState<Models.Document | null>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleRepostClick = (repost: Models.Document) => {
    console.log("click event", repost);
    setSelectedRepost(repost);
    setIsModalOpen(true);
  };

  return (
    <div>
      <ul className="grid-container">
        {posts.map((post) => (
          <li key={post.$id} className="relative min-w-80 h-80">
            <Button
              onClick={() => handleRepostClick(post)}
              className="grid-post_link">
              <img
                src={post.imageUrl}
                alt="post"
                className="h-full w-full object-cover"
              />
            </Button>

            <div className="grid-post_user">
              {showUser && (
                <div className="flex items-center justify-start gap-2 flex-1">
                  <img
                    src={
                      post.creator?.imageUrl ||
                      "/assets/icons/profile-placeholder.svg"
                    }
                    alt="creator"
                    className="w-8 h-8 rounded-full"
                  />
                  <p className="line-clamp-1">{post.creator?.name}</p>
                </div>
              )}
              {showStats && <PostStats post={post} userId={user.id} />}
            </div>
          </li>
        ))}
      </ul>

      {selectedRepost && (
        <RepostDetailModal
          post={selectedRepost ? { post: selectedRepost } : null}
          userId={user.id}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default GridPostList;
