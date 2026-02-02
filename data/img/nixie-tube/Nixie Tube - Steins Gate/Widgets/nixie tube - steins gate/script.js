var Real_Time, Position=1;
var Status = 'Time', Version = 'Steins Gate';
var Date_Format = 'Day / Month / Year', Clock_Format = '24';                    
var Number = 'Default', Contrast = '';
var Before, After, Wallpaper = 'White';
var Desktop_Width, Desktop_Height;
var Zoom_Check, Position_Check, Horizon_Check;
                               
function Save_Configuration()
{                 
 Setvalue("Real_Time_Memory", Real_Time);
 Setvalue("Status_Memory", Status);  
 Setvalue("Version_Memory", Version);
 Setvalue("Date_Format_Memory", Date_Format);  
 Setvalue("Clock_Format_Memory", Clock_Format);
 Setvalue("Contrast_Memory", Contrast);
 Setvalue("Number_Memory", Number);        
 Setvalue("Position_Memory", Position);
 Setvalue("Wallpaper_Memory", Wallpaper);
}

function Load_Configuration()
{           
 widget.WindowZPosition = -1;

 Load_Font();
 Load_Status();
 Load_Version();
 Load_Date_Format();
 Load_Clock_Format();  
 Load_Contrast();
 Load_Number();
 //Load_Position();
 Load_Wallpaper();
}

function Load_Font()
{
 Hint.Font.PrivateFont.Src = WidgetPath + "Font/AGENCYR.TTF";
 Hint.Font.PrivateFont.Enabled = true;
 Title.Font.PrivateFont.Src = WidgetPath + "Font/AGENCYR.TTF";
 Title.Font.PrivateFont.Enabled = true;
 Input.Font.PrivateFont.Src = WidgetPath + "Font/AGENCYR.TTF";
 Input.Font.PrivateFont.Enabled = true;
 OK.Font.PrivateFont.Src = WidgetPath + "Font/AGENCYR.TTF";
 OK.Font.PrivateFont.Enabled = true;
 Close.Font.PrivateFont.Src = WidgetPath + "Font/segoeui.ttf";
 Close.Font.PrivateFont.Enabled = true;
}

function Load_Status()
{
 if(Getvalue("Status_Memory", Status) == 'Date')
 Mode_DateOnClick();
 else if(Getvalue("Status_Memory", Status) == 'Time')
 Mode_TimeOnClick();
} 

function Load_Version()
{
 if(Getvalue("Version_Memory", Version) == 'Original')
 Version_OriginalOnClick();
 else if(Getvalue("Version_Memory", Version) == 'Alternative')
 Version_AlternativeOnClick();
 else if(Getvalue("Version_Memory", Version) == 'Steins Gate')
 Version_Steins_GateOnClick();
} 

function Load_Date_Format()
{
 if(Getvalue("Date_Format_Memory", Date_Format) == 'Day / Month / Year')
 Date_Format_DMYOnClick();
 else if(Getvalue("Date_Format_Memory", Date_Format) == 'Month / Day / Year')
 Date_Format_MDYOnClick();
}

function Load_Clock_Format()
{
 if(Getvalue("Clock_Format_Memory", Clock_Format) == '12')
 Time_Format_12OnClick();
 else if(Getvalue("Clock_Format_Memory", Clock_Format) == '24')
 Time_Format_24OnClick();
}

function Load_Contrast()
{
 if(Getvalue("Contrast_Memory", Contrast) == '')
 Contrast = "_More_Contrast", More_ContrastOnClick();
 else if(Getvalue("Contrast_Memory", Contrast) == '_More_Contrast')
 Contrast = "", More_ContrastOnClick();
}

function Load_Number()
{
 if(Getvalue("Number_Memory", Number) == 'Default')
 Default_NumberOnClick();
 else if(Getvalue("Number_Memory", Number) == 'Custom')
 {
  Number = 'Custom';
  Real_Time = GetValue("Real_Time_Memory", Real_Time);
  Change_Number();

  Date_Time.Enabled=false;
  Default_Number.Checked=false;
  Custom_Number.Checked=true;
 }
}

