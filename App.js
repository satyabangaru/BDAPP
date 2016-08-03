
var hostWebUrl;
var appWebUrl;
var users = new Array(1);
$(document).ready(function () {
    SP.SOD.executeFunc('sp.js', 'SP.ClientContext', sharePointReady);
    hostWebUrl = decodeURIComponent(manageQueryStringParameter('SPHostUrl'));
    appWebUrl = decodeURIComponent(manageQueryStringParameter('SPAppWebUrl'));
    //Insert method  
   
})

function sharePointReady() {
    context = new SP.ClientContext.get_current();
    web = context.get_web();
    getUser().done(function (user) {
        var schema = {};
        schema['PrincipalAccountType'] = 'User,DL,SecGroup,SPGroup';
        schema['SearchPrincipalSource'] = 15;
        schema['ResolvePrincipalSource'] = 15;
        schema['AllowMultipleValues'] = false;
        schema['MaximumEntitySuggestions'] = 50;
        schema['Width'] = '280px';

        //users = new Array(1);
        var defaultUser = new Object();
        defaultUser.AutoFillDisplayText = user.get_title();
        defaultUser.AutoFillKey = user.get_loginName();
        defaultUser.Description = user.get_email();
        defaultUser.DisplayText = user.get_title();
        defaultUser.EntityType = "User";
        defaultUser.IsResolved = true;
        defaultUser.Key = user.get_loginName();
        defaultUser.Resolved = true;
        users[0] = defaultUser;
        SPClientPeoplePicker_InitStandaloneControlWrapper('peoplePickerDiv', users, schema);
        InsertItemToList(users[0].Key);
    });
}

function getUser() {
    var dfd = $.Deferred(function () {
        user = web.get_currentUser();
        context.load(user);
        context.executeQueryAsync(
            function () {
                dfd.resolve(user);
            }),
            function () {
                dfd.reject(args.get_message());
            };
    });
    return dfd.promise();
}


// This code runs when the DOM is ready and creates a context object which is needed to use the SharePoint object model  
//$(document).ready(function () {
//    hostWebUrl = decodeURIComponent(manageQueryStringParameter('SPHostUrl'));
//    appWebUrl = decodeURIComponent(manageQueryStringParameter('SPAppWebUrl'));
//    //Insert method  
//    InsertItemToList();
//});

//This function is used to get the hostweb url  
function manageQueryStringParameter(paramToRetrieve) {
    var params =
    document.URL.split("?")[1].split("&");
    var strParams = "";
    for (var i = 0; i < params.length; i = i + 1) {
        var singleParam = params[i].split("=");
        if (singleParam[0] == paramToRetrieve) {
            return singleParam[1];
        }
    }
}


//Insert List Item to SP host web  
function InsertItemToList(loginname) {
    var ctx = new SP.ClientContext(appWebUrl);//Get the SharePoint Context object based upon the URL  
    var appCtxSite = new SP.AppContextSite(ctx, hostWebUrl);
    var web = appCtxSite.get_web(); //Get the Site   
    var listName = "TestUser";
    var list = web.get_lists().getByTitle(listName); //Get the List based upon the Title  
    var listCreationInformation = new SP.ListItemCreationInformation(); //Object for creating Item in the List  
    var listItem = list.addItem(listCreationInformation);
    //var userField = this.users.get_id() + ";#" + this.users.get_loginName() + ";" + this.users.get_id() + ";#" + this.users.get_loginName();
    listItem.set_item("Title", "Title1");
    this.user = ctx.get_web().ensureUser(loginname);
    var department = fetchProfilePropertiesforUser(ctx, this.user);
    listItem.set_item("AssignedTo", this.user);
    listItem.set_item("Department", department);
    listItem.update(); //Update the List Item  
    ctx.load(listItem);
    //Execute the batch Asynchronously  
    ctx.executeQueryAsync(
    Function.createDelegate(this, success),
    Function.createDelegate(this, fail)
    );
}

