var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/lab");


var productSchema = mongoose.Schema(
    {
        "productId": String,		    // Product ID
        "productName": String,		// Product Name
        "qtyPerUnit": Number,		    // Quantity of the Product
        "unitPrice": Number,			// Unit Price of the Product
        "unitInStock": Number,		// Unit in Stock
        "discontinued": Boolean,		// Boolean (true/false)
        "categoryId":[{type:mongoose.Schema.Types.ObjectId,
                        ref:'category'}]// Category ID
        
    },

     { collection: "product" }
);


var categorySchema = mongoose.Schema(
    {
        "product_categoryId":[{type:mongoose.Schema.Types.ObjectId,ref:'product'}] ,	// Category ID
                                
        "categoryName": String		// Category Nam
    }, { collection: "category" }
)

global.productModel=mongoose.model("product",productSchema);
global.categoryModel=mongoose.model("category",categorySchema);