function Load_Position()
{                            
 if(Getvalue("Position_Memory", Position)==1)
 Set_Position_Top_LeftOnClick(); 
 else if(Getvalue("Position_Memory", Position)==2)
 Set_Position_Middle_LeftOnClick();  
 else if(Getvalue("Position_Memory", Position)==3)
 Set_Position_Bottom_LeftOnClick();
 else if(Getvalue("Position_Memory", Position)==4)
 Set_Position_Top_MiddleOnClick();
 else if(Getvalue("Position_Memory", Position)==5)
 Set_Position_Middle_MiddleOnClick();
 else if(Getvalue("Position_Memory", Position)==6)
 Set_Position_Bottom_MiddleOnClick();
 else if(Getvalue("Position_Memory", Position)==7)
 Set_Position_Top_RightOnClick();
 else if(Getvalue("Position_Memory", Position)==8)
 Set_Position_Middle_RightOnClick();
 else if(Getvalue("Position_Memory", Position)==9)
 Set_Position_Bottom_RightOnClick();
 else if(Getvalue("Position_Memory", Position)==10)
 Set_Position_CustomOnClick();  
}

function Load_Wallpaper()
{
 if(Getvalue("Wallpaper_Memory", Wallpaper)=='White')
 Use_Wallpaper.Caption="Use Black Wallpaper";  
 else if(Getvalue("Wallpaper_Memory", Wallpaper)=='Black')
 Use_Wallpaper.Caption="Restore Your Wallpaper";
}

function Date_TimeOnUpdate(Sender)
{                                           
 Image_Check();
 
 if(Date_Time.get("%is12hr") == "true")
 Time_Format_12OnClick(); 
 else if(Date_Time.get("%is12hr") == "false")
 Time_Format_24OnClick();
}

function Image_Check()
{
 if(Status == 'Date')
 {
  if(Date_Format == 'Day / Month / Year')
  Real_Time = Date_Time.get("%Day0") + Date_Time.get("%Month0") + Date_Time.get("%Year");
  else if(Date_Format == 'Month / Day / Year')
  Real_Time = Date_Time.get("%Month0") + Date_Time.get("%Day0") + Date_Time.get("%Year");

  Year_Left.Src = Widgetpath + "Image" + Contrast + "/" + Real_Time.substring(6,7) + ".png";
  Year_Right.Src = Widgetpath + "Image" + Contrast + "/" + Real_Time.substring(7,8) + ".png";
 }
 else if(Status == 'Time')
 Real_Time = Date_Time.get("%Hour0") + Date_Time.get("%Minute0") + Date_Time.get("%Second0");

 One_Percent.Src = WidgetPath + "Image" + Contrast + "/1.png";
 Dot_3.Src = Widgetpath + "Image" + Contrast + "/Dot.png";

 Hour_Left.Src = Widgetpath + "Image" + Contrast + "/" + Real_Time.substring(0,1) + ".png";
 Hour_Right.Src = Widgetpath + "Image" + Contrast + "/" + Real_Time.substring(1,2) + ".png";
 Dot_1.Src = Widgetpath + "Image" + Contrast + "/Dot.png";
 Minute_Left.Src = Widgetpath + "Image" + Contrast + "/" + Real_Time.substring(2,3) + ".png";
 Minute_Right.Src = Widgetpath + "Image" + Contrast + "/" + Real_Time.substring(3,4) + ".png";
 Dot_2.Src = Widgetpath + "Image" + Contrast + "/Dot.png";
 Second_Left.Src = Widgetpath + "Image" + Contrast + "/" + Real_Time.substring(4,5) + ".png";
 Second_Right.Src = Widgetpath + "Image" + Contrast + "/" + Real_Time.substring(5,6) + ".png";
}

function CheckOnUpdate(Sender)
{
 Zoom_Check = parseInt(widget.Root.Height);
 Resize_Horizon();
 Resize_Desktop();
 
 if(Position_Check != "Set_Position_CustomOnClick()")
 eval(Position_Check);
}

function Resize_Horizon()
{
 if(Version=='Original')
 {
  if(Status=='Date')
  Horizon_Check=10;
  else if(Status=='Time')  
  Horizon_Check=30;
 }  
 else if(Version=='Alternative')
 {
  if(Status=='Date')
  Horizon_Check=0;
  else if(Status=='Time')
  Horizon_Check=0;
 }      
 else if(Version=='Steins Gate')
 {
  if(Status=='Date')
  Horizon_Check=0;
  else if(Status=='Time')
  Horizon_Check=30;
 }
}

