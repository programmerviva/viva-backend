import mongoose from "mongoose";
import { Comment } from "../models/comment.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getVideoComments = asyncHandler(async (req, res) => {
  //TODO: get all comments for a video
  const { videoId } = req.params;
  const { page = 1, limit = 10 } = req.query;

  const comments = await Comment.aggregate([
    {
      $match: {
        video: new mongoose.Types.ObjectId(String(videoId)),
      },
    },
    {
      $project: {
        _id: 0,
        content: 1,
      },
    },
    {
      $skip: (page - 1) * limit,
    },
    {
      $limit: perseInt(limit),
    },
  ]);

  const totalComments = await Comment.countDocuments({
    video: videoId,
  });

  if (!comments.length) {
    throw new ApiError(404, "No comments found here.");
  }

  const hasNextPage = page * limit < totalComments;
  const hasPreviousPage = page > 1;

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        totalComments,
        currentPage: parseInt(page),
        limit: parseInt(limit),
        nextPage: hasNextPage ? parseInt(page) + 1 : null,
        previousPage: hasPreviousPage ? parseInt(page) - 1 : null,
        comments,
      },
      "Comments fetched successfully"
    )
  );
});

const addComment = asyncHandler(async (req, res) => {
  // TODO: add a comment to a video
  const { videoId } = req.params;
  const { content } = req.body;

  if(!mongoose.isValidObjectId(videoId)|| ! await videoId.exist(new mongoose.Types.ObjectId(String(videoId))))
    {
    throw new ApiError(400, "Video is invalid.");
  }

  if(!content?.trim()) {
    throw new ApiError(400, "Content is missing.");
  }

  const comment = await Comment.create({
    content,
    video: new mongoose.Types.ObjectId(videoId),
    user: req.user?._id,
  })

  if(!comment) {
    throw new ApiError(500, "Unable to add comment.");
  }

  return res.status(201).json(
    new ApiResponse(
      201,
      { comment },
      "Comment added successfully"
    )
  );


});

const updateComment = asyncHandler(async (req, res) => {
  // TODO: update a comment
  const {commentId} = req.params;
  const { content} = req.body;

  if(!mongoose.isValidObjectId(commentId)){
    throw new ApiError(400, "Comment is invalid.");
  }

  if(!content?.trim()) {
    throw new ApiError(400, "Content is missing.");
  }

  const updateComment = await Comment.findByIdAndUpdate(commentId, {
    $set: {
      content
    },
  },
  {new: true})

  if(!updateComment) {
    throw new ApiError(500, "Unable to update comment.");
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      {updateComment },
      "Comment updated successfully"
    )
  );
 });



const deleteComment = asyncHandler(async (req, res) => {
  // TODO: delete a comment
  const { commentId } = req.params;

  if(!mongoose.isValidObjectId(commentId)){
    throw new ApiError(400, "Comment is invalid.");
  }
  const deletedComment = await Comment.findByIdAndDelete(new mongoose.Types.ObjectId(String(commentId)))

  if(!deletedComment) {
    throw new ApiError(404, "Unable to delete comment.");
  }
  return res.status(200).json(
    new ApiResponse(
      200,
      { deletedComment },
      "Comment deleted successfully"
    ))


});

export { getVideoComments, addComment, updateComment, deleteComment };
