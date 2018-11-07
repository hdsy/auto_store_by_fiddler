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
