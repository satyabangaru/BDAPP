<%-- The following 4 lines are ASP.NET directives needed when using SharePoint components --%>
<%@ Page Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" language="C#" %>
<%@ Register Tagprefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<!-- The following tells SharePoint to allow this page to be hosted in an IFrame -->
<WebPartPages:AllowFraming runat="server" />

<html>
	<head>
		<!-- The following scripts are needed when using the SharePoint object model -->
		<%--<script type="text/javascript" src="https://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.9.1.min.js"></script>--%>
        <script type="text/javascript" src="../Scripts/jquery-1.10.2.min.js"></script>
         <script type="text/javascript" src="/_layouts/15/MicrosoftAjax.js"></script>
		<SharePoint:ScriptLink name="Init.js" runat="server" LoadAfterUI="true" Localizable="false" />
	    <SharePoint:ScriptLink name="SP.js" runat="server" LoadAfterUI="true" Localizable="false" />
	    <SharePoint:ScriptLink name="SP.Runtime.js" runat="server" LoadAfterUI="true" Localizable="false" />
	    <SharePoint:ScriptLink name="SP.UI.Dialog.js" runat="server" LoadAfterUI="true" Localizable="false" />
	    <SharePoint:ScriptLink name="SP.UserProfiles.js" runat="server" LoadAfterUI="true" Localizable="false" />
		<script type="text/javascript" src="../Scripts/App.js"></script>

		<!-- Add your CSS styles to the following file -->
		<link rel="Stylesheet" type="text/css" href="../Content/App.css" />

		
	</head>

	<body>
        <script type="text/javascript" src="/_layouts/15/1033/strings.js"></script>
    <script type="text/javascript" src="/_layouts/15/clienttemplates.js"></script>
    <script type="text/javascript" src="/_layouts/15/clientforms.js"></script>
    <script type="text/javascript" src="/_layouts/15/clientpeoplepicker.js"></script>
    <script type="text/javascript" src="/_layouts/15/autofill.js"></script>

		<div>
	People Picker<br/>
	<div id="peoplePickerDiv" >

  	</div>
	<select id="mySelect" onchange="changeFunc()"></select><input type="button" value="Get Properties" onclick="getUserInfo()"/><br/>
	<input type="text" id="TextContent"  /> <input type="button" value="Update" onclick="SetCurrentUserProperties()"/>
 </div>

	</body>
</html>