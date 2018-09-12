static function OnBeforeResponse(oSession: Session) {
        if (m_Hide304s && oSession.responseCode == 304) {
            oSession["ui-hide"] = "true";
        }
		
		//如果来自指定网站，且是jpg，则写文件 image/jpeg
		if(	
			(oSession.RequestHeaders.AllValues("Host").Contains(".mm115.net") || 
			oSession.RequestHeaders.AllValues("Host").Contains("m.aihuishou.com") ) &&
			(	oSession.ResponseHeaders.AllValues("Content-Type").Contains("image/jpeg") )
			)
		{      
			
			var whindex = oSession.url.IndexOf ('?');			
			
			if (whindex <= 0)
				whindex = oSession.url.Length;
			
			var file_url = oSession.url.Substring (0,whindex);
			
			whindex = oSession.url.IndexOf ('.jpg');			
			
			if ((whindex > 0) && (oSession.GetResponseBodyAsString().Length > 70000))
			{
				whindex = whindex+4;			
		
			
				file_url = file_url.Substring (0,whindex).Replace ('/','_').Replace('%','B').Replace('?','7').Replace('&','-');
				
				var file_path  = "d:/PRVIT/jpg/"+file_url;
				var file_path1 = "d:/PRVIT/jpg/20180905/"+file_url;
				var file_path2 = "d:/PRVIT/jpg/20180904/"+file_url;
                var file_path3 = "d:/PRVIT/jpg/20180906/"+file_url;
                var file_path4 = "d:/PRVIT/jpg/20180907/"+file_url;
                var file_path5 = "d:/PRVIT/jpg/20180910/"+file_url;
                var file_path6 = "d:/PRVIT/jpg/20180911/"+file_url;
                var file_path7 = "d:/PRVIT/jpg/20180912/"+file_url;
				
				var fso = new ActiveXObject("Scripting.FileSystemObject"); 

				//var f1 = fso.file_path(file_path); 
				
				if ((false == fso.FileExists(file_path))&& 
                    (false == fso.FileExists(file_path1))&& 
                    (false == fso.FileExists(file_path2))&& 
                    (false == fso.FileExists(file_path3))&& 
                    (false == fso.FileExists(file_path4))&& 
                    (false == fso.FileExists(file_path5))&& 
                    (false == fso.FileExists(file_path6))&& 
                    (false == fso.FileExists(file_path7)) )
				{
			
					var stream = new ActiveXObject('Adodb.Stream');  
					stream.Mode = 3;  
					stream.Open();  
				
					if ((stream.Size <= 70000))
					{
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
					}
					stream.Close(); 
				}
				
			}
		}
		
		
		//过滤无关请求，只关注特定请求 
		//
		//
		//
        if (
			//来自爱回收
			(oSession.RequestHeaders.AllValues("Host").Contains(".weixin.qq.com") || 
            oSession.RequestHeaders.AllValues("Host").Contains(".growingio.com") || 
            oSession.RequestHeaders.AllValues("Host").Contains(".huatuo.qq.com") || 
			oSession.RequestHeaders.AllValues("Host").Contains(".aihuishou.com")|| 
			oSession.RequestHeaders.AllValues("Host").Contains(".huishoubao.com") ) &&
			// 结果类型为html或js
			(oSession.ResponseHeaders.AllValues("Content-Type").Contains("application/json") ||
			oSession.ResponseHeaders.AllValues("Content-Type").Contains("text/html"))&&
			// 踢掉静态页面与图形文件
			( 	(! oSession.url.Contains(".htm")) && 
			 	(! oSession.url.Contains(".png")) && 
			 	(! oSession.url.Contains(".ico")) && 
				(! oSession.url.Contains(".jpg"))
			)
			&&(
			(oSession.GetResponseBodyAsString()+"{    ").Substring(0,3).Contains ("{")
            )
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
            if(oSession.RequestHeaders.AllValues("Host").Contains(".aihuishou.com"))
            {
                if( ! fso.FolderExists("d:/TEST/aihuishou/"+oSession.RequestHeaders.AllValues("Host")))
                    fso.CreateFolder ("d:/TEST/aihuishou/"+oSession.RequestHeaders.AllValues("Host"));
                
                file = fso.OpenTextFile("d:/TEST/aihuishou/"+oSession.RequestHeaders.AllValues("Host")+"/"+file_url+".txt",8,true,true);
            }
            else if(oSession.RequestHeaders.AllValues("Host").Contains(".huishoubao.com"))
            {
                if( ! fso.FolderExists("d:/TEST/huishoubao/"+oSession.RequestHeaders.AllValues("Host")))
                    fso.CreateFolder ("d:/TEST/huishoubao/"+oSession.RequestHeaders.AllValues("Host"));
                
                file = fso.OpenTextFile("d:/TEST/huishoubao/"+oSession.RequestHeaders.AllValues("Host")+"/"+file_url+".txt",8,true,true)
            }
            else
            {
                if( ! fso.FolderExists("d:/TEST/"+oSession.RequestHeaders.AllValues("Host")))
                    fso.CreateFolder ("d:/TEST/"+oSession.RequestHeaders.AllValues("Host"));
                file = fso.OpenTextFile("d:/TEST/"+oSession.RequestHeaders.AllValues("Host")+"/"+file_url+".txt",8,true,true)
            }
			
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