function Resize_Desktop()
{
 if(Zoom_Check==374)
 {
  //Zoom 100%
  Desktop_Width = DesktopWidth;
  Desktop_Height = DesktopHeight;
 }
 else if(Zoom_Check==415)
 {
  //Zoom 90%
  Desktop_Width = (DesktopWidth + ((DesktopWidth*10)/100))-(Horizon_Check*1);
  Desktop_Height = (DesktopHeight + ((DesktopHeight*10)/100))-(40*1);
 }   
 else if(Zoom_Check==467)
 {
  //Zoom 80%
  Desktop_Width = (DesktopWidth + ((DesktopWidth*20)/100))-(Horizon_Check*2);
  Desktop_Height = (DesktopHeight + ((DesktopHeight*20)/100))-(40*2);
 }                 
 else if(Zoom_Check==534)
 {
  //Zoom 70%
  Desktop_Width = (DesktopWidth + ((DesktopWidth*30)/100))-(Horizon_Check*3);
  Desktop_Height = (DesktopHeight + ((DesktopHeight*30)/100))-(40*3);
 }         
 else if(Zoom_Check==623)
 {
  //Zoom 60%
  Desktop_Width = (DesktopWidth + ((DesktopWidth*40)/100))-(Horizon_Check*4);
  Desktop_Height = (DesktopHeight + ((DesktopHeight*40)/100))-(40*4);
 }                      
 else if(Zoom_Check==748)
 {
  //Zoom 50%
  Desktop_Width = (DesktopWidth + ((DesktopWidth*50)/100))-(Horizon_Check*5);
  Desktop_Height = (DesktopHeight + ((DesktopHeight*50)/100))-(40*5);
 }        
 else if(Zoom_Check==935)
 {
  //Zoom 40%
  Desktop_Width = (DesktopWidth + ((DesktopWidth*60)/100))-(Horizon_Check*6);
  Desktop_Height = (DesktopHeight + ((DesktopHeight*60)/100))-(40*6);
 }                
 else if(Zoom_Check==1246)
 {
  //Zoom 30%
  Desktop_Width = (DesktopWidth + ((DesktopWidth*70)/100))-(Horizon_Check*7);
  Desktop_Height = (DesktopHeight + ((DesktopHeight*70)/100))-(40*7);
 }           
 else if(Zoom_Check==1870)
 {
  //Zoom 20%
  Desktop_Width = (DesktopWidth + ((DesktopWidth*80)/100))-(Horizon_Check*8);
  Desktop_Height = (DesktopHeight + ((DesktopHeight*80)/100))-(40*8);
 }             
 else if(Zoom_Check==3740)
 {
  //Zoom 10%
  Desktop_Width = (DesktopWidth + ((DesktopWidth*90)/100))-(Horizon_Check*9);
  Desktop_Height = (DesktopHeight + ((DesktopHeight*90)/100))-(40*9);
 }
}

function Mode_DateOnClick()
{                
 Status = 'Date';
 widget.Width = 1300;
 Hint.Width = 1300;     
 Drag.Width = 1300;
 Group.Width = 1300;
 Recheck_Edit_Number_Position();
      
 Mode_Date.Checked=true;
 Mode_Date.Enabled=false;
 Mode_Time.Checked=false;
 Mode_Time.Enabled=true;
 
 Year_Left.Visible=true;
 Year_Right.Visible=true;
}

function Mode_TimeOnClick()
{                       
 Status = 'Time';
 widget.Width = 1040;     
 Hint.Width = 1040;
 Drag.Width = 1040;
 Group.Width = 1040;  
 Recheck_Edit_Number_Position();
 
 Mode_Date.Checked=false;
 Mode_Date.Enabled=true;
 Mode_Time.Checked=true;
 Mode_Time.Enabled=false;  

 Year_Left.Visible=false;
 Year_Right.Visible=false;
}

function Version_OriginalOnClick()
{              
 Version = 'Original';
 
 Version_Original.Checked=true;
 Version_Original.Enabled=false; 
 Version_Alternative.Checked=false;
 Version_Alternative.Enabled=true;
 Version_Steins_Gate.Checked=false;
 Version_Steins_Gate.Enabled=true;

 Original_Alternative.Left = 0;
 Hour_Left.Left = 0; 
 Hour_Right.Left = 130;
 Second_Left.Left = 780;              
 Second_Right.Left = 910;  
 Year_Left.Left = 1040;
 Year_Right.Left = 1170;
                        
 Steins_Gate.Visible=false;
 Dot_1.Visible = true;
 Dot_2.Visible = true;
}

