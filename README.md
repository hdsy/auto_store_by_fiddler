# use fiddler capture certain contents and store 

Edit the script to store the certain content-type from certain site. for girl's picture ,or interface req*res instances.

# following the steps:

## edit script
  1.  fiddler-->[rules]->[customize rules...] 
  2.  use the file content from this project and replace the same function 'OnBeforeResponse'
  3.  change to the dir to yours.  that "D:\TEST\" for interface; "D:\PRVIT\" for beauties :)

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
  
  2. install the cert ,following the step 

## now it works ...
