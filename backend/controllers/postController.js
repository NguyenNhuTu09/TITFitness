import Food from "../models/Food.js"
import Exercise from '../models/Exercise.js'

export const FoodLike = async (req, res) => {
  try {
      const id = req.params.id
      const { userId } = req.body;
      const food = await Food.findById(id);
      if (!food) {
        return res.status(404).json({ error: 'Post not found' });
      }
  
      if (!food.likes.includes(userId)) {
        food.likes.push(userId);
        await food.save();
      }

      const likeCount = food.likes.length; // Số lượng like
  
      res.status(200).json({
        success: true,
        message: "Like",
        data: food.likes,
        count: likeCount
      });
  }catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
}

export const DeleteLikeFood = async (req, res) => {
  try {
    const id = req.params.id
    const { userId } = req.body;
    const food = await Food.findById(id);

    if (!food) {
      return res.status(404).json({ error: 'Post not found' });
    }

    food.likes = food.likes.filter((like) => like.toString() !== userId);
    await food.save();

    const likeCount = food.likes.length; // Số lượng like
  
      res.status(200).json({
        success: true,
        message: "Số lượt thích",
        data: food.likes,
        count: likeCount
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}



export const ExerciseLike = async (req, res) => {
  try {
      const id = req.params.id
      const { userId } = req.body;
      const exercise = await Exercise.findById(id);
      if (!exercise) {
        return res.status(404).json({ error: 'Post not found' });
      }
  
      if (!exercise.likes.includes(userId)) {
        exercise.likes.push(userId);
        await exercise.save();
      }

      const likeCount = exercise.likes.length; // Số lượng like
  
      res.status(200).json({
        success: true,
        message: "Like",
        data: exercise.likes,
        count: likeCount
      });
  }catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
}


export const DeleteLikeExercise = async (req, res) => {
  try {
    const id = req.params.id
    const { userId } = req.body;
    const exercise = await Exercise.findById(id);

    if (!exercise) {
      return res.status(404).json({ error: 'Post not found' });
    }

    exercise.likes = exercise.likes.filter((like) => like.toString() !== userId);
    await exercise.save();

    const likeCount = exercise.likes.length; // Số lượng like
  
      res.status(200).json({
        success: true,
        message: "Số lượt thích",
        data: exercise.likes,
        count: likeCount
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}



