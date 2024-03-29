import mongoose from 'mongoose';
const {Schema} = mongoose;

const ReviewSchema = new Schema({
    gigId:{
        type:String,
        required:true,
    },userId:{
        type:String,
        required:true,
    },start:{
        type:Number,
        required:true,
        min : 1,
        max : 5,
    },desc:{
        type:String,
        required:true,
    },
  
        timestamps:true
});

export default mongoose.model("Review", ReviewSchema)