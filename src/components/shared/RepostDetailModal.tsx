import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Models } from "appwrite";
import { Link } from "react-router-dom";
import { multiFormatDateString } from "@/lib/utils";
import { useDeletePost } from "@/lib/react-query/queries";
import { Button, Input } from "../ui";
import PostStats from "./PostStats";
import { DialogDescription } from "@radix-ui/react-dialog";

// 리포스트 타입 정의
interface Repost {
  post: Models.Document;
  // 필요한 다른 필드들 추가
}

interface RepostDetailModalProps {
  post: Repost | null;
  userId: string;
  isOpen: boolean;
  onClose: () => void;
}

// 상세 조회 Modal 컴포넌트
const RepostDetailModal: React.FC<RepostDetailModalProps> = ({
  post,
  userId,
  isOpen,
  onClose,
}) => {
  if (!post) return null;

  const { mutate: deletePost } = useDeletePost();

  const handleDeletePost = () => {
    deletePost({ postId: post.post.$id, imageId: post.post.imageId });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="repost_details-card">
        <DialogHeader className="relative">
          <DialogTitle></DialogTitle>
          <DialogDescription className="text-hidden">
            repost detail
          </DialogDescription>
        </DialogHeader>
        <div className="flex h-full">
          <div className="flex-1 h-full overflow-auto custom-scrollbar">
            <div className="repost-content h-full">
              <div>
                <img
                  src={post.post.imageUrl}
                  alt="creator"
                  className="repost_details-img"
                />
              </div>

              <div className="post_details-info">
                <div className="flex-between w-full">
                  <Link
                    to={`/profile/${post.post.creator.$id}`}
                    className="flex items-center gap-3">
                    <img
                      src={
                        post.post.creator?.imageUrl ||
                        "/assets/icons/profile-placeholder.svg"
                      }
                      alt="creator"
                      className="w-8 h-8 lg:w-12 lg:h-12 rounded-full"
                    />
                    <div className="flex gap-1 flex-col">
                      <p className="base-medium lg:body-bold text-light-1">
                        {post.post.creator?.name}
                      </p>
                      <div className="flex-center gap-2 text-light-3">
                        <p className="subtle-semibold lg:small-regular ">
                          {multiFormatDateString(post.post.creator?.$createdAt)}
                        </p>
                        •
                        <p className="subtle-semibold lg:small-regular">
                          {post.post.location}
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>

                <hr className="border w-full border-dark-4/80" />

                <div className="flex flex-col flex-1 w-full small-medium lg:base-regular">
                  <p>{post.post.caption}</p>
                  <ul className="flex gap-1 mt-2">
                    {post.post.tags.map((tag: string, index: string) => (
                      <li
                        key={`${tag}${index}`}
                        className="text-light-3 small-regular">
                        {tag != "" && `#${tag}`}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex-center gap-4">
                  <div
                    className={`${
                      userId !== post.post.creator?.$id && "hidden"
                    }`}>
                    <img
                      src={"/assets/icons/edit.svg"}
                      alt="edit"
                      width={24}
                      height={24}
                    />
                  </div>

                  <Button
                    onClick={handleDeletePost}
                    variant="ghost"
                    className={`ost_details-delete_btn ${
                      userId !== post.post.creator?.$id && "hidden"
                    }`}>
                    <img
                      src={"/assets/icons/delete.svg"}
                      alt="delete"
                      width={24}
                      height={24}
                    />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col flex-1 h-full overflow-auto repost_detail-comment">
            <div className="flex border-b border-dark-4/80">
              <Button
                onClick={onClose}
                className="ml-auto bg-dark-1 hover:bg-slate-900 p-2">
                <img
                  src={"/assets/icons/close.svg"}
                  alt="close"
                  width={24}
                  height={24}
                />
                <span className="text-hidden">닫기</span>
              </Button>
            </div>
            <div className="flex-1 overflow-auto custom-scrollbar">
              <ul className="py-2 px-4">
                <li>댓글1</li>
                <li>댓글2</li>
                <li>댓글3</li>
                <li>댓글1</li>
                <li>댓글2</li>
                <li>댓글3</li>
                <li>댓글1</li>
                <li>댓글2</li>
                <li>댓글3</li>
              </ul>
            </div>
            <div className="w-full p-4 border-t border-dark-4/80">
              <div className="pb-2">
                <PostStats post={post.post} userId={userId} />
              </div>
              <div className="pt-2">
                <Input
                  type="text"
                  placeholder="Comment"
                  className="repost-comment"
                />
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RepostDetailModal;
