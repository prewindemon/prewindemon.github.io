经过上文-[SSH连接远程服务][pre-text]，我们已经可以通过SSH命令访问到Linux服务器。下面，需要对Linux服务器进行简单的配置。  
##思考需求
* 服务器是做什么的？
* 要完成第一条需要哪些配置？
* 要完成第一条需求需要哪些软件？
* 安装这些软件会不会用到其他软件？

思考了这些内容，便需要着手对Linux服务器进行配置。  

* 我搭建服务器是做什么的？

对于博主来说，搭建服务器是为了做网站的，想必大部分人都是如此。那么既然是用来做网站的，那服务器的安全性不得不考虑。  
如此便要考虑我们通过SSH连接的方式是否安全。  
针对这一点，我考虑如下，首先，我使用root用户登录服务器，众所周知，root用户权限非常大，换句话说，你可以轻松的通过一行代码让你的服务器崩溃，而你自己却全然不知。针对这一点，解决方案很简单，换个用户登录。所以：
##建一个用户用来进行SSH访问
>####第一步：root用户登录
>首先使用root用户登录，毕竟我们现在也没有其他用户~~  
>
>```
>$ ssh root@192.168.0.1
>```
>[上一章][pre-text]讲过，如果是第一次登录，会出现警告，表示这是一个新地址，接受后，便可以登录服务器主机。如果是二次登录，可能会要求你输入root用户的密码。  
>第一次登录的话，别忘了设置密码
>
>```
>$ passwd
>```
***
>####第二步：新建用户组
>为了添加用户，我们可以先添加一个用户组
>
>```
>$ groupadd developers
>```
>然后添加一个新用户：linuxuser
>
>```
>$ useradd -d /home/linuxuser -g developers -s /bin/bash -m linuxuser
>```
>上面命令中，参数d指定用户的主目录，参数g指定用户的群组，参数s指定用户的shell，参数m表示如果该目录不存在，则创建该目录。  
>接着，设置新用户的密码。
>
>```
>$ passwd linuxuser
>```
>***
>####第三步：设定新用户的sudo权限
>新用户建立，无法使用sudo命令暂时获取管理员权限，这时，我们需要添加新用户到sudo权限中。
>
>```
>$ visudo
>```
>visudo命令会打开sudo的设置文件/etc/sudoers，所以也可以用下面的命令编辑sudo权限
>
>```
>$ vi /etc/sudoers
>```
>在sudoers中找到下面一行
>
>```
>root    ALL=(ALL)       ALL
>```
>在这行下面添加
>
>```
>root    ALL=(ALL:ALL) ALL  
>linuxuser    ALL=(ALL) NOPASSWD: ALL#要添加的行
>```
>在这一行的下方，你可以找到
>
>```
>## Same thing without a password
># %wheel        ALL=(ALL)       NOPASSWD: ALL
>```
>也就是说，linuxuser在切换sudo的时候，不需要再输入密码，当然，你也可以为了更加安全，强制要求输入密码
>
>```
>root    ALL=(ALL:ALL) ALL  
>linuxuser    ALL=(ALL:ALL) ALL#要添加的行
>```
>好，此时新用户添加完毕，先退出root用户
>
>```
>$ logout
>```
>再用新用户linuxuser身份登录，检查有没有问题
>
>```
>$ ssh linuxuser@192.168.0.1
>```
>***
>####第四步 ：新用户登录SSH公钥设置
>新用户成功登录后说明用户配置已经完成，之后要进行SSH设置。  
>首先，确定本机（要连接服务器的机器）有SSH公钥（文件~/.ssh/id_rsa.pub），如果没有的话使用`ssh-keygen`生成一个，关于这点，[上一章][pre-text]已经提到过，就不再细讲，需要注意的是，如果你的机器已经可以公钥登录其他服务器，就不要再使用`ssh-keygen`命令生成新的公钥了，否则会原来的服务器会无法登录。  
>然后将生成的公钥拷贝到服务器的authorized_keys，如[上一章][pre-text]所说，有两种方法。
>
>>```$ ssh-copy-id user@host ```
>>```$ ssh prewindemon@pxb.8531.cn 'mkdir -p .ssh && cat > .ssh/authorized_keys' < ~/.ssh/id_rsa.pub```
>
>两个命令的作用一致，将本地公钥文件~/.ssh/id_rsa.pub，重定向追加到远程服务器上的文件authorized_keys的末尾。
>
>***
>####第五步：服务器SSH配置文件设置
>通过前面四步，完成新用户对服务器的无密码登录，第五步我们需要让ssh链接更安全，所以要对ssh配置文件进行修改。如果怕修改出问题，可以先备份一份
>
>```
>$ sudo cp /etc/ssh/sshd_config
>```
>然后编辑配置文件 
>
>```
>$ sudo vi /etc/ssh/sshd_config
>```
>在配置文件中，改掉SSH默认端口，从1025-65536之间的任一端口，当然，不能是已经被占用的端口。
>
>```
>Port 11111
>```
>然后在文件尾添加
>
>```
>Protocol 2
>PermitRootLogin no
>PermitEmptyPasswords no
>PasswordAuthentication no
>RSAAuthentication yes
>PubkeyAuthentication yes
>AuthorizedKeysFile .ssh/authorized_keys
>UseDNS no
>```
>同时查找下文件中其他位置是否有同样的设置没有被注释（前面有#号为注释），找到并将其注释，避免两次定义。  
>上述操作是为了禁止root用户登录，以及禁止用密码方式登录，并允许公钥方式登录。要注意的是，在设置端口时，不要使用被防火墙禁止的借口，那样会导致用户无法ssh连接服务器。  
>接着，在配置文件的末尾，只允许linuxuser用户允许登录，即添加下述文字
>
>```
>AllowUsers linuxuser
>```  
>保存后，退出文件编辑，然后修改authorized_keys文件的权限
>
>```
>$ sudo chmod 600 ~/.ssh/authorized_keys && chmod 700 ~/.ssh/
>```
>然后，重启ssh服务
>
>```
>$ sudo service sshd restart# 
>或者
>$ sudo /etc/init.d/ssh restart
>```
>最后，为了方便ssh连接，在本机的.ssh文件夹下（即刚刚的公钥目录下），新建config文件，添加内容
>
>```
>Host linux
>HostName 192.168.0.1
>User linuxuser
>Port 11111
>```
>然后，另外开一个shell窗口，测试是否能顺利登录 
>
>```
>$ ssh linux
>```
>*** 
>**注意：最好开另一个窗口，不要关闭现有链接，因为你不能保证你的设置是否正确，如果断开，可能会导致无法SSH连接服务器的问题，所以测试可以顺利登录后再关闭原有窗口。**
>***
>这样，远程服务器便只允许linuxuser一个用户进行公钥登录，大大提高了便利性和安全性
>

建立了一个SSH用户后，我们要考虑另一个安全性的问题，用户确定了，但缺少防火墙的阻拦，我们的端口显得并没有那么安全，所以，下一章，Linux防火墙配置。



[pre-text]:blog.html?blog=linuxSSHRemote "Linux编写Shell脚本自动同步svn并发布maven项目-SSH连接远程服务"
