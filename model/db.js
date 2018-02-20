/**
 * Created by navina on 11/10/16.
 */
//Bring mongoose into project

var mongoose=require("mongoose");

//build connection string
var dbURI='mongodb://localhost/yeng';

// Create the database connection
mongoose.connect(dbURI);


mongoose.connection.on('connected', function () {
    console.log('Mongoose connected to ' + dbURI);
});
mongoose.connection.on('error',function (err) {
    console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose disconnected');
});
process.on('SIGINT', function() {
    mongoose.connection.close(function () {
        console.log('Mongoose disconnected through app termination');
        process.exit(0);
    });
});

var adminSchema = new mongoose.Schema({
    FirstName:String,
    LastName:String,
    Email: {type: String, unique:true},
    Mobile:Number,
    Password:String,
    CreatedOn: { type: Date, default: Date.now },
    ModifiedOn: Date,
    LastLogin: Date,
    UserRole_id:String
});
var newsSchema = new mongoose.Schema({
    Tittle: String,
    News:String,
    CreatedOn: { type: Date, default: Date.now },
    DisplayDate:Date,
    EndDate:Date,
    ModifiedOn: Date
});

var syllabusSchema=new mongoose.Schema({
    _id: mongoose.Schema.Types.Mixed,
    common:String,
    children:[String],
    files:[String]
});

var seedSchema=new mongoose.Schema({
    idd:String,
    children:[String],
    files:[String],
    _id:mongoose.Schema.Types.Mixed
});

var roleSchema=new mongoose.Schema({
    RoleName:String,
    Description:String,
    News_and_Updates:Number,
    Admin_Management:Number,
    Syllabus:Number,
    Manage_Role:Number
})


mongoose.model( 'admin', adminSchema );
mongoose.model( 'news', newsSchema);
mongoose.model('syllabus_pdf',syllabusSchema);
mongoose.model('UserRole',roleSchema);
mongoose.model('test',seedSchema);