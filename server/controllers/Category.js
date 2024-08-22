const { default: mongoose, Mongoose } = require("mongoose");
const Category= require("../models/category");
const Course = require("../models/courses");
exports.createcatagory=async(req,res)=>{
try {
    const {name,description}=req.body;
    if(!name||!description){
        return res.status(400).json({
            success:false,
            message:"all fields are required to create category"
        });
    }
    const categoryentry= await Category.create({name:name,description:description});    
    return res.status(200).json({
        success:true,
        message:"Category created successfully"
    })

} catch (error) {
     res.status(500).json({
        success:false,
        message:"something went wrong while creating catagory"
    });
}

}
exports.getallcategories=async(req,res)=>{
    try {
        const allcategories= await Category.find({},{name:true,description:true});
        return res.status(200).json({
            success:true,
            categories:allcategories,
            message:"all category returned successfully"
            
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"something went wrong while returning all categories"
        });
    }
    }

exports.categorypageDetails=async(req,res)=>{
    try {
        const {categoryId}=req.body;
        console.log(categoryId);
       // const updatedcategoryId=new Mongoose.Types.ObjectId(categoryId);
        const selectedcategory= await Category.findById(categoryId).populate(
        {
            path:"courses",
            populate:{
                path:"instructor"
            }
        }
    ).exec();
        if(!selectedcategory){
            return res.status(404).json({
                success:false,
                message:"Category not found"
            })
        }
        const allCategories= await Category.find({_id:{$ne:categoryId}})

        const diffcategories = await Category.findOne(
            allCategories[Math.floor(Math.random() * allCategories?.length)]._id
          )
            .populate({
              path: "courses",
              populate: [{ path: "instructor" }, { path: "ratingreviews" }]
            })
            .exec();
            
            const topselling = await Course.aggregate([
                {
                  $lookup: {
                    from: "users",
                    localField: "instructor",
                    foreignField: "_id",
                    as: "result"
                  }
                },
                {
                  $unwind: "$studentsEnrolled",
                },
                {
                  $group: {
                    _id: "$_id",
                    "_result" : { "$mergeObjects" : "$$ROOT" },
                    count: {
                      $sum: 1,
                    },
                  },
                },
                {
                  $sort: {
                    count: -1,
                  },
                },
                {
                  $limit: 4,
                },
              ]);
        res.status(200).json({
            success:true,
            message:"category page details loaded",
            selectedcategory:selectedcategory,
            diffcategories:diffcategories,
            topselling:topselling
        })

    } catch (error) {
        res.status(500).json({
            success:false,
            message:"category page details not found",
            error:error.message
        })
    }
}    
