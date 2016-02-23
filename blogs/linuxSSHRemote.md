
##前言

前阵子为了方便，一直把tomcat，jetty服务放在windows server上，鼠标点点点拖拖拖也不是很麻烦，但跟脚本比起来还是差了点水准，而且对于Java项目，还是部署在Linux靠谱点，Windows的间接性崩溃真是醉了。于是，话不多说，想到便去实施，以前对Linux接触不多，什么shell语言仅仅是会写cd ls之类的简单语言。因此在搭建之前，Linux的学习和Shell语言的学习是必不可少了。

这里推荐[教程](http://c.biancheng.net/cpp/linux/)，有Linux教程和Shell教程，讲得是基础，内容好不好自己可以看看，博主感觉还不错，简单易懂，对于普通的服务器搭建及简单脚本编写足够了，安利一下。

好，闲话不多说，步入正题。博主因为是学习Linux服务器搭建，自然不可能买个服务器去用着，所以先装个虚拟机，用的CentOS，这里博主用CentOS的原因很简单，跑去看了下国内外的VPS，云服务器相关，看看这些服务器用的哪些Linux系统，斟酌下来，便决定使用CentOS，其实Linux大同小异，centOS和Ubuntu也没有太大差距，仅仅有些细微的区别。

##准备

下载好**centOS6.5**，版本选择同上，选市面上普遍的，版本间差距虽然不大，但还是没有差距更好一点。至于虚拟机linux的安装，这个google教程一大堆，就不多说了。

虚拟机装好之后，正题开始。我使用Linux，最主要便是看中他的命令行模式，虽然window也可以，但是实在别扭。所以这边我们不需要linux的桌面程序。

##GO

###Linux安装SSH

使用Linux服务器首要的便是要给Linux安装ssh，并启动ssh服务，同时开启对应端口的防火墙，为之后ssh访问做预留。

>SSH 为 Secure Shell 的缩写，由 IETF 的网络工作小组（Network Working Group）所制定；SSH 为建立在应用层和传输层基础上的安全协议。
>
>传统的网络服务程序，如FTP、POP和Telnet其本质上都是不安全的；因为它们在网络上用明文传送数据、用户帐号和用户口令，很容易受到中间人（man-in-the-middle）攻击方式的攻击。就是存在另一个人或者一台机器冒充真正的服务器接收用户传给服务器的数据，然后再冒充用户把数据传给真正的服务器。
>
>而 SSH 是目前较可靠，专为远程登录会话和其他网络服务提供安全性的协议。利用 SSH 协议可以有效防止远程管理过程中的信息泄露问题。透过 SSH 可以对所有传输的数据进行加密，也能够防止 DNS 欺骗和 IP 欺骗。

>SSH是每一台Linux电脑的标准配置。我们主要用于远程登录。

通过该命令验证是否已经安装ssh并启动

```
$ ssh localhost
```

如果出现

```
ssh: connect to host localhost port 22: Connection refused
```

说明没有安装，那便要安装SSH。安装SSH的命令很简单，当然前提虚拟机要联网。既可以通过apt安装

```
$ sudo apt-get install openssh-server
```

或者通过yum安装

```
$ yum install ssh
```

安装完成后启动ssh服务

```
$ service sshd start
```

###SSH登录Linux
此时我们便可以远程连接登录linux，mac直接通过终端命令行访问，windows要通过软件，比如securecrt。这里我用的mac，关于securecrt使用方法，google即可。

假定你要以用户名user，登录远程主机host，只要一条简单命令就可以了

```
$ ssh user@host
```

如果本地用户名与远程用户名一致，登录时可以省略用户名。

```
$ ssh host
```

SSH的默认端口是22，也就是说，你的登录请求会送进远程主机的22端口。使用p参数，可以修改这个端口。

```
$ ssh -p 8888 user@host
```

这条命令表示，ssh直接连接远程主机的8888端口。

SSH登录方式有两种，一种是口令登录，顾名思义，就是你告诉服务器用户名密码然后进行登录，第一次登录时系统会出现以下提示

```
$ ssh user@host
　　The authenticity of host 'host (192.168.137.33)' can't be established.
　　RSA key fingerprint is 45:ae:d2:a1:ed:2f:3c:6a:2e:e2:4f:2c:31:26:58:4d.
　　Are you sure you want to continue connecting (yes/no)?
```

这段话的意思是，无法确认host主机的真实性，只知道它的公钥指纹，问你还想继续连接吗？

所谓"公钥指纹"，是指公钥长度较长（这里采用RSA算法，长达1024位），很难比对，所以对其进行MD5计算，将它变成一个128位的指纹。上例中是

45:ae:d2:a1:ed:2f:3c:6a:2e:e2:4f:2c:31:26:58:4d，再进行比较，就容易多了。

很自然的一个问题就是，用户怎么知道远程主机的公钥指纹应该是多少？回答是没有好办法，远程主机必须在自己的网站上贴出公钥指纹，以便用户自行核对。

假定经过风险衡量以后，用户决定接受这个远程主机的公钥。

```
Are you sure you want to continue connecting (yes/no)? yes
```

系统会出现一句提示，表示host主机已经得到认可。

```
Warning: Permanently added 'host,12.18.429.21' (RSA) to the list of known hosts.
```

然后要求你输密码

```
Password: (enter password)
```

linux的密码不像windows那样，不会给你展现密码长度，最多一个*号，这时候要注意，你真的在输入密码，不是假的~

如果密码正确，就可以登录了。

当远程主机的公钥被接受以后，它就会被保存在文件$HOME/.ssh/known_hosts之中。下次再连接这台主机，系统就会认出它的公钥已经保存在本地了，从而跳过警告部分，直接提示输入密码。

每个SSH用户都有自己的known_hosts文件，此外系统也有一个这样的文件，通常是/etc/ssh/ssh_known_hosts，保存一些对所有用户都可信赖的远程主机的公钥。

###公钥SSH登录
除了口令登录外，SSH还有一种登录方式：公钥登录

使用密码登录，每次都必须输入密码，非常麻烦。好在SSH还提供了公钥登录，可以省去输入密码的步骤。

所谓"公钥登录"，原理很简单，就是用户将自己的公钥储存在远程主机上。登录的时候，远程主机会向用户发送一段随机字符串，用户用自己的私钥加密后，再发回来。远程主机用事先储存的公钥进行解密，如果成功，就证明用户是可信的，直接允许登录shell，不再要求密码。

这种方法要求用户必须提供自己的公钥。如果没有现成的，可以直接用ssh-keygen命令生成一个：

```
$ ssh-keygen
```

运行上面的命令以后，系统会出现一系列提示，可以一路回车。其中有一个问题是，要不要对私钥设置口令（passphrase），如果担心私钥的安全，这里可以设置一个。
运行结束以后，在$HOME/.ssh/目录下，会新生成两个文件：id_rsa.pub和id_rsa。前者是你的公钥，后者是你的私钥。
这时再输入下面的命令，将公钥传送到远程主机host上面：

```
$ ssh-copy-id user@host
```

如果上述命令不可用，提示not command，比如mac就没有，囧。那么可以是用下面命令

```
$ ssh user@host 'mkdir -p .ssh && cat >> .ssh/authorized_keys' < ~/.ssh/id_rsa.pub
```

这条命令由多个语句组成，依次分解开来看：（1）"$ ssh user@host"，表示登录远程主机；（2）单引号中的mkdir .ssh && cat >> .ssh/authorized_keys，表示登录后在远程shell上执行的命令：（3）"$ mkdir -p .ssh"的作用是，如果用户主目录中的.ssh目录不存在，就创建一个；（4）'cat >> .ssh/authorized_keys' < ~/.ssh/id_rsa.pub的作用是，将本地公钥文件~/.ssh/id_rsa.pub，重定向追加到远程文件authorized_keys的末尾。
将公钥写入authorized_keys文件后，公钥登录的设置就完成了。
从此你再登录，就不需要输入密码了。
如果还是不行，就打开远程主机的/etc/ssh/sshd_config这个文件，检查下面几行前面"#"注释是否取掉。

```
RSAAuthentication yes
PubkeyAuthentication yes
AuthorizedKeysFile .ssh/authorized_keys
```

然后，重启SSH服务。

```
$ service ssh restart
```

关于ssh安装配置及shell远程登录的部分就写到这里，下一章介绍[linux服务器配置-用户SSH登录设置](blog.html?blog=linuxUserSetting)。