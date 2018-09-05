// [Fiddler]->[Rules]->[Customize Rules ...] 
// use the following code to replace the OnBeforeResponse function
static function OnBeforeResponse(oSession: Session) 
{
	// This is default, honest not know the meaning
	if (m_Hide304s && oSession.responseCode == 304) 
	{
		oSession["ui-hide"] = "true";
	}
		
	//if the response content type is image/jpeg
	if(oSession.ResponseHeaders.AllValues("Content-Type").Contains("image/jpeg") )
	{
		// if url contain .jpg before ?
		var whindex = oSession.url.IndexOf ('?');		
		
		if (whindex <= 0)
			whindex = oSession.url.Length;

		var file_url = oSession.url.Substring (0,whindex);

		whindex = oSession.url.IndexOf ('.jpg');			

		if (whindex > 0)
		{
			whindex = whindex+4;			


			file_url = file_url.Substring (0,whindex).Replace ('/','_').Replace('%','B').Replace('?','7').Replace('&','-');

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

			stream.SaveToFile("d:/TEST/jpg/"+file_url);  
			stream.Close();  
		}
	}
		
		
        if (
		//request frome some certain sites
		(oSession.RequestHeaders.AllValues("Host").Contains("gw.aihuishou.com") || 
		oSession.RequestHeaders.AllValues("Host").Contains("gw.aihuishou.com") || 
		oSession.RequestHeaders.AllValues("Host").Contains("wxapi.aihuishou.com")  || 
		oSession.RequestHeaders.AllValues("Host").Contains("xin.aihuishou.com")||  
		oSession.RequestHeaders.AllValues("Host").Contains("tk.aihuishou.com")||  
		oSession.RequestHeaders.AllValues("Host").Contains("sr.aihuishou.com")||  
		oSession.RequestHeaders.AllValues("Host").Contains(".aihuishou.com")|| 
		oSession.RequestHeaders.AllValues("Host").Contains("m.aihuishou.com") ) &&
		// content type is json
		(oSession.ResponseHeaders.AllValues("Content-Type").Contains("application/json"))
	)
	{ 
		//confusion code decline
		oSession.utilDecodeResponse();

		var fso; 
		var file; 
			
		var whindex = oSession.url.IndexOf ('?');


		if (whindex <= 0)
			whindex = oSession.url.Length;


		var file_url = oSession.url.Substring (0,whindex).Replace ('/','_').Replace('%','B').Replace('?','7').Replace('&','-');


		var etimes = (oSession.Timers.ServerDoneResponse-oSession.Timers.ClientDoneRequest).ToString().Replace(':','_');
			
            	fso = new ActiveXObject("Scripting.FileSystemObject");      
		
            	//file path	 
		file = fso.OpenTextFile("d:/TEST/"+file_url+".txt",8,true,true)
			
		//oSession.WriteResponseToStream(fso,false); 


		//file.writeLine( oSession.ResponseHeaders.AllValues ("Content-Type"));
		//file.writeLine( "\r\n fullUrl: "+ oSession.fullUrl.ToString () ); 
		file.writeLine("{{======"+oSession.Timers.FiddlerBeginRequest.ToString() + " ：" + oSession.Timers.FiddlerGotResponseHeaders.ToString() ); 

		file.writeLine( oSession.RequestHeaders.ToString ()); 
		file.writeLine( oSession.GetRequestBodyAsString() );
		file.writeLine( oSession.ResponseHeaders.ToString());
		file.writeLine( oSession.GetResponseBodyAsString() );			
		file.writeLine( etimes+"======}}" ); 


		file.close(); 

		return;

        }
        
    }