function fetchProfilePropertiesforUser(appCtxSite, user)
{
    var userProfileProperties = [];
    var PeopleManager = new SP.UserProfiles.PeopleManager(appCtxSite);
    var ProfilePropertyNames = ["Title", "Department"];
    var userProfilePropertiesForUser = new SP.UserProfiles.UserProfilePropertiesForUser(appCtxSite, users, ProfilePropertyNames);
    userProfileProperties = PeopleManager.getUserProfilePropertiesFor(userProfilePropertiesForUser);
    return userProfileProperties[1];
}
//function onSuccess() {
//    userProfileProperties[i][1]
//}
function success() {
    alert("Item added successfully");
}

function fail(sender, args) {
    alert('Failed to get user name. Error:' + args.get_message());
}
//var userField = this.user1.get_id() + ";#" + this.user1.get_loginName() + ";" + this.user2.get_id() + ";#" + this.user2.get_loginName();
//listItem.set_item('UserField', userField);
//listItem.Update();
//list.Update();


//// Run your custom code when the DOM is ready.
//$(document).ready(function () {

//    // Specify the unique ID of the DOM element where the
//    // picker will render.
//    initializePeoplePicker('peoplePickerDiv');
//});

//// Render and initialize the client-side People Picker.
//function initializePeoplePicker(peoplePickerElementId) {

//    // Create a schema to store picker properties, and set the properties.
//    var schema = {};
//    schema['PrincipalAccountType'] = 'User,DL,SecGroup,SPGroup';
//    schema['SearchPrincipalSource'] = 15;
//    schema['ResolvePrincipalSource'] = 15;
//    schema['AllowMultipleValues'] = true;
//    schema['MaximumEntitySuggestions'] = 50;
//    schema['Width'] = '280px';

//    // Render and initialize the picker. 
//    // Pass the ID of the DOM element that contains the picker, an array of initial
//    // PickerEntity objects to set the picker value, and a schema that defines
//    // picker properties.
//    this.SPClientPeoplePicker_InitStandaloneControlWrapper(peoplePickerElementId, null, schema);
//}

//// Query the picker for user information.
//function getUserInfo() {

//    // Get the people picker object from the page.
//    var peoplePicker = this.SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerDiv_TopSpan;

//    // Get information about all users.
//    var users = peoplePicker.GetAllUserInfo();
//    var userInfo = '';
//    for (var i = 0; i < users.length; i++) {
//        var user = users[i];
//        for (var userProperty in user) {
//            userInfo += userProperty + ':  ' + user[userProperty] + '<br>';
//        }
//    }
//    $('#resolvedUsers').html(userInfo);

//    // Get user keys.
//    var keys = peoplePicker.GetAllUserKeys();
//    $('#userKeys').html(keys);

//    // Get the first user's ID by using the login name.
//    getUserId(users[0].Key);
//}

//// Get the user ID.
//function getUserId(loginName) {
//    var context = new SP.ClientContext.get_current();
//    this.user = context.get_web().ensureUser(loginName);
//    context.load(this.user);
//    context.executeQueryAsync(
//         Function.createDelegate(null, ensureUserSuccess),
//         Function.createDelegate(null, onFail)
//    );
//}

//function ensureUserSuccess() {
//    $('#userId').html(this.user.get_id());
//}

//function onFail(sender, args) {
//    alert('Query failed. Error: ' + args.get_message());
//}



//'use strict';

//var context = SP.ClientContext.get_current();
//var user = context.get_web().get_currentUser();

//// This code runs when the DOM is ready and creates a context object which is needed to use the SharePoint object model
//$(document).ready(function () {

//    getUserName();
//   // showDialog();
//});

//function showDialog() {

//    var optDict = {
//        width: 800,
//        height: 500,
//        url: 'http://www.google.com',
//        title: "Upload your file"
//    };

//    try {
//        SP.UI.ModalDialog.showModalDialog(optDict);
//    }
//    catch (err) {
//        alert(err.message);
//    }

//    return false;
//}

//// This function prepares, loads, and then executes a SharePoint query to get the current users information
//function getUserName() {
//    context.load(user);
//    context.executeQueryAsync(onGetUserNameSuccess, onGetUserNameFail);
//}

//// This function is executed if the above call is successful
//// It replaces the contents of the 'message' element with the user name
//function onGetUserNameSuccess() {
//    $('#message').text('Hello ' + user.get_title());
//}

//// This function is executed if the above call fails
//function onGetUserNameFail(sender, args) {
//    alert('Failed to get user name. Error:' + args.get_message());
//}
