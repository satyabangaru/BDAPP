<%-- The following 4 lines are ASP.NET directives needed when using SharePoint components --%>
<%@ Page Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" MasterPageFile="~masterurl/default.master" language="C#" %>
<%@ Register Tagprefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<%-- The markup and script in the following Content element will be placed in the <head> of the page --%>
<asp:Content ContentPlaceHolderId="PlaceHolderAdditionalPageHead" runat="server">
    <script type="text/javascript" src="../Scripts/jquery-1.7.1.min.js"></script>

    <!-- Add your CSS styles to the following file -->
    <link rel="Stylesheet" type="text/css" href="../Content/App.css" />

    <!-- Add your JavaScript to the following file -->
    <script type="text/javascript" src="../Scripts/App.js"></script>

    <!-- The following script runs when the DOM is ready. The inline code uses a SharePoint feature to ensure -->
    <!-- The SharePoint script file sp.js is loaded and will then execute the sharePointReady() function in App.js -->
    <script type="text/javascript">
        $(document).ready(function () {
            SP.SOD.executeFunc('sp.js', 'SP.ClientContext', function () { sharePointReady(); });
            //ExecuteOrDelayUntilScriptLoaded(useClientContext, "sp.js");
        });
    </script>
</asp:Content>

<%-- The markup and script in the following Content element will be placed in the <body> of the page --%>
<asp:Content ContentPlaceHolderId="PlaceHolderMain" runat="server">
   <%-- <div>
        <textarea id="tileArea" style="height:auto;width:auto"></textarea>
    </div>--%>
    <div id="defaultDiv">
        <table width="60%" >
            <tr style="background-color:lightblue">
                <td>
                    <select id="selCat" style="width:100%">
                        <option></option>
                    </select>
                </td>
                <td>
                    <select id="selDist" style="width:100%">
                        <option>
                        </option>
                    </select>
                </td>
                <td  align="left">
                    <input id="btnFetch" type="button" value="Fetch" onclick="btnFetch_Click()" />
                </td>
                <td  align="right">
                    
                    <input id="btnSave" type="button" value="Save" onclick="btnSave_Click()" />
                    <input id="btnCancel" type="button" value="Cancel"  onclick="btnCancel_Click()" />
                </td>    
            </tr>
        </table>
    </div>
    <div>
        <img  alt="" src ="../Images/WindowsPhoneProgressbar.gif" width="60%" height="40px" id="progress"/>
        <%--<img  alt="" src ="../Images/WindowsPhoneProgressbar.gif" width="60%" id="progress"/>--%>
    </div>
    <div id="resultDiv">
        <table id="resultTable" border="1" width="60%" style="border-style:double" cellspacing="0" cellpadding="0" > </table>
    </div>

    <div id="dvHiddenFields">
       <table width="60%" >
            <tr>
                <td>
                    <textarea id="lblResult" rows="10" cols =" 70" style="width:100%;border:none;color:ActiveCaption" readonly="readonly" ></textarea>
                    <%--<input id="lblResult" type="text" style="width:100%" readonly="readonly" />--%>
                </td>
            </tr>
            
            <tr>
                <td>
                    <input id="originalValues" type="text" style="width:100%;border:none;visibility:hidden" />
                </td>
            </tr>       
       </table>
    </div>
        
    <%-- 
    
    <script type="text/javascript" src="/_layouts/MicrosoftAjax.js" ></script>
    <script type="text/javascript" src="/_layouts/SP.debug.js"></script>
    <script type="text/javascript" src="/_layouts/SP.Core.js" ></script>
    <script type="text/javascript" src="/_layouts/SP.Runtime.js"></script>
    <script type="text/javascript" src="/_layouts/SP.js"></script>

    --%>
</asp:Content>