function Version_AlternativeOnClick()
{                                 
 Version = 'Alternative';
 
 Version_Original.Checked=false;
 Version_Original.Enabled=true;
 Version_Alternative.Checked=true;
 Version_Alternative.Enabled=false;
 Version_Steins_Gate.Checked=false;   
 Version_Steins_Gate.Enabled=true;
 
 Original_Alternative.Left = 0;
 Hour_Left.Left = 130;
 Hour_Right.Left = 260;
 Second_Left.Left = 650;            
 Second_Right.Left = 780;                       
 Year_Left.Left = 910;
 Year_Right.Left = 1040;
                         
 Steins_Gate.Visible=false;
 Dot_1.Visible = false;
 Dot_2.Visible = false;             
}  

function Version_Steins_GateOnClick(Sender)
{
 Version = 'Steins Gate';

 Version_Original.Checked=false;
 Version_Original.Enabled=true;
 Version_Alternative.Checked=false;
 Version_Alternative.Enabled=true;
 Version_Steins_Gate.Checked=true;
 Version_Steins_Gate.Enabled=false;
             
 Original_Alternative.Left = 130;
 Hour_Left.Left = 130;
 Hour_Right.Left = 260;
 Second_Left.Left = 650;
 Second_Right.Left = 780;
 Year_Left.Left = 910;
 Year_Right.Left = 1040;
                       
 Steins_Gate.Visible=true;
 Dot_1.Visible = false;
 Dot_2.Visible = false;
}

function Date_Format_DMYOnClick()
{                        
 Date_Format = 'Day / Month / Year';
 
 Date_Format_DMY.Checked=true;
 Date_Format_DMY.Enabled=false;
 Date_Format_MDY.Checked=false;
 Date_Format_MDY.Enabled=true;   
}

function Date_Format_MDYOnClick()
{                             
 Date_Format = 'Month / Day / Year';
 
 Date_Format_DMY.Checked=false;
 Date_Format_DMY.Enabled=true;
 Date_Format_MDY.Checked=true;
 Date_Format_MDY.Enabled=false; 
}

function Time_Format_12OnClick()
{                         
 Clock_Format = '12';
 Date_Time.cmd(null,"!12hr");
 
 Time_Format_12.Checked=true;
 Time_Format_12.Enabled=false;
 Time_Format_24.Checked=false;
 Time_Format_24.Enabled=true;   
}

function Time_Format_24OnClick()
{                            
 Clock_Format = '24';
 Date_Time.cmd(null,"!24hr");
 
 Time_Format_12.Checked=false;
 Time_Format_12.Enabled=true;
 Time_Format_24.Checked=true;
 Time_Format_24.Enabled=false;  
}

function Default_NumberOnClick(Sender)
{                
 Number = 'Default';
 Date_Time.Enabled=true;       
 Default_Number.Checked=true;
 Default_Number.Enabled=false; 
 Custom_Number.Checked=false;   
 Custom_Number.Enabled=true;
 Edit_Number.Visible=false;
}

function Custom_NumberOnClick(Sender)
{                       
 Number = 'Custom';
 Date_Time.Enabled=false;
 Default_Number.Checked=false; 
 Default_Number.Enabled=true;
 Custom_Number.Checked=true;
 
 if(Edit_Number.Visible == false)
 {                             
  Drag.MouseThrough=true;
  Custom_Number.Enabled=false;
  Edit_Number.Visible=true; 
  OK.MouseThrough=true; 
  OK.Opacity=0.5;  
 }
 else if(Edit_Number.Visible != false)
 {                      
  Drag.MouseThrough=false;
  Custom_Number.Enabled=true;
  Edit_Number.Visible=false;
 } 
}

function More_ContrastOnClick(Sender)
{
 if(Contrast == '')
 {
  More_Contrast.Checked=true;
  Contrast = '_More_Contrast'; 
 }
 else if(Contrast == '_More_Contrast')
 {        
  More_Contrast.Checked=false;
  Contrast = '';
 }
         
 if(Number == 'Custom')
 Change_Number();
}

function InputOnKeyDown(Sender,Key,KeyChar,Shift)
{
 if(Input.Text.length > 7)
 Input.Text = Input.Text.substring(0, 8-1);
 
 if(Input.Text.length == 7)
 OK.MouseThrough=false, OK.Opacity=1;
 else if(Input.Text.length < 7)
 OK.MouseThrough=true, OK.Opacity=0.5; 
}

function OKOnMouseEnter(Sender)
{
 OK.Background.SolidColor.Enabled=true; 
}

function OKOnMouseLeave(Sender)
{
 OK.Background.SolidColor.Enabled=false; 
}

