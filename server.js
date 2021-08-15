var express = require('express');
var app = express();
var bodyparser = require('body-parser');


app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

require("./models/db");




app.get("/api/readall", async (req, res) => {
    var prodall = await productModel.find();
    res.send(prodall);
    
});


app.get("/api/read/:id", async (req, res) => { //to read particular product by id

    const itemId = req.params.id;
    var item = await productModel.findById(itemId);

    if (item) {
        res.json(item);
    } else {
        res.json({ message: `item ${itemId} doesn't exist` })
    }
});

app.post("/api/create", async function (req, res) { //to create the product
    var body = req.body;
    console.log(body)
    var prodObj = {
        productId: body.productId,
        productName: body.productName,
        qtyPerUnit:body.qtyPerUnit,		    
        unitPrice:body.unitPrice,			
        unitInStock:body.unitInStock,		
        discontinued:body.discontinued,		
        categoryId:body.categoryId
    };
    var catObj={
        product_categoryId:body.product_categoryId,
        categoryName:body.categoryName
    }
    var saveObj1=new categoryModel(catObj);
    var saveObj = new productModel(prodObj);
    await saveObj.save();
    await saveObj1.save();
    
    console.log(prodObj)
    res.send({ message: "insertion success" })
})


app.put("/api/update", async function (req, res) { //to update the existing product
    var body = req.body;
    var prodobj = {
        productId: body.productId,
        productName: body.productName,
        qtyPerUnit: body.qtyPerUnit,		    
        unitPrice: body.unitPrice,			
        unitInStock: body.unitInStock,		
        discontinued: body.discontinued,		
        categoryId: body.categoryId

    };
    var id = req.query.id;
    await productModel.findByIdAndUpdate(id, prodobj);
    res.send({ message: "update success" })
})

app.delete("/api/delete", async function (req, res) { //to delete the product
    var id = req.query.id;
    await productModel.findByIdAndDelete(id);
    res.send({ message: "deletion success" });
})


app.get("/", (req, res) => {
    res.send("welcome to the task page");
    console.log("welcome to the task page");
})


app.listen(5001, (req, res) => {
    console.log("the server is listening at 5001");
}
);