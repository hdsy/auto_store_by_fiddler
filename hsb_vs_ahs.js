    static function strVar1(var1:String)
    {
        return "\"" + var1.Replace('\\','\\\\').Replace('\"','\\\"').Replace ('\n','\\n').Replace('\r','\\r').Replace('\'','\\\'') + "\"";
        
    }
    static function OnBeforeResponse(oSession: Session) 
    {
        if (m_Hide304s && oSession.responseCode == 304) 
        {
            // I don't know this meaning ... so baidu it
            // https://www.cnblogs.com/hushaojun/p/6944962.html
            /**
            ui-hide
            Hide the session from the Session List.
            The session will continue to run.
            Breakpoints on hidden sessions are ignored.
            Note: hiding a session will free up the memory that would otherwise be used to hold the session data in memory.
            ui-color
            The value of this flag determines the font color used to render this session in the Session List.
            ui-backcolor
            The value of this flag determines the background color used behind this session's entry in the Session List.
            ui-bold
            If present, this session's entry will be bolded in the Session List.
            ui-italic
            If present, this session's entry will be italicized in the Session List.
            ui-strikeout
            If present, this session's entry will be struck out in the Session List.
            ui-customcolumn
            The value of this flag is shown in the Fiddler Session List's "User-defined" column.
            ui-comments
            The Comment, if any, which the user set on this session.
            **/
            oSession["ui-hide"] = "true";
        }
		
        // store beauties
        var img_dir = "y:/PRVIT/";
        // if content-type is image/jpeg and from mm115.net then store this file named url without ? and replace / with _
        if
            (	
            (
            oSession.RequestHeaders.AllValues("Host").Contains(".huishoubao.com") || 
            oSession.RequestHeaders.AllValues("Host").Contains(".aihuishou.com") 
            ) &&
            (	
            oSession.ResponseHeaders.AllValues("Content-Type").Contains("image/jpeg") 
            )
            )
        {
            // find ? and trim it to generate url without parameters named file_url
            var file_url ;
		
            var whindex = oSession.url.IndexOf ('?');			
				
            if (whindex > 0)
                file_url = oSession.url.Substring (0,whindex);
            else
                file_url = oSession.url;
		
            // only jpg and size bigger than 70k will be stored, so ..
            whindex = oSession.url.IndexOf ('.jpg');			
			
            if ((whindex > 0) && (oSession.GetResponseBodyAsString().Length > 50000))
            {
                oSession["ui-backcolor"] = "yellow";
                
                whindex = whindex+4;	
                //  modi url to be the name which suit windows's rules
                file_url = file_url.Substring (0,whindex).Replace ('/','_').Replace('%','B').Replace('?','7').Replace('&','-');

                // you can enum and confire not store duplicated
                var file_path  = img_dir+"jpg/"+file_url;
                var file_path1 = img_dir+"jpg/20180904/"+file_url;
                var file_path2 = img_dir+"jpg/20180905/"+file_url;
                var file_path3 = img_dir+"jpg/20180906/"+file_url;
                var file_path4 = img_dir+"jpg/20180907/"+file_url;
                var file_path5 = img_dir+"jpg/20180910/"+file_url;
                var file_path6 = img_dir+"jpg/20180911/"+file_url;
                var file_path7 = img_dir+"jpg/20180912/"+file_url;
                var file_path8 = img_dir+"jpg/20180913/"+file_url;
				
                var fso = new ActiveXObject("Scripting.FileSystemObject"); 
			
                // if not exist file_url 
                if 
                (
                    (false == fso.FileExists(file_path ))&& 
                    (false == fso.FileExists(file_path1))&& 
                    (false == fso.FileExists(file_path2))&& 
                    (false == fso.FileExists(file_path3))&& 
                    (false == fso.FileExists(file_path4))&& 
                    (false == fso.FileExists(file_path5))&& 
                    (false == fso.FileExists(file_path6))&& 
                    (false == fso.FileExists(file_path7))&& 
                    (false == fso.FileExists(file_path8)) 
                )
                {
			
                    var stream = new ActiveXObject('Adodb.Stream');  
                    stream.Mode = 3;  
                    stream.Open();  
				
                    stream.Type = 1;  
                    //stream.Charset = 'unicode';  
                    //stream.WriteText(s);  

                    stream.Position = 0;  
                    stream.Type = 1;  
                    //stream.Position = 2;  
                    //var bs = stream.Read();  
                    //stream.Position = 0;  
                    stream.Write(oSession.responseBodyBytes);  
                    //stream.SetEOS();  

                    stream.SaveToFile(file_path,1);  				
					
                    stream.Close(); 
                    
                    
                }
                else
                {					
                    oSession["ui-strikeout"] = "true";
                }
            }
        }
		
        // store json
        var json_dir = "y:/TEST/";
        if 
            (
            // from certain site like weixin.qq.com ...
            (
            oSession.RequestHeaders.AllValues("Host").Contains(".weixin.qq.com") || 
            oSession.RequestHeaders.AllValues("Host").Contains(".growingio.com") || 
            oSession.RequestHeaders.AllValues("Host").Contains(".huatuo.qq.com") || 
            oSession.RequestHeaders.AllValues("Host").Contains(".aihuishou.com") || 
            oSession.RequestHeaders.AllValues("Host").Contains(".huishoubao.com") 
            ) &&
            // and content-type is text/html or application/json
            (
            oSession.ResponseHeaders.AllValues("Content-Type").Contains("application/json") ||
            (
            oSession.ResponseHeaders.AllValues("Content-Type").Contains("text/html") && 
            // and not htm ,png,ico and jpg . (some developers are so chedan ,they can give an ico for json)		
            (
            (! oSession.url.Contains(".htm")) && 
            (! oSession.url.Contains(".png")) && 
            (! oSession.url.Contains(".ico")) && 
            (! oSession.url.Contains(".jpg"))
            )&&
            (
            // even blank should be store ,otherwise should be json structure
            (oSession.GetResponseBodyAsString()+"{    ").Substring(0,3).Contains ("{")
            )
            )
            )
            )
        { 
            // earse the confusion codes...
            oSession.utilDecodeResponse();
            
            oSession["ui-backcolor"] = "yellow";

            var fso; 
            var file; 

            var whindex = oSession.url.IndexOf ('?');			

            if (whindex <= 0)
                whindex = oSession.url.Length;


            var file_url = oSession.url.Substring (0,whindex).Replace ('/','_').Replace('%','B').Replace('?','7').Replace('&','-');


            var etimes = (oSession.Timers.ServerDoneResponse-oSession.Timers.ClientDoneRequest).ToString().Replace(':','');
            
            try
            {

                fso = new ActiveXObject("Scripting.FileSystemObject");      
				//FiddlerObject.log(file_url+"create");
                // file path ,and the site dir	 
                if(oSession.RequestHeaders.AllValues("Host").Contains(".aihuishou.com"))
                {
                    if( ! fso.FolderExists(json_dir+"aihuishou/"+oSession.RequestHeaders.AllValues("Host")))
                        fso.CreateFolder (json_dir+"aihuishou/"+oSession.RequestHeaders.AllValues("Host"));
					
					//FiddlerObject.log(file_url+"open");

                    file = fso.OpenTextFile(json_dir+"aihuishou/"+oSession.RequestHeaders.AllValues("Host")+"/"+file_url+".txt",8,true,true);
                }
                else if(oSession.RequestHeaders.AllValues("Host").Contains(".huishoubao.com"))
                {
                    if( ! fso.FolderExists(json_dir+"huishoubao/"+oSession.RequestHeaders.AllValues("Host")))
                        fso.CreateFolder (json_dir+"huishoubao/"+oSession.RequestHeaders.AllValues("Host"));

                    file = fso.OpenTextFile(json_dir+"huishoubao/"+oSession.RequestHeaders.AllValues("Host")+"/"+file_url+".txt",8,true,true)
                }
                else
                {
                    if( ! fso.FolderExists(json_dir+oSession.RequestHeaders.AllValues("Host")))
                        fso.CreateFolder (json_dir+oSession.RequestHeaders.AllValues("Host"));
                    file = fso.OpenTextFile(json_dir+oSession.RequestHeaders.AllValues("Host")+"/"+file_url+".txt",8,true,true)

                }

                //oSession.WriteResponseToStream(fso,false); 

				//FiddlerObject.log(file_url+"write begin");

                //file.writeLine( oSession.ResponseHeaders.AllValues ("Content-Type"));
                //file.writeLine( "\r\n fullUrl: "+ oSession.fullUrl.ToString () ); 
                file.writeLine("{{======"+oSession.Timers.FiddlerBeginRequest.ToString() + " ：" + oSession.Timers.FiddlerGotResponseHeaders.ToString() ); 

                file.writeLine( oSession.RequestHeaders.ToString ()); 
                file.writeLine( oSession.GetRequestBodyAsString() );
                file.writeLine( oSession.ResponseHeaders.ToString());
                file.writeLine( oSession.GetResponseBodyAsString() );			
                file.writeLine( etimes+"======}}" ); 
            
				//FiddlerObject.log(file_url+"write end ");

                file.close(); 
				
				//FiddlerObject.log(file_url+"close");
                
                oSession["ui-color"] = "blue";
            }
            catch(exp)
            {
            
                var txt="Error description: " + exp.message + "\n\n" + file_url;
                FiddlerObject.log(txt);
                oSession["ui-strikeout"] = "true";
            
            }
            
            // write access t_call_record
			var sql = "";
            try
            {
                var con =new ActiveXObject("ADODB.Connection");
            
                //con.Provider="Microsoft.ACE.OLEDB.18.0";
                
                
        
                var rs=new ActiveXObject("ADODB.Recordset");
                
                /**
                Provider=Microsoft.ACE.OLEDB.12.0;Data Source=Y:/TEST/fiddler_web_service_analysis.accdb;Persist Security Info=False;
                **/
        
                //var access_db_path = "d:/fiddler_web_service_analysis.accdb" ;
        
                //con.ConnectionString="Data Source="+access_db_path;
        
		//ODBC DSN name ,config by windows odbc
                con.open("DSN=db_hsb_vs_ahs;") ;
                
                
                //FiddlerObject.alert(1);
                
                
                
            
                sql = "insert into  t_call_record (call_timestamp,request_send_timestamp,response_recv_timestamp,sitename,url,request,response,spend_second,content_type,content_length) values(" +
                    strVar1(oSession.Timers.FiddlerBeginRequest) + "," +
                    strVar1(oSession.Timers.ClientDoneRequest) + "," +
                    strVar1(oSession.Timers.ServerDoneResponse) + "," +
                    strVar1(oSession.RequestHeaders.AllValues("Host")) + "," +
                    strVar1(oSession.url.Substring (0,whindex)) + "," +
                    strVar1(oSession.RequestHeaders.ToString ()+oSession.GetRequestBodyAsString()) + "," +
                    strVar1(oSession.ResponseHeaders.ToString ()+oSession.GetResponseBodyAsString()) + "," +
                    etimes*1000  + "," +
                    strVar1(oSession.ResponseHeaders.AllValues("Content-Type")) +"," +
                    oSession.ResponseHeaders.AllValues("Content-Length")+0
                    
                    +");";
                
                //FiddlerObject.alert(sql);
            
                rs.open(sql,con);
                
                oSession["ui-color"] = "red";
            
                //rs.close();
                // rs=NULL;
            
                con.close();
                // con = NULL;
                
                
                
            }
            catch(exp)
            {
            
                var txt="Error description: " + exp.message + "\n\n" + sql;
                FiddlerObject.log(txt);
                oSession["ui-strikeout"] = "true";
            
            }

            return;
        }
    }