function Input_Checker()
{
 Real_Time = Input.Text;
 parseInt(Real_Time);
     
 if(Real_Time.length != 8)
 {                                                      
  Real_Time = Date_Time.get("%Day0") + Date_Time.get("%Month0") + Date_Time.get("%Year");
  alert("Invalid input " + "\n" + "Input must be a number." + "\n\n" + "Example = [12345678]") 
 }        
 else if(Real_Time.length == 8)
 Input.Text = '', Change_Number(), Custom_NumberOnClick();
}

function Change_Number()
{
 One_Percent.Src = WidgetPath + "Image" + Contrast + "/1.png";
 Dot_3.Src = Widgetpath + "Image" + Contrast + "/Dot.png";               

 Hour_Left.Src = Widgetpath + "Image" + Contrast + "/" + Real_Time.substring(0,1) + ".png";
 Hour_Right.Src = Widgetpath + "Image" + Contrast + "/" + Real_Time.substring(1,2) + ".png";
 Dot_1.Src = Widgetpath + "Image" + Contrast + "/Dot.png";
 Minute_Left.Src = Widgetpath + "Image" + Contrast + "/" + Real_Time.substring(2,3) + ".png";
 Minute_Right.Src = Widgetpath + "Image" + Contrast + "/" + Real_Time.substring(3,4) + ".png";
 Dot_2.Src = Widgetpath + "Image" + Contrast + "/Dot.png";
 Second_Left.Src = Widgetpath + "Image" + Contrast + "/" + Real_Time.substring(4,5) + ".png";
 Second_Right.Src = Widgetpath + "Image" + Contrast + "/" + Real_Time.substring(5,6) + ".png";
    
 Year_Left.Src = Widgetpath + "Image" + Contrast + "/" + Real_Time.substring(6,7) + ".png";
 Year_Right.Src = Widgetpath + "Image" + Contrast + "/" + Real_Time.substring(7,8) + ".png";
}
                 
function Recheck_Edit_Number_Position()
{
 Edit_Number.Left = (widget.Width/2) - (Edit_Number.Width/2); 
 Edit_Number.Top = (widget.Height/2) - (Edit_Number.Height/2);
}

function Use_WallpaperOnClick(Sender)
{                         
 if(Use_Wallpaper.Caption=="Use Black Wallpaper")
 {
  if(FileExists(WidgetPath + "White.jpg")==false)
  alert("Drag and drop your wallpaper to this widget first\nbefore using black wallpaper");
  else if(FileExists(WidgetPath + "White.jpg")==true)
  {
   if(FileExists(WidgetPath + "Black.jpg")==false)
   alert(WidgetPath + "Black.jpg" + " Not Found");
   else if(FileExists(WidgetPath + "Black.jpg")==true)
   {
    Use_Wallpaper.Caption="Restore Your Wallpaper";
    SetWallPaper(WidgetPath + "Black.jpg");
    Wallpaper='White';      
    Save_Configuration(); 
   }
  }
 }
 else if(Use_Wallpaper.Caption=="Restore Your Wallpaper")
 {                                    
  if(FileExists(WidgetPath + "White.jpg")==false)
  alert(WidgetPath + "White.jpg" + " Not Found");  
  else if(FileExists(WidgetPath + "White.jpg")==true)
  {
   SetWallPaper(WidgetPath + "White.jpg");
   Use_Wallpaper.Caption="Use Black Wallpaper";
   Wallpaper='Black';
   Save_Configuration();
  }  
 }
}

function Bring_To_CenterOnClick(Sender)
{
 widget.Left = (Desktop_Width/2)-(Group.Width/2);
 widget.Top = (Desktop_Height/2)-(Group.Height/2);
}

