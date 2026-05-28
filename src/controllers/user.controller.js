import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utile/ApiError.js"
import { User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import{ApiRespons } from "../utils/ApiRespons.js"


const registerUser = asyncHandler( async (req , res) =>{
    //get user detail from frontend
    // validation-not empty
    //check if user already exists:by username and email
    //check for avtar and images
    //upload them to cloudinary, avatar
    //create user object
    //create user object- create entry in db
    //remove password and refresh token field from response
    //check for user creation
    //return response
    const {fullName , email,username,password}=req.body
    console.log("email:" , email);

    if(
        [fullName , email , username ,password].some((field) =>
        field?.trim() ==="")
        
        ){
            throw new ApiError(400,"All fields are required")
        }
    
      const existedUser=User.findOne ({
        $or:[{ username },{ email }]
      })
      if (existedUser){
        throw new ApiError(409,"User with email or username already exists")
      }
      
      const avatarLovalPath= req.files?.avatar[0]?.path;
      const coverImageLocalPath=req.files?.coverImage[0]?.
      path;

      if (!avatarLocalPath){
        throw new ApiError(400,"Avatar file is required")
      }
      
      const avatar=  await uploadOnCloudinary(avatarLocalPath)
      const coverImage = await uploadOnCloudinary
      (coverImageLocalPath)

      if(!avatar){
         throw new ApiError(400,"Avatar file is required")
      }

     const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username:username.toLowerCase()

      }
    ) 
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser){
        throw new ApiError(500,"Something went worng while registring the user")

    }

    return res.status(201).json(
        new ApiResponse(200, createdUser,"User registerd successfully")
    )


    });


export { registerUser};