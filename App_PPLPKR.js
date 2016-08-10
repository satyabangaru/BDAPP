var UserId = "";

$(document).ready(function () {
    initializePeoplePicker('peoplePickerDiv');
   // GetUser();
});
function changeFunc() {
    var selectBox = document.getElementById("mySelect");
    var selectedValue = selectBox.options[selectBox.selectedIndex].value;
    document.getElementById('TextContent').value = selectedValue;
}
function GetUser() {

    var select = document.getElementById("mySelect");
    var length = select.options.length;
    for (i = length; i > -1; i--) {
        select.remove(i);
    }
    getProperties(UserId.replace("#", "%23"));
}

function getPropertyValue(LoginName, selectedValue) {
    $.ajax({
        url: getQueryStringParameter('SPAppwebUrl') + "/_api/SP.UserProfiles.PeopleManager/GetUserProfilePropertyFor(accountName=@v,propertyName='" + selectedValue + "')?@v=" + "%27" + LoginName + "%27",
        type: "GET",
        headers: { "ACCEPT": "application/json;odata=verbose" },
        success: function (data) {
            document.getElementById("mySelect").options[document.getElementById("mySelect").selectedIndex].value = data.d.GetUserProfilePropertyFor;
        },
        error: function () {
            alert("Failed to get customer");
        }
    });
}
//http://siteurl/_api/SP.UserProfiles.PeopleManager/GetUserProfilePropertyFor(accountName=@v,propertyName='LastName')?@v='domain\username'
function getProperties(LoginName) {
    $.ajax({
        url: getQueryStringParameter('SPAppWebUrl') + "/_api/SP.UserProfiles.PeopleManager/GetPropertiesFor(accountName=@v)?@v='" + LoginName + "'",
        type: "GET",
        headers: { "ACCEPT": "application/json;odata=verbose" },
        success: function (data) {
            var x = document.getElementById("mySelect");
            var option;
            for (var i = 0; i < data.d.UserProfileProperties.results.length; i++) {
                option = document.createElement("option");
                option.text = data.d.UserProfileProperties.results[i].Key;
                option.value = data.d.UserProfileProperties.results[i].Value;
                x.add(option);
            }
        },
        error: function () {
            alert("Failed to get customer");
        }
    });
}

function SetCurrentUserProperties() {
    var clientContext = SP.ClientContext.get_current();
    var peopleManager = new SP.UserProfiles.PeopleManager(clientContext);
    var selectBox = document.getElementById("mySelect");
    var selectedValue = selectBox.options[selectBox.selectedIndex].text;
    peopleManager.setSingleValueProfileProperty(UserId, selectedValue, document.getElementById('TextContent').value);

    clientContext.executeQueryAsync(function () {
        getPropertyValue(UserId.replace("#", "%23"), selectedValue);
        SP.UI.Notify.addNotification("properties updated!", false);
    }, function (sender, args) {
        alert(args.get_message());
    });
}
function initializePeoplePicker(peoplePickerElementId) {

    var schema = {};
    schema['PrincipalAccountType'] = 'User,DL,SecGroup,SPGroup';
    schema['SearchPrincipalSource'] = 15;
    schema['ResolvePrincipalSource'] = 15;
    schema['AllowMultipleValues'] = false;
    schema['MaximumEntitySuggestions'] = 50;
    schema['Width'] = '280px';
    schema['Height'] = '55px';


    SPClientPeoplePicker.ShowUserPresence = false;

    SPClientPeoplePicker_InitStandaloneControlWrapper(peoplePickerElementId, null, schema);
}

function getUserInfo() {

    var peoplePicker = this.SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerDiv_TopSpan;

    var users = peoplePicker.GetAllUserInfo();
    var userInfo = '';
    for (var i = 0; i < users.length; i++) {
        var user = users[i];
        for (var userProperty in user) {
            userInfo += userProperty + ':  ' + user[userProperty] + '<br>';
        }
    }
    var keys = peoplePicker.GetAllUserKeys();
    UserId = users[0].Key;
    GetUser();
}
function getQueryStringParameter(param) {
    var params = document.URL.split("?")[1].split("&");
    for (var i = 0; i < params.length; i = i + 1) {
        var singleParam = params[i].split("=");
        if (singleParam[0] == param)
            return decodeURIComponent(singleParam[1]);
    }
    return "";
}