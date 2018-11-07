# Capture certain contents and store by fiddler 4

Edit the script to store the certain content-type from certain site. Store the request response in files or in databases or the media .

# Following the steps:

## Edit script
  1.  fiddler-->[rules]->[customize rules...] 
  2.  use the file content from this project and replace the same function 'OnBeforeResponse' by https://github.com/hdsy/fiddler_capture_storage/blob/master/hsb_vs_ahs.js
  3.  change the target dir as you want.  for me  "D:\TEST\" for interface; "D:\PRVIT\" for media ;ODBC to your DSN db_www.wucar.com.cn

## configure fiddler
  1.  fiddler -->[tools]->[options ...] ->[https]
  
  ![avarta](https://github.com/hdsy/fiddler_capture_storage/blob/master/fiddler_configure%20for%20agency%20smartphone%20001.png)
  
  2. fiddler -->[tools]->[options ...] ->[connections]
  
  ![avarta](https://github.com/hdsy/fiddler_capture_storage/blob/master/fiddler_configure%20for%20agency%20smartphone%20002.png)
  
  
## check the ip on the node which running fiddler
  1. [windows start menu]-->[run] -> cmd -> ipconfig
  
  ![avarta](https://github.com/hdsy/fiddler_capture_storage/blob/master/fiddler_configure%20for%20agency%20smartphone%20003.png)
 
## on your smartphone
  1. type url http://ip:8888 ,and you will see like this
  
  ![avarta](https://github.com/hdsy/fiddler_capture_storage/blob/master/fiddler_configure%20for%20agency%20smartphone%20004.png)
  
  2. install the cert ,following the notice , next - click ...
  3. network config as below:
   ![avarta](https://github.com/hdsy/fiddler_capture_storage/blob/master/smart_phone_s1.jpg)
   ![avarta](https://github.com/hdsy/fiddler_capture_storage/blob/master/smart_phone_s2.jpg)
   ![avarta](https://github.com/hdsy/fiddler_capture_storage/blob/master/smart_phone_s3.jpg)

## config your DSN
  1. windows [run] -> odbc
   ![avarta](https://github.com/hdsy/fiddler_capture_storage/blob/master/obdc_dsn.png)

## now it works ...
  1. visit the site you want to capture, on your smartphone
  