/*
function Set_Position_Top_LeftOnClick(Sender)
{
 Position_Check = "Set_Position_Top_LeftOnClick()"; 

 Set_Position_Top_Left.Enabled=false;
 Set_Position_Middle_Left.Enabled=true;
 Set_Position_Bottom_Left.Enabled=true;   
 Set_Position_Top_Middle.Enabled=true;
 Set_Position_Middle_Middle.Enabled=true;
 Set_Position_Bottom_Middle.Enabled=true;
 Set_Position_Top_Right.Enabled=true;
 Set_Position_Middle_Right.Enabled=true;
 Set_Position_Bottom_Right.Enabled=true;
 
 Set_Position_Top_Left.Checked=true;
 Set_Position_Middle_Left.Checked=false;
 Set_Position_Bottom_Left.Checked=false;
 Set_Position_Top_Middle.Checked=false;
 Set_Position_Middle_Middle.Checked=false;
 Set_Position_Bottom_Middle.Checked=false;
 Set_Position_Top_Right.Checked=false;
 Set_Position_Middle_Right.Checked=false;
 Set_Position_Bottom_Right.Checked=false;        
 Set_Position_Custom.Checked=false;
 
 widget.Left = 0 + 50;
 widget.Top = 0 + 40;
 Position = 1;        
 Save_Configuration();
}

function Set_Position_Middle_LeftOnClick(Sender)
{                                                   
 Position_Check = "Set_Position_Middle_LeftOnClick()";

 Set_Position_Top_Left.Enabled=true;
 Set_Position_Middle_Left.Enabled=false;
 Set_Position_Bottom_Left.Enabled=true;
 Set_Position_Top_Middle.Enabled=true;
 Set_Position_Middle_Middle.Enabled=true;
 Set_Position_Bottom_Middle.Enabled=true;
 Set_Position_Top_Right.Enabled=true;
 Set_Position_Middle_Right.Enabled=true;
 Set_Position_Bottom_Right.Enabled=true;

 Set_Position_Top_Left.Checked=false;
 Set_Position_Middle_Left.Checked=true;
 Set_Position_Bottom_Left.Checked=false;
 Set_Position_Top_Middle.Checked=false;
 Set_Position_Middle_Middle.Checked=false;
 Set_Position_Bottom_Middle.Checked=false;
 Set_Position_Top_Right.Checked=false;
 Set_Position_Middle_Right.Checked=false;
 Set_Position_Bottom_Right.Checked=false;     
 Set_Position_Custom.Checked=false;
                      
 widget.Left = 0 + 50;
 widget.Top = (Desktop_Height/2)-(Group.Height/2); 
 Position = 2;        
 Save_Configuration();
}

function Set_Position_Bottom_LeftOnClick(Sender)
{                                                
 Position_Check = "Set_Position_Bottom_LeftOnClick()";

 Set_Position_Top_Left.Enabled=true;
 Set_Position_Middle_Left.Enabled=true;
 Set_Position_Bottom_Left.Enabled=false;
 Set_Position_Top_Middle.Enabled=true;
 Set_Position_Middle_Middle.Enabled=true;
 Set_Position_Bottom_Middle.Enabled=true;
 Set_Position_Top_Right.Enabled=true;
 Set_Position_Middle_Right.Enabled=true;
 Set_Position_Bottom_Right.Enabled=true;

 Set_Position_Top_Left.Checked=false;
 Set_Position_Middle_Left.Checked=false;
 Set_Position_Bottom_Left.Checked=true;
 Set_Position_Top_Middle.Checked=false;
 Set_Position_Middle_Middle.Checked=false;
 Set_Position_Bottom_Middle.Checked=false;
 Set_Position_Top_Right.Checked=false;
 Set_Position_Middle_Right.Checked=false;
 Set_Position_Bottom_Right.Checked=false;        
 Set_Position_Custom.Checked=false;

 widget.Left = 0 + 50;              
 widget.Top = (Desktop_Height-Group.Height)-40;   
 Position = 3;        
 Save_Configuration();
}

function Set_Position_Top_MiddleOnClick(Sender)
{                                                
 Position_Check = "Set_Position_Top_MiddleOnClick()";

 Set_Position_Top_Left.Enabled=true;
 Set_Position_Middle_Left.Enabled=true;
 Set_Position_Bottom_Left.Enabled=true;
 Set_Position_Top_Middle.Enabled=false;
 Set_Position_Middle_Middle.Enabled=true;
 Set_Position_Bottom_Middle.Enabled=true;
 Set_Position_Top_Right.Enabled=true;
 Set_Position_Middle_Right.Enabled=true;
 Set_Position_Bottom_Right.Enabled=true;

 Set_Position_Top_Left.Checked=false;
 Set_Position_Middle_Left.Checked=false;
 Set_Position_Bottom_Left.Checked=false;
 Set_Position_Top_Middle.Checked=true;
 Set_Position_Middle_Middle.Checked=false;
 Set_Position_Bottom_Middle.Checked=false;
 Set_Position_Top_Right.Checked=false;
 Set_Position_Middle_Right.Checked=false;
 Set_Position_Bottom_Right.Checked=false;   
 Set_Position_Custom.Checked=false;

 widget.Left = (Desktop_Width/2)-(Group.Width/2);
 widget.Top = 0 + 40;         
 Position = 4;        
 Save_Configuration();
}

function Set_Position_Middle_MiddleOnClick(Sender)
{                                       
 Position_Check = "Set_Position_Middle_MiddleOnClick()";

 Set_Position_Top_Left.Enabled=true;
 Set_Position_Middle_Left.Enabled=true;
 Set_Position_Bottom_Left.Enabled=true;
 Set_Position_Top_Middle.Enabled=true;
 Set_Position_Middle_Middle.Enabled=false;
 Set_Position_Bottom_Middle.Enabled=true;
 Set_Position_Top_Right.Enabled=true;
 Set_Position_Middle_Right.Enabled=true;
 Set_Position_Bottom_Right.Enabled=true;

 Set_Position_Top_Left.Checked=false;
 Set_Position_Middle_Left.Checked=false;
 Set_Position_Bottom_Left.Checked=false;
 Set_Position_Top_Middle.Checked=false;
 Set_Position_Middle_Middle.Checked=true;
 Set_Position_Bottom_Middle.Checked=false;
 Set_Position_Top_Right.Checked=false;
 Set_Position_Middle_Right.Checked=false;
 Set_Position_Bottom_Right.Checked=false;   
 Set_Position_Custom.Checked=false;

 widget.Left = (Desktop_Width/2)-(Group.Width/2);
 widget.Top = (Desktop_Height/2)-(Group.Height/2);    
 Position = 5;        
 Save_Configuration();
}

function Set_Position_Bottom_MiddleOnClick(Sender)
{                                   
 Position_Check = "Set_Position_Bottom_MiddleOnClick()";

 Set_Position_Top_Left.Enabled=true;
 Set_Position_Middle_Left.Enabled=true;
 Set_Position_Bottom_Left.Enabled=true;
 Set_Position_Top_Middle.Enabled=true;
 Set_Position_Middle_Middle.Enabled=true;
 Set_Position_Bottom_Middle.Enabled=false;
 Set_Position_Top_Right.Enabled=true;
 Set_Position_Middle_Right.Enabled=true;
 Set_Position_Bottom_Right.Enabled=true;

 Set_Position_Top_Left.Checked=false;
 Set_Position_Middle_Left.Checked=false;
 Set_Position_Bottom_Left.Checked=false;
 Set_Position_Top_Middle.Checked=false;
 Set_Position_Middle_Middle.Checked=false;
 Set_Position_Bottom_Middle.Checked=true;
 Set_Position_Top_Right.Checked=false;
 Set_Position_Middle_Right.Checked=false;
 Set_Position_Bottom_Right.Checked=false;
 Set_Position_Custom.Checked=false;

 widget.Left = (Desktop_Width/2)-(Group.Width/2);
 widget.Top = (Desktop_Height-Group.Height)-40;  
 Position = 6;        
 Save_Configuration();
}

function Set_Position_Top_RightOnClick(Sender)
{                                       
 Position_Check = "Set_Position_Top_RightOnClick()";

 Set_Position_Top_Left.Enabled=true;
 Set_Position_Middle_Left.Enabled=true;
 Set_Position_Bottom_Left.Enabled=true;
 Set_Position_Top_Middle.Enabled=true;
 Set_Position_Middle_Middle.Enabled=true;
 Set_Position_Bottom_Middle.Enabled=true;
 Set_Position_Top_Right.Enabled=false;
 Set_Position_Middle_Right.Enabled=true;
 Set_Position_Bottom_Right.Enabled=true;

 Set_Position_Top_Left.Checked=false;
 Set_Position_Middle_Left.Checked=false;
 Set_Position_Bottom_Left.Checked=false;
 Set_Position_Top_Middle.Checked=false;
 Set_Position_Middle_Middle.Checked=false;
 Set_Position_Bottom_Middle.Checked=false;
 Set_Position_Top_Right.Checked=true;
 Set_Position_Middle_Right.Checked=false;
 Set_Position_Bottom_Right.Checked=false;      
 Set_Position_Custom.Checked=false;

 widget.Left = (Desktop_Width-Group.Width)-50;
 widget.Top = 0 + 40;     
 Position = 7;        
 Save_Configuration();
}

function Set_Position_Middle_RightOnClick(Sender)
{                                       
 Position_Check = "Set_Position_Middle_RightOnClick()";

 Set_Position_Top_Left.Enabled=true;
 Set_Position_Middle_Left.Enabled=true;
 Set_Position_Bottom_Left.Enabled=true;
 Set_Position_Top_Middle.Enabled=true;
 Set_Position_Middle_Middle.Enabled=true;
 Set_Position_Bottom_Middle.Enabled=true;
 Set_Position_Top_Right.Enabled=true;
 Set_Position_Middle_Right.Enabled=false;
 Set_Position_Bottom_Right.Enabled=true;

 Set_Position_Top_Left.Checked=false;
 Set_Position_Middle_Left.Checked=false;
 Set_Position_Bottom_Left.Checked=false;
 Set_Position_Top_Middle.Checked=false;
 Set_Position_Middle_Middle.Checked=false;
 Set_Position_Bottom_Middle.Checked=false;
 Set_Position_Top_Right.Checked=false;
 Set_Position_Middle_Right.Checked=true;
 Set_Position_Bottom_Right.Checked=false;   
 Set_Position_Custom.Checked=false;

 widget.Left = (Desktop_Width-Group.Width)-50;
 widget.Top = (Desktop_Height/2)-(Group.Height/2);  
 Position = 8;        
 Save_Configuration();
}

function Set_Position_Bottom_RightOnClick(Sender)
{                                          
 Position_Check = "Set_Position_Bottom_RightOnClick()";

 Set_Position_Top_Left.Enabled=true;
 Set_Position_Middle_Left.Enabled=true;
 Set_Position_Bottom_Left.Enabled=true;
 Set_Position_Top_Middle.Enabled=true;
 Set_Position_Middle_Middle.Enabled=true;
 Set_Position_Bottom_Middle.Enabled=true;
 Set_Position_Top_Right.Enabled=true;
 Set_Position_Middle_Right.Enabled=true;
 Set_Position_Bottom_Right.Enabled=false;

 Set_Position_Top_Left.Checked=false;
 Set_Position_Middle_Left.Checked=false;
 Set_Position_Bottom_Left.Checked=false;
 Set_Position_Top_Middle.Checked=false;
 Set_Position_Middle_Middle.Checked=false;
 Set_Position_Bottom_Middle.Checked=false;
 Set_Position_Top_Right.Checked=false;
 Set_Position_Middle_Right.Checked=false;
 Set_Position_Bottom_Right.Checked=true;    
 Set_Position_Custom.Checked=false;

 widget.Left = (Desktop_Width-Group.Width)-50;
 widget.Top = (Desktop_Height-Group.Height)-40;  
 Position = 9;           
 Save_Configuration();
}    

function Set_Position_CustomOnClick()
{                                     
 Position_Check = "Set_Position_CustomOnClick()";

 Set_Position_Top_Left.Enabled=true;
 Set_Position_Middle_Left.Enabled=true;
 Set_Position_Bottom_Left.Enabled=true;
 Set_Position_Top_Middle.Enabled=true;
 Set_Position_Middle_Middle.Enabled=true;
 Set_Position_Bottom_Middle.Enabled=true;
 Set_Position_Top_Right.Enabled=true;
 Set_Position_Middle_Right.Enabled=true;
 Set_Position_Bottom_Right.Enabled=true;

 Set_Position_Top_Left.Checked=false;
 Set_Position_Middle_Left.Checked=false;
 Set_Position_Bottom_Left.Checked=false;
 Set_Position_Top_Middle.Checked=false;
 Set_Position_Middle_Middle.Checked=false;
 Set_Position_Bottom_Middle.Checked=false;
 Set_Position_Top_Right.Checked=false;
 Set_Position_Middle_Right.Checked=false;
 Set_Position_Bottom_Right.Checked=false;
 Set_Position_Custom.Checked=true;

 Position = 10;
 Save_Configuration();
}
*/

function DragOnMouseDown(Sender,Button,Shift,X,Y)
{                  
 Before = widget.Left + ", " + widget.Top;    
 Set_Position_Coordinate.Caption = "X = " + widget.Left + ", Y = " + widget.Top;
                                              
 if(Button==0)
 Hint.Visible=true;        
 
 if(widget.LockPosition!=0)
 Hint.Text = "Locked";
 else if(widget.LockPosition==0)
 Hint.Text = "Just Drag This Widget";
}

function DragOnMouseUp(Sender,Button,Shift,X,Y)
{
 Hint.Visible=false; 
 After = widget.Left + ", " + widget.Top; 
 Set_Position_Coordinate.Caption = "X = " + widget.Left + ", Y = " + widget.Top;
 
 if(After!=Before){};
 //Set_Position_CustomOnClick();
}

function DragOnDragDrop(Sender,Data,Point)
{
 CopyFile(Data, WidgetPath + "White.jpg") 
}
