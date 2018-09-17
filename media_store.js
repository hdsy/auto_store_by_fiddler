static function OnBeforeResponse(oSession: Session) 
	{
		if (m_Hide304s && oSession.responseCode == 304) 
		{
			oSession["ui-hide"] = "true";
		}
		
		//如果来自指定网站，且是jpg，则写文件 image/jpeg
		if(	oSession.RequestHeaders.AllValues("Host").Contains(".mm115.net")  &&
			oSession.ResponseHeaders.AllValues("Content-Type").Contains("image/jpeg") )
		{      
			
			var whindex = oSession.url.IndexOf ('?');			
			
			if (whindex <= 0)
				whindex = oSession.url.Length;
			
			var file_url = oSession.url.Substring (0,whindex);
			
			whindex = oSession.url.IndexOf ('.jpg');			
			
			if ((whindex > 0) && (oSession.GetResponseBodyAsString().Length > 40000))
			{
				whindex = whindex+4;			
		
			
				file_url = file_url.Substring (0,whindex).Replace ('/','_').Replace('%','B').Replace('?','7').Replace('&','-');
				
				var file_path  = "d:/PRVIT/jpg/"+file_url;
				var file_path1 = "d:/PRVIT/jpg/20180904/"+file_url;
				var file_path2 = "d:/PRVIT/jpg/20180905/"+file_url;
				var file_path3 = "d:/PRVIT/jpg/20180906/"+file_url;
				var file_path4 = "d:/PRVIT/jpg/20180907/"+file_url;
				var file_path5 = "d:/PRVIT/jpg/20180910/"+file_url;
				var file_path6 = "d:/PRVIT/jpg/20180911/"+file_url;
				var file_path7 = "d:/PRVIT/jpg/20180912/"+file_url;
				var file_path8 = "d:/PRVIT/jpg/20180913/"+file_url;
				var file_path9 = "d:/PRVIT/jpg/20180917/"+file_url;
				
				try
				{
					var fso = new ActiveXObject("Scripting.FileSystemObject"); 

					//var f1 = fso.file_path(file_path); 
				
					if ((false == fso.FileExists(file_path))&& 
						(false == fso.FileExists(file_path1))&& 
						(false == fso.FileExists(file_path2))&& 
						(false == fso.FileExists(file_path3))&& 
						(false == fso.FileExists(file_path4))&& 
						(false == fso.FileExists(file_path5))&& 
						(false == fso.FileExists(file_path6))&& 
						(false == fso.FileExists(file_path7))&& 
						(false == fso.FileExists(file_path8)) && 
						(false == fso.FileExists(file_path9)) )
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
						
						
						oSession["ui-backcolor"] = "yellow";
					}
					else
					{
						oSession["ui-strikeout"] = "true";
						oSession["ui-backcolor"] = "green";
					}
				
				}
				catch(err)
				{
					FiddlerObject.log (err.message);
					oSession["ui-backcolor"] = "red";
				}
				
			
			}
			else
			{
				oSession["ui-color"] = "red";
			}
		
		}
		
		
		
        
    
	}

