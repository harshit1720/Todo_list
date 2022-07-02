                                    //TODOList backend
//require express
const express = require("express");
//require bodyParser
const bodyParser = require("body-parser");
//require mongoose
const mongoose = require("mongoose");
//express
const app = express();

app.set("view engine", "ejs");
//using bodyParser and express in todolist
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
//connecting mongoose to localhost
mongoose.connect("mongodb://localhost:27017/todolistDB", {useNewUrlParser: true});

//mongoose schema defines the structure of the document
const itemSchema = {
  name: String
};

//mongoose model (It manages relationships between data,
 //provides schema validation, and is used to translate between
 //objects in code and the representation of those objects in MongoDB)

 const Item = mongoose.model("Item", itemSchema);

//mongooose document represent a one-to-one mapping to documents as stored in MongoDB
const item1 = new Item({
  name: "Welcome to your todolist!!"
});

const item2 = new Item({
  name: "<-- Hit the + button to add a new item"
});

const item3 = new Item({
  name: "<-- Hit this to delete item"
});


//putting all item 1,2,3 in array
const defaultItems = [item1 , item2 , item3];

//insert many

//

app.get("/", function(req, res) {

  Item.find({} , function(err, foundItems){
    if (foundItems.length === 0 ){
      Item.insertMany(defaultItems , function(err){
        if (err){
          console.log(err);
        }else{
          console.log("Successfully saved default items to DB");
        }
      });

    res.redirect("/");
  }
    else{
      res.render("list", {listTitle: day , newListItems: foundItems});
    }
  });


  let today = new Date();

  let option = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };

  let day = today.toLocaleDateString("en-US" , option);


});

app.get("/work", function(req , res){
  res.render("list", {listTitle: "Work List" , newListItems: workItem});
})

app.post("/", function (req, res) {

  const itemName = req.body.newItem;

  const item = new Item({
    name: itemName
  });
  item.save();
  //to show in site todolist
  res.redirect("/");
});

app.post("/delete" , function(req ,res){
  const checkItemId = req.body.checkbox;
  Item.findByIdAndRemove(checkItemId,function(err){
    if(!err){
      console.log("Successfully delete");
    }
    else{
      console.log("Error in delete");
    }
    res.redirect("/");
  });

});

app.post("/work" , function(req , res){
  let item = req.body.newItem;
  item.push(item);
  res.redirect("/work");
})
app.get("/about" , function(req , res){
  res.render("about");
})

app.listen(3000, function() {
  console.log("Server is running in this port");
});
