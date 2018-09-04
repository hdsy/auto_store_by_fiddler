//如果是jpg，则写文件 image/jpeg
		if(	oSession.ResponseHeaders.AllValues("Content-Type").Contains("image/jpeg") )
		{
			
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
		
		
		//过滤无关请求，只关注特定请求 
		//
		//
		//
        if (
			//来自爱回收
			(oSession.RequestHeaders.AllValues("Host").Contains("gw.aihuishou.com") || 
			oSession.RequestHeaders.AllValues("Host").Contains("gw.aihuishou.com") || 
			oSession.RequestHeaders.AllValues("Host").Contains("wxapi.aihuishou.com")  || 
			oSession.RequestHeaders.AllValues("Host").Contains("xin.aihuishou.com")||  
			oSession.RequestHeaders.AllValues("Host").Contains("tk.aihuishou.com")||  
			oSession.RequestHeaders.AllValues("Host").Contains("sr.aihuishou.com")||  
			oSession.RequestHeaders.AllValues("Host").Contains(".aihuishou.com")|| 
			oSession.RequestHeaders.AllValues("Host").Contains("m.aihuishou.com") ) &&
			// 结果类型为html或js
			(oSession.ResponseHeaders.AllValues("Content-Type").Contains("application/json"))
		)
		{ 
            oSession.utilDecodeResponse();//消除保存的请求可能存在乱码的情况
           
            var fso; 
            var file; 
			
			var whindex = oSession.url.IndexOf ('?');
			
			
			if (whindex <= 0)
				whindex = oSession.url.Length;
		
			
			var file_url = oSession.url.Substring (0,whindex).Replace ('/','_').Replace('%','B').Replace('?','7').Replace('&','-');
			
				
			var etimes = (oSession.Timers.ServerDoneResponse-oSession.Timers.ClientDoneRequest).ToString().Replace(':','_');
			
            fso = new ActiveXObject("Scripting.FileSystemObject");      
            //文件保存路径，可自定义 		 
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
